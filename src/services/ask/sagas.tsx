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
} from './constants';
import {
  IActionCreateAskRequest,
  IActionCreateAskSuccess,
  IActionGetAskRequest,
  IActionGetAskSuccess,
  IActionGetJobRequest,
  IActionGetJobSuccess,
  IActionGetLocationRequest,
  IActionGetLocationSuccess,
} from './types';

const getItems = (state: IGlobalState) => state.askState;

function* getAsks(payload: IActionGetAskRequest) {
  try {
    const response: IActionGetAskSuccess['payload'] = yield call(AskAPI.getAsks);
    if (response?.success) {
      yield put({type: GET_ASK_SUCCESS, payload: response?.data});
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
        data: {data: [], included: []},
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
        data: {data: [], included: []},
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

function* watchCreateAsk() {
  yield takeEvery(CREATE_ASK_REQUESTED, createAsk);
}

function* watchGetJob() {
  yield takeLatest(GET_JOB_REQUESTED, getJobs);
}

function* watchGetLocation() {
  yield takeLatest(GET_LOCATION_REQUESTED, getLocations);
}

export default function* askWatchers() {
  yield all([watchGetAsk(), watchGetJob(), watchGetLocation(), watchCreateAsk()]);
}
