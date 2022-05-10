import {all, fork} from 'redux-saga/effects';

import appWatchers from '~Root/services/auth/sagas';
import loginWatchers from '~Root/services/login/sagas';
import userWatchers from '~Root/services/user/sagas';
import industryWatchers from '~Root/services/industry/sagas';

export default function* rootSaga() {
  yield all([fork(appWatchers)]);
  yield all([fork(loginWatchers)]);
  yield all([fork(userWatchers)]);
  yield all([fork(industryWatchers)]);
}
