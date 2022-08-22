import {all, put, takeEvery, call, select} from 'redux-saga/effects';
import {IUserState} from '~Root/services/user/types';
import {IGlobalState} from '~Root/types';

import IndustryAPI from './apis';
import {
  GET_INDUSTRY_REQUESTED,
  GET_INDUSTRY_SUCCESS,
  GET_INDUSTRY_FAILURE,
  GET_ALL_INDUSTRIES_REQUESTED,
  GET_ALL_INDUSTRIES_SUCCESS,
  GET_ALL_INDUSTRIES_FAILURE,
} from './constants';
import {
  IActionAllIndustriesRequested,
  IActionAllIndustriesSuccess,
  IActionIndustryRequested,
  IActionIndustrySuccess,
} from './types';

const getUserState = (state: IGlobalState) => state.userState;

function* getIndustry(payload: IActionIndustryRequested) {
  try {
    const response: IActionIndustrySuccess['payload'] = yield call(IndustryAPI.getIndustry);
    if (response) {
      yield put({type: GET_INDUSTRY_SUCCESS, payload: response});
      payload?.callback({
        error: '',
        ...response,
      });
    } else {
      yield put({type: GET_INDUSTRY_FAILURE, payload: {error: response}});
      payload?.callback({
        error: response,
      });
    }
  } catch (error) {
    yield put({type: GET_INDUSTRY_FAILURE, payload: {error}});
  }
}

function* getAllIndustries(payload: IActionAllIndustriesRequested) {
  try {
    const response: IActionAllIndustriesSuccess['payload'] = yield call(
      IndustryAPI.getAllIndustries,
      payload?.payload?.textSearch,
    );
    if (response) {
      const userState: IUserState = yield select(getUserState);
      console.log('userState=======>', userState);

      const industries: IActionAllIndustriesSuccess['payload']['data'] = yield call(IndustryAPI.filterDataIndustry, {
        target: payload?.payload?.target,
        industries: response?.data?.data,
        userInfo: userState.userInfo,
      });

      yield put({type: GET_ALL_INDUSTRIES_SUCCESS, payload: {...response?.data, data: industries}});
      payload?.callback({
        error: '',
        ...response,
      });
    } else {
      yield put({type: GET_ALL_INDUSTRIES_FAILURE, payload: {error: response}});
      payload?.callback({
        error: response,
      });
    }
  } catch (error) {
    yield put({type: GET_INDUSTRY_FAILURE, payload: {error}});
  }
}

function* watchGetIndustry() {
  yield takeEvery(GET_INDUSTRY_REQUESTED, getIndustry);
}

function* watchGetAllIndustries() {
  yield takeEvery(GET_ALL_INDUSTRIES_REQUESTED, getAllIndustries);
}

export default function* industryWatchers() {
  yield all([watchGetIndustry(), watchGetAllIndustries()]);
}
