import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

import authReducer from '~Root/services/auth/reducer';
import userReducer from '~Root/services/user/reducer';
import loginReducer from '~Root/services/login/reducer';
import contactReducer from '~Root/services/contact/reducer';
import loadingReducer from '~Root/services/loading/reducer';
import industryReducer from '~Root/services/industry/reducer';
import registerReducer from '~Root/services/register/reducer';
import askReducer from '~Root/services/ask/reducer';
import {IGlobalState} from '~Root/types';
import {ASYNC_INITIALIZE_AUTH, LOGOUT} from '~Root/services/auth/constants';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: 'authState',
  storage: AsyncStorage,
  blacklist: ['authState'],
};

const appReducer = combineReducers<IGlobalState>({
  loadingState: loadingReducer,
  loginState: loginReducer,
  authState: authReducer,
  userState: userReducer,
  contactState: contactReducer,
  industryState: industryReducer,
  registerState: registerReducer,
  askState: askReducer,
});

export const rootReducer = (state: IGlobalState | undefined, action: any) => {
  if (action.type === ASYNC_INITIALIZE_AUTH.FAILURE || action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer<IGlobalState>({...rootPersistConfig, ...authPersistConfig}, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;
