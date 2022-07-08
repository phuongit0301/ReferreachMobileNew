import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

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
import ProfileOther from '~Root/screens/ProfileOther';
import YourAskScreen from '~Root/screens/YourAsk';
import AIRFeedScreen from '~Root/screens/AIRFeed';
import AskScreen from '~Root/screens/Ask';
import AskTwoScreen from '~Root/screens/AskTwo';
import AskThreeScreen from '~Root/screens/AskThree';
import AskPreviewScreen from '~Root/screens/AskPreview';
import AskPublishScreen from '~Root/screens/AskPublish';
import AskEditScreen from '~Root/screens/AskEdit';
import AskDetailsScreen from '~Root/screens/AskDetails';
import TrustNetworkScreen from '~Root/screens/TrustNetwork';
import ChatScreen from '~Root/screens/Chat';
import AppCheckScreen from '~Root/screens/AppCheck';
import TipsScreen from '~Root/screens/Tips';
import TipsTwoScreen from '~Root/screens/TipsTwo';
import ForgotPasswordScreen from '~Root/screens/ForgotPassword';
import CheckYourEmailScreen from '~Root/screens/CheckYourEmail';
import IndividualJointModalScreen from '~Root/screens/IndividualJointModal';
import IndividualMessageModalScreen from '~Root/screens/IndividualMessageModal';

import {BASE_SETTINGS} from '~Root/config';
import {AppState} from '~Root/reducers';
import * as AuthActions from '~Root/services/auth/actions';

import TabBar from './TabBar';
import Drawer from './Drawer';
import {AppRoute} from './AppRoute';
import {
  BottomTabParams,
  MainNavigatorParamsList,
  RootNavigatorParamsList,
  AskNavigatorParamsList,
  AirFeedNavigatorParamsList,
} from './config';
import { useURL } from '~Root/hooks';

enableScreens();

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const MainStack = createNativeStackNavigator<MainNavigatorParamsList>();
const AirFeedStack = createNativeStackNavigator<AirFeedNavigatorParamsList>();
const AskStack = createNativeStackNavigator<AskNavigatorParamsList>();
const DrawerStack = createDrawerNavigator();
const BottomTab = createBottomTabNavigator<BottomTabParams>();

const AskNavigator = (props: any) => {
  return (
    <AskStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.ASK}
      {...props}>
      <AskStack.Screen name={AppRoute.ASK} component={AskScreen} />
      <AskStack.Screen name={AppRoute.ASK_TWO} component={AskTwoScreen} />
      <AskStack.Screen name={AppRoute.ASK_THREE} component={AskThreeScreen} />
      <AskStack.Group
        screenOptions={{
          presentation: 'modal',
          contentStyle: {backgroundColor: 'rgba(18, 20, 26, 0.8);'},
          headerShown: false,
        }}>
        <AskStack.Screen name={AppRoute.ASK_PREVIEW} component={AskPreviewScreen} />
      </AskStack.Group>
      <AskStack.Screen name={AppRoute.ASK_PUBLISH} component={AskPublishScreen} />
      <AskStack.Screen name={AppRoute.ASK_EDIT} component={AskEditScreen} />
    </AskStack.Navigator>
  );
};

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
      <MainStack.Screen name={AppRoute.PROFILE_OTHER} component={ProfileOther} />
    </MainStack.Navigator>
  );
};

const AirFeedNavigator = (props: any) => {
  return (
    <AirFeedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AppRoute.AIR_FEED}
      {...props}>
      <AirFeedStack.Screen name={AppRoute.AIR_FEED} component={AIRFeedScreen} />
      <AirFeedStack.Screen name={AppRoute.INDIVIDUAL_MESSAGE_MODAL} component={IndividualMessageModalScreen} />
      <AirFeedStack.Screen name={AppRoute.JOINT_MESSAGE_MODAL} component={IndividualJointModalScreen} />
    </AirFeedStack.Navigator>
  );
};

const AppBottomTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={AppRoute.YOUR_ASK}
      screenOptions={() => ({
        headerShown: false,
      })}
      tabBar={props => <TabBar {...props} />}>
      <BottomTab.Screen name={AppRoute.YOUR_ASK} component={YourAskScreen} />
      <BottomTab.Screen name={AppRoute.AIR_FEED_NAVIGATOR} component={AirFeedNavigator} />
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
        drawerPosition: 'right',
      })}
      drawerContent={({navigation}) => {
        const customProps = {};
        return <Drawer props={customProps} navigation={navigation} />;
      }}>
      <DrawerStack.Screen name={AppRoute.BOTTOM_TAB} component={AppBottomTab} />
      <DrawerStack.Screen name={AppRoute.PROFILE_SECOND} component={ProfileSecondScreen} />
      <DrawerStack.Screen name={AppRoute.ASK_NAVIGATOR} component={AskNavigator} />
      <DrawerStack.Screen name={AppRoute.MAIN_NAVIGATOR} component={MainNavigator} />
    </DrawerStack.Navigator>
  );
};

const SwitchNavigation = (props: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.authState);
  const link = useURL();
console.log('link3333=======>', link);
  useEffect(() => {
    // AsyncStorage.removeItem('token');
    const initLanguage = async () => {
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources: BASE_SETTINGS.resourcesLanguage,
        lng: BASE_SETTINGS.defaultLanguage,
        fallbackLng: BASE_SETTINGS.defaultLanguage,
        interpolation: {
          escapeValue: false,
        },
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
          <RootStack.Screen name={AppRoute.APP_CHECK} component={AppCheckScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CODE} component={InviteCodeScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONFIRM} component={InviteConfirmScreen} />
          <RootStack.Screen name={AppRoute.VERIFY_EMAIL} component={VerifyEmailScreen} />
          <RootStack.Screen name={AppRoute.INVITE_EXPIRE} component={InviteExpireScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONTACT} component={InviteContactScreen} />
          <RootStack.Screen name={AppRoute.LIST_CONTACT} component={ListContactScreen} />
          <RootStack.Screen name={AppRoute.SEND_INVITES} component={SendInvitesScreen} />
          <RootStack.Screen name={AppRoute.INTRO} component={IntroScreen} />
          <RootStack.Screen name={AppRoute.APP_DRAWER} component={AppDrawer} />
          <RootStack.Screen name={AppRoute.HOME} component={YourAskScreen} />
          <RootStack.Group
            screenOptions={{
              presentation: 'modal',
              contentStyle: {backgroundColor: 'rgba(18, 20, 26, 0.8);'},
              headerShown: false,
            }}>
            <RootStack.Screen name={AppRoute.TIPS} component={TipsScreen} />
            <RootStack.Screen name={AppRoute.TIPS_TWO} component={TipsTwoScreen} />
          </RootStack.Group>
          <RootStack.Group>
            <RootStack.Screen name={AppRoute.ASK_DETAILS} component={AskDetailsScreen} />
          </RootStack.Group>
          {/* <RootStack.Screen name={AppRoute.ASK_NAVIGATOR} component={AskNavigator} /> */}
        </>
      ) : (
        <>
          <RootStack.Screen name={AppRoute.LOGIN} component={LoginScreen} />
          <RootStack.Screen name={AppRoute.REGISTER} component={RegisterScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CODE} component={InviteCodeScreen} />
          <RootStack.Screen name={AppRoute.INVITE_CONFIRM} component={InviteConfirmScreen} />
          <RootStack.Screen name={AppRoute.VERIFY_EMAIL} component={VerifyEmailScreen} />
          <RootStack.Screen name={AppRoute.INVITE_EXPIRE} component={InviteExpireScreen} />
          <RootStack.Screen name={AppRoute.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
          <RootStack.Screen name={AppRoute.CHECK_YOUR_MAIL} component={CheckYourEmailScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default SwitchNavigation;
