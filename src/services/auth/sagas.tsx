import {all, call, put, select, take, takeEvery} from 'redux-saga/effects';
import {END, EventChannel, eventChannel} from 'redux-saga';

import {
  INITIALIZE_AUTH_FAILURE,
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  COUNT_DOWN_REQUESTED,
  COUNT_DOWN_SUCCESS,
  COUNT_DOWN_FAILURE,
  CLEAR_PROGRESS,
  LOGOUT,
} from './constants';
import {getToken, clearToken} from '~Root/services/storage';
import {IActionInitializeAuthRequested, IAuthState, IVerifyToken} from './types';
import {IGlobalState} from '~Root/types';
import {onSetProgress} from './actions';
import AuthAPI from './apis';

const getAuthState = (state: IGlobalState) => state.authState;
let iv: any;
let chan: EventChannel<number>;

function* countDownFlow(secs: number) {
  return eventChannel<number>(emitter => {
    iv = setInterval(() => {
      secs -= 1;
      if (secs < 0) {
        // this causes the channel to close
        emitter(END);
        clearInterval(iv);
      } else {
        emitter(secs);
      }
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}

function* initializeAuth(payload: IActionInitializeAuthRequested['payload']) {
  try {
    const response: IVerifyToken = yield call(AuthAPI.verifyToken);
    if (!response?.success) {
      yield put({type: INITIALIZE_AUTH_FAILURE, payload: {error: 'Error: The token expired'}});
    } else {
      yield put({type: INITIALIZE_AUTH_SUCCESS, payload: response?.payload});
    }
  } catch (error) {
    yield put({type: INITIALIZE_AUTH_FAILURE, payload: error});
  }
}

function* countDown() {
  try {
    const authState: IAuthState = yield select(getAuthState);
    chan = yield call(countDownFlow, authState.progress);
    while (true) {
      const seconds: number = yield take(chan);

      if (seconds < 240) {
        yield put(onSetProgress({progress: seconds}));
      }

      if (seconds === 0) {
        yield put({type: COUNT_DOWN_SUCCESS});
      }
    }
  } catch (error) {
    yield put({type: COUNT_DOWN_FAILURE, payload: error});
  }
}

function* logout() {
  yield call(clearToken);
}

function* clearProgress() {
  yield put(onSetProgress({progress: 0}));
  chan.close();
}

function* watchInitializeAuth() {
  yield takeEvery(INITIALIZE_AUTH_REQUESTED, initializeAuth);
}

function* watchCountDown() {
  yield takeEvery(COUNT_DOWN_REQUESTED, countDown);
}

function* watchClearProgress() {
  yield takeEvery(CLEAR_PROGRESS, clearProgress);
}

function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

export default function* authWatchers() {
  yield all([watchInitializeAuth(), watchCountDown(), watchClearProgress(), watchLogout()]);
}

// function* watchInitNotes() {
//   yield takeEvery(INIT_NOTE_REQUESTED, sagaInitNotes);
// }

// function* watchCreateNotes() {
//   yield takeEvery(CREATE_NOTE_REQUESTED, sagaCreateNotes);
// }

// function* watchDeleteNotes() {
//   yield takeEvery(DELETE_NOTE_REQUESTED, sagaDeleteNotes);
// }

// function* watchUpdateNotes() {
//   yield takeEvery(UPDATE_NOTE_REQUESTED, sagaUpdateNotes);
// }

// export default function* homeWatchers() {
//   yield all([watchInitNotes(), watchCreateNotes(), watchDeleteNotes(), watchUpdateNotes()]);
// }
