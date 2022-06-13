import {all, fork} from 'redux-saga/effects';

import appWatchers from '~Root/services/auth/sagas';
import loginWatchers from '~Root/services/login/sagas';
import registerWatchers from '~Root/services/register/sagas';
import userWatchers from '~Root/services/user/sagas';
import industryWatchers from '~Root/services/industry/sagas';
import contactWatchers from '~Root/services/contact/sagas';
import askWatchers from '~Root/services/ask/sagas';
import networkWatchers from '~Root/services/network/sagas';
import feedWatchers from '~Root/services/feed/sagas';

export default function* rootSaga() {
  yield all([fork(appWatchers)]);
  yield all([fork(loginWatchers)]);
  yield all([fork(registerWatchers)]);
  yield all([fork(userWatchers)]);
  yield all([fork(industryWatchers)]);
  yield all([fork(contactWatchers)]);
  yield all([fork(askWatchers)]);
  yield all([fork(networkWatchers)]);
  yield all([fork(feedWatchers)]);
}
