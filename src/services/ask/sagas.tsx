import {all, put, takeEvery, call, takeLatest, delay} from 'redux-saga/effects';
import {IGlobalState} from '~Root/types';

import AskAPI from './apis';
import {
  GET_ASK_REQUESTED,
  GET_ASK_SUCCESS,
  GET_ASK_FAILURE,
  GET_JOB_REQUESTED,
  GET_LOCATION_REQUESTED,
  GET_JOB_SUCCESS,
  GET_JOB_FAILURE,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  CREATE_ASK_SUCCESS,
  CREATE_ASK_FAILURE,
  CREATE_ASK_REQUESTED,
  GET_ASK_DETAILS_REQUESTED,
  GET_ASK_DETAILS_FAILURE,
  GET_ASK_DETAILS_SUCCESS,
  UPDATE_ASK_FAILURE,
  UPDATE_ASK_SUCCESS,
  UPDATE_ASK_REQUESTED,
} from './constants';
import {
  IActionCreateAskRequest,
  IActionCreateAskSuccess,
  IActionGetAskDetailsRequest,
  IActionGetAskDetailsSuccess,
  IActionGetAskRequest,
  IActionGetAskSuccess,
  IActionGetJobRequest,
  IActionGetJobSuccess,
  IActionGetLocationRequest,
  IActionGetLocationSuccess,
  IActionUpdateAskRequest,
  IActionUpdateAskSuccess,
} from './types';

const getItems = (state: IGlobalState) => state.askState;

function* getAsks(payload: IActionGetAskRequest) {
  try {
    const response: IActionGetAskSuccess['payload'] = yield call(AskAPI.getAsks);
    if (response?.success) {
      yield put({type: GET_ASK_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: '',
          data: response?.data,
        });
    } else {
      yield put({type: GET_ASK_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    yield put({type: GET_ASK_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: [],
      });
  }
}

function* getAskDetails(payload: IActionGetAskDetailsRequest) {
  try {
    const response: IActionGetAskDetailsSuccess['payload'] = yield call(AskAPI.getAskDetails, payload?.payload);
    if (response?.success) {
      yield put({type: GET_ASK_DETAILS_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: '',
          data: response?.data?.data,
        });
    } else {
      yield put({type: GET_ASK_DETAILS_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    yield put({type: GET_ASK_DETAILS_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: null,
      });
  }
}

function* createAsk(payload: IActionCreateAskRequest) {
  try {
    const response: IActionCreateAskSuccess['payload'] = yield call(AskAPI.createAsk, payload?.payload);
    if (response?.success) {
      yield put({type: CREATE_ASK_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: '',
          data: response?.data,
        });
    } else {
      yield put({type: CREATE_ASK_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    yield put({type: CREATE_ASK_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: [] as any,
      });
  }
}

function* updateAsk(payload: IActionUpdateAskRequest) {
  try {
    if (payload?.payload?.formDataRemove) {
      const responseRemove: IActionUpdateAskSuccess['payload'] = yield call(
        AskAPI.updateAsk,
        payload?.payload.id,
        payload?.payload?.formDataRemove,
      );

      if (!responseRemove.success) {
        throw new Error(responseRemove.message);
      }
    }

    const response: IActionUpdateAskSuccess['payload'] = yield call(
      AskAPI.updateAsk,
      payload?.payload.id,
      payload?.payload.formData,
    );

    if (response?.success) {
      yield put({type: UPDATE_ASK_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          isExpired: !!(response?.data as any)?.json?.errors,
          message: (response?.data as any)?.json?.errors ? 'Ask is expired' : '',
          data: response?.data,
        });
    } else {
      yield put({type: UPDATE_ASK_FAILURE, payload: {message: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          isExpired: false,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    console.log('response.error=======>', error);
    yield put({type: UPDATE_ASK_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        isExpired: false,
        message: error as string,
        data: [] as any,
      });
  }
}

function* getJobs(payload: IActionGetJobRequest) {
  try {
    yield delay(500);
    const response: IActionGetJobSuccess['payload'] = yield call(AskAPI.getJobs, payload?.payload);
    if (response?.success) {
      yield put({type: GET_JOB_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: '',
          data: response?.data,
        });
    } else {
      yield put({type: GET_JOB_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    yield put({type: GET_JOB_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: null,
      });
  }
}

function* getLocations(payload: IActionGetLocationRequest) {
  try {
    yield delay(500);
    const response: IActionGetLocationSuccess['payload'] = yield call(AskAPI.getLocations, payload?.payload);
    if (response?.success) {
      yield put({type: GET_LOCATION_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: '',
          data: response?.data,
        });
    } else {
      yield put({type: GET_LOCATION_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    yield put({type: GET_LOCATION_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: null,
      });
  }
}

function* watchGetAsk() {
  yield takeEvery(GET_ASK_REQUESTED, getAsks);
}

function* watchGetAskDetails() {
  yield takeEvery(GET_ASK_DETAILS_REQUESTED, getAskDetails);
}

function* watchCreateAsk() {
  yield takeEvery(CREATE_ASK_REQUESTED, createAsk);
}

function* watchUpdateAsk() {
  yield takeEvery(UPDATE_ASK_REQUESTED, updateAsk);
}

function* watchGetJob() {
  yield takeLatest(GET_JOB_REQUESTED, getJobs);
}

function* watchGetLocation() {
  yield takeLatest(GET_LOCATION_REQUESTED, getLocations);
}

export default function* askWatchers() {
  yield all([
    watchGetAsk(),
    watchGetAskDetails(),
    watchGetJob(),
    watchGetLocation(),
    watchCreateAsk(),
    watchUpdateAsk(),
  ]);
}
