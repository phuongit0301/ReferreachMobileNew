import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

import LoginScreen from '~Root/screens/Login';
import RegisterScreen from '~Root/screens/Register';
import SplashScreen from '~Root/screens/Splash';
import InviteCodeScreen from '~Root/screens/InviteCode';
import InviteConfirmScreen from '~Root/screens/InviteConfirm';
import InviteExpireScreen from '~Root/screens/InviteExpire';
import VerifyEmailScreen from '~Root/screens/VerifyEmail';
import InviteContactScreen from '~Root/screens/InviteContact';
import ListContactScreen from '~Root/screens/ListContact';
import SendInvitesScreen from '~Root/screens/SendInvites';
import IntroScreen from '~Root/screens/Intro';
import ProfileScreen from '~Root/screens/Profile';
import ProfileSecondScreen from '~Root/screens/ProfileSecond';
import ProfileCompleteScreen from '~Root/screens/ProfileComplete';
import YourAskScreen from '~Root/screens/YourAsk';
import AIRFeedScreen from '~Root/screens/AIRFeed';
import AskScreen from '~Root/screens/Ask';
import TrustNetworkScreen from '~Root/screens/TrustNetwork';
import ChatScreen from '~Root/screens/Chat';
import AppCheckScreen from '~Root/screens/AppCheck';

import {BASE_COLORS, BASE_SETTINGS, GlobalStyles} from '~Root/config';
import {AppState} from '~Root/reducers';
import * as AuthActions from '~Root/services/auth/actions';

import TabBar from './TabBar';
import Drawer from './Drawer';
import {AppRoute} from './AppRoute';
import styles from './styles';
import {BottomTabParams, MainNavigatorParamsList, RootNavigatorParamsList} from './config';
import {Linking, View} from 'react-native';
import {Paragraph} from '~Root/components';

enableScreens();

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const MainStack = createNativeStackNavigator<MainNavigatorParamsList>();
const DrawerStack = createDrawerNavigator();
const BottomTab = createBottomTabNavigator<BottomTabParams>();

const MainNavigator = (props: any) => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.PROFILE}
      {...props}>
      <MainStack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
      <MainStack.Screen name={AppRoute.PROFILE_SECOND} component={ProfileSecondScreen} />
      <MainStack.Screen name={AppRoute.PROFILE_COMPLETE} component={ProfileCompleteScreen} />
      <MainStack.Screen name={AppRoute.ASK} component={AskScreen} />
    </MainStack.Navigator>
  );
};

const AppBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={AppRoute.MAIN_NAVIGATOR}
      screenOptions={() => ({
        headerShown: false,
      })}
      tabBar={props => <TabBar {...props} />}>
      <BottomTab.Screen name={AppRoute.YOUR_ASK} component={YourAskScreen} />
      <BottomTab.Screen name={AppRoute.AIR_FEED} component={AIRFeedScreen} />
      <BottomTab.Screen name={AppRoute.MAIN_NAVIGATOR} component={MainNavigator} />
      <BottomTab.Screen name={AppRoute.TRUST_NETWORK} component={TrustNetworkScreen} />
      <BottomTab.Screen name={AppRoute.CHAT} component={ChatScreen} />
    </BottomTab.Navigator>
  );
};

const AppDrawer = (props: any) => {
  return (
    <DrawerStack.Navigator
      initialRouteName={AppRoute.BOTTOM_TAB}
      screenOptions={() => ({
        headerShown: false,
        drawerStyle: {width: '100%'},
      })}
      drawerContent={({navigation}) => {
        const customProps = {};
        return <Drawer props={customProps} navigation={navigation} />;
      }}>
      <DrawerStack.Screen name={AppRoute.BOTTOM_TAB} component={AppBottomTab} />
      <DrawerStack.Screen name={AppRoute.PROFILE_SECOND} component={ProfileSecondScreen} />
    </DrawerStack.Navigator>
  );
};

const AppNavigator = (props: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.authState);

  useEffect(() => {
    // AsyncStorage.removeItem('token');
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

  useEffect(() => {
    Linking.addEventListener('url', (event: any) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Linking.canOpenURL(event.url).then(supported => {
        if (supported) {
          console.log('1211111111111');
        }
      });
    });
  }, []);

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
          <RootStack.Screen name={AppRoute.APP_CHECK} component={AppCheckScreen} />
          <RootStack.Screen name={AppRoute.VERIFY_EMAIL} component={VerifyEmailScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONTACT} component={InviteContactScreen} />
          <RootStack.Screen name={AppRoute.LIST_CONTACT} component={ListContactScreen} />
          <RootStack.Screen name={AppRoute.SEND_INVITES} component={SendInvitesScreen} />
          <RootStack.Screen name={AppRoute.INTRO} component={IntroScreen} />
          <RootStack.Screen name={AppRoute.APP_DRAWER} component={AppDrawer} />
          <RootStack.Screen name={AppRoute.HOME} component={YourAskScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen name={AppRoute.LOGIN} component={LoginScreen} />
          <RootStack.Screen name={AppRoute.REGISTER} component={RegisterScreen} />
        </>
      )}
      <RootStack.Screen name={AppRoute.INVITE_CODE} component={InviteCodeScreen} />
      <RootStack.Screen name={AppRoute.INVITE_CONFIRM} component={InviteConfirmScreen} />
      <RootStack.Screen name={AppRoute.INVITE_EXPIRE} component={InviteExpireScreen} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
