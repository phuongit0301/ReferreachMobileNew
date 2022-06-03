import React from 'react';
import FastImage from 'react-native-fast-image';

import {IMAGES} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';

export const PURPOSE_OF_ASK = [
  {key: 'buy', name: 'Buy'},
  {key: 'sell', name: 'Sell'},
  {key: 'custom', name: 'Custom'},
];

export enum PURPOSE_OF_ASK_ENUM {
  BUY = 'buy',
  SELL = 'sell',
  CUSTOM = 'custom',
}

export enum PURPOSE_OF_ASK_TYPE_ENUM {
  TEXTFIELD = 'textfield',
  CALENDAR = 'datetime',
  TEXTBOX = 'textbox',
  TEXT = 'text',
  INTERGER = 'interger',
}

export enum IN_APP_STATUS_ENUM {
  INVITATION_SENT = 'invitation_sent',
  SIGNIN_COMPLETED = 'signin_completed',
  ONBOARDING = 'onboarding',
  ONBOARD_COMPLETED = 'onboard_completed',
  SIGNUP_GUIDE_TIPS = 'signup_guide_tips',
}

export const sideBarRoutes = [
  {
    name: AppRoute.MY_ACCOUNT,
    title: 'My Account',
    imageUrl: () => <FastImage source={IMAGES.iconAccount} style={styles.iconAccount} />,
  },
  {
    name: AppRoute.NOTIFICATION,
    title: 'Notifications',
    imageUrl: () => <FastImage source={IMAGES.iconNotification} style={styles.iconNotification} />,
  },
  {
    name: AppRoute.PRIVACY,
    title: 'Privacy',
    imageUrl: () => <FastImage source={IMAGES.iconPrivacy} style={styles.iconPrivacy} />,
  },
  {
    name: AppRoute.HELP,
    title: 'Help',
    imageUrl: () => <FastImage source={IMAGES.iconHelp} style={styles.iconHelp} />,
  },
  {
    name: AppRoute.FEED_BACK,
    title: 'Feedback',
    imageUrl: () => <FastImage source={IMAGES.iconFeedback} style={styles.iconFeedback} />,
  },
  {
    name: AppRoute.SETTING,
    title: 'Settings',
    imageUrl: () => <FastImage source={IMAGES.iconSetting} style={styles.iconSetting} />,
  },
];
