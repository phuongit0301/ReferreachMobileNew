/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {NavigatorScreenParams} from '@react-navigation/native';
import {AppRoute} from './AppRoute';

export type RootNavigatorParamsList = {
  [AppRoute.SPLASH]: undefined;
  [AppRoute.APP_CHECK]: undefined;
  [AppRoute.TABS]: undefined;
  [AppRoute.LOGIN]: undefined;
  [AppRoute.INVITE_CODE]: {code?: string} | undefined;
  [AppRoute.INVITE_CONFIRM]: {code?: string} | undefined;
  [AppRoute.INVITE_EXPIRE]: undefined;
  [AppRoute.REGISTER]: undefined;
  [AppRoute.RESET_PASSWORD]: undefined;
  [AppRoute.CREATE_ASK]: undefined;
  [AppRoute.ON_BOARDING_SCREEN]: {item: any};
  [AppRoute.APP_DRAWER]: {screen?: undefined | string} | undefined;
  [AppRoute.BOTTOM_TAB]: undefined;
  [AppRoute.HOME_SHARE_SCREEN]: undefined;
  [AppRoute.HOME]: undefined;
  [AppRoute.HOME_DETAIL]: {reference_id?: undefined | string} | undefined;
  [AppRoute.VERIFY_EMAIL]: undefined;
  [AppRoute.VERIFIED_EMAIL]: undefined;
  [AppRoute.FORGOT_PASSWORD]: undefined;
  [AppRoute.RECOVER_PASSWORD]: undefined;
  [AppRoute.PROFILE]: undefined;
  [AppRoute.PROFILE_SECOND]: undefined;
  [AppRoute.PROFILE_COMPLETE]: undefined;
  [AppRoute.PROFILE_PERSONAL]: undefined;
  [AppRoute.PROFILE_INDUSTRY]: undefined;
  [AppRoute.INVITE_CONTACT]: undefined;
  [AppRoute.INVITE_CONTACT_EDIT]: undefined;
  [AppRoute.LIST_CONTACT]: undefined;
  [AppRoute.SEND_INVITES]: undefined;
  [AppRoute.FEED_BACK_MODAL]: undefined;
  [AppRoute.INDIVIDUAL_MESSAGE_MODAL]: undefined;
  [AppRoute.JOINT_MESSAGE_MODAL]: undefined;
  [AppRoute.CHAT_INTERNAL]: undefined;
  [AppRoute.CHAT_CONTEXT_SWITCH]: undefined;
  [AppRoute.CHAT_NOTIFICATION_ASKER]: undefined;
  [AppRoute.VIEW_PARTICIPANT]: undefined;
  [AppRoute.INTRO]: undefined;
  [AppRoute.ASK_NAVIGATOR]: undefined;
  [AppRoute.ASK]: undefined;
  [AppRoute.ASK_TWO]: undefined;
  [AppRoute.ASK_THREE]: undefined;
  [AppRoute.ASK_PUBLISH]: undefined;
  [AppRoute.ASK_EDIT]: {id: number} | undefined;
  [AppRoute.ASK_DETAILS]: undefined;
  [AppRoute.MAIN_NAVIGATOR]: undefined;
  [AppRoute.TIPS]: undefined;
  [AppRoute.TIPS_TWO]: undefined;
};

export type BottomTabParams = {
  [AppRoute.YOUR_ASK]: undefined;
  [AppRoute.AIR_FEED]: undefined;
  [AppRoute.MAIN_NAVIGATOR]: undefined;
  [AppRoute.TRUST_NETWORK]: undefined;
  [AppRoute.CHAT]: undefined;
};

// type AIRFeedStackScreenParams = {
//   AIRFeed: undefined;
// };

export type AIRFeed1 = {
  Root: {screen: string};
};

export type AIRFeedParamsList = {
  [AppRoute.AIR_FEED]: undefined;
};

export type TabNavigatorParamsList = {
  [AppRoute.HOME]: undefined;
  [AppRoute.CHAT]: undefined;
  [AppRoute.AIR_FEED]: NavigatorScreenParams<AIRFeedParamsList>;
};

export type MainNavigatorParamsList = {
  [AppRoute.HOME]: undefined;
  [AppRoute.PROFILE_PERSONAL]: undefined;
  [AppRoute.AIR_FEED]: undefined;
  [AppRoute.INVITE_CONTACT_EDIT]: undefined;
  [AppRoute.HOME_DETAIL]: {reference_id?: undefined | string} | undefined;
  [AppRoute.CREATE_ASK]: undefined;
  [AppRoute.ASK_PREVIEW]: undefined;
  [AppRoute.ASK_PUBLISH]: undefined;
  [AppRoute.ON_BOARDING_SCREEN]: {item: any};
  [AppRoute.HOME_SHARE_SCREEN]: undefined;
  [AppRoute.CHAT]: undefined;
  [AppRoute.LOGIN]: undefined;
  [AppRoute.INVITE_CODE]: undefined;
  [AppRoute.VERIFY_EMAIL]: undefined;
  [AppRoute.VERIFIED_EMAIL]: undefined;
  [AppRoute.FORGOT_PASSWORD]: undefined;
  [AppRoute.RECOVER_PASSWORD]: undefined;
  [AppRoute.PROFILE]: undefined;
  [AppRoute.PROFILE_SECOND]: undefined;
  [AppRoute.PROFILE_COMPLETE]: undefined;
  [AppRoute.CREATE_ASK]: undefined;
  [AppRoute.FEED_BACK_MODAL]: undefined;
  [AppRoute.INDIVIDUAL_MESSAGE_MODAL]: undefined;
  [AppRoute.JOINT_MESSAGE_MODAL]: undefined;
  [AppRoute.CHAT_INTERNAL]: undefined;
  [AppRoute.ASK]: undefined;
};

export type AskNavigatorParamsList = {
  [AppRoute.ASK]: undefined;
  [AppRoute.ASK_TWO]: undefined;
  [AppRoute.ASK_THREE]: undefined;
  [AppRoute.ASK_PREVIEW]: undefined;
  [AppRoute.ASK_PUBLISH]: undefined;
  [AppRoute.ASK_EDIT]: undefined;
};

// interface AuthNavigatorParamsList {
//   [AppRoute.Login]: undefined
//   [AppRoute.Signup]: undefined
//   [AppRoute.ForgotPassword]: { email?: string }
// }

// export type RootNavigatorParamsList = MainNavigatorParamsList | Record<string, undefined>;
