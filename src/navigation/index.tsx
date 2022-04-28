import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from '~Root/screens/Home';
import LoginScreen from '~Root/screens/Login';
import RegisterScreen from '~Root/screens/Register';
import SplashScreen from '~Root/screens/Splash';
import InviteCodeScreen from '~Root/screens/InviteCode';
import InviteConfirmScreen from '~Root/screens/InviteConfirm';
import InviteExpireScreen from '~Root/screens/InviteExpire';
import VerifyEmailScreen from '~Root/screens/VerifyEmail';
import InviteContactScreen from '~Root/screens/InviteContact';

import {BASE_COLORS, BASE_SETTINGS} from '~Root/config';
import {AppState} from '~Root/reducers';
import * as AuthActions from '~Root/services/auth/actions';

import TabBar from './TabBar';
import {AppRoute} from './AppRoute';
import styles from './styles';
import {MainNavigatorParamsList, RootNavigatorParamsList} from './config';

enableScreens();

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

const AppNavigator = (props: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.authState);

  useEffect(() => {
    const initLanguage = async () => {
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources: BASE_SETTINGS.resourcesLanguage,
        lng: BASE_SETTINGS.defaultLanguage,
        fallbackLng: BASE_SETTINGS.defaultLanguage,
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initLanguage();

    if (!authState?.isAppReady) {
      setTimeout(() => {
        dispatch(AuthActions.initAuth());
      }, 1000);
    }
  }, [dispatch, authState?.isAppReady]);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.SPLASH}
      {...props}>
      {!authState.isAppReady ? (
        <RootStack.Screen name={AppRoute.SPLASH} component={SplashScreen} />
      ) : authState.isLoggedIn ? (
        <>
          <RootStack.Screen name={AppRoute.HOME} component={HomeScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen name={AppRoute.LOGIN} component={LoginScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CODE} component={InviteCodeScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONFIRM} component={InviteConfirmScreen} />
          <RootStack.Screen name={AppRoute.INVITE_EXPIRE} component={InviteExpireScreen} />
          <RootStack.Screen name={AppRoute.VERIFY_EMAIL} component={VerifyEmailScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONTACT} component={InviteContactScreen} />
          <RootStack.Screen name={AppRoute.REGISTER} component={RegisterScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
