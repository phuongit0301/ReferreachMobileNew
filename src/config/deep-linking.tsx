// eslint-disable-next-line import/no-duplicates
import {Linking} from 'react-native';
import dynamicLinks, {FirebaseDynamicLinksTypes} from '@react-native-firebase/dynamic-links';

import {AppRoute} from '~Root/navigation/AppRoute';

const config = {
  screens: {
    [AppRoute.HOME_DETAIL]: 'a/:reference_id',
    [AppRoute.CREATE_ASK]: 'create',
  },
};

export const linking = {
  prefixes: ['referreach://', 'https://referreachmobile.page.link', 'https://ask.referreach.com'],
  async getInitialURL(): Promise<string> {
    // Check if the app was opened by a deep link
    const url = await Linking.getInitialURL();
    const dynamicLinkUrl = await dynamicLinks().getInitialLink();
    if (dynamicLinkUrl) {
      return dynamicLinkUrl.url;
    }
    if (url) {
      return url;
    }
    // If it was not opened by a deep link, go to the home screen
    return `referreach://${AppRoute.HOME_DETAIL}`;
  },
  // Custom function to subscribe to incoming links
  subscribe(listener: (deeplink: string) => void) {
    // First, you may want to do the default deep link handling
    const onReceiveURL = ({url}: {url: string}) => listener(url);
    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);
    const handleDynamicLink = (dynamicLink: FirebaseDynamicLinksTypes.DynamicLink) => {
      listener(dynamicLink.url);
    };
    const unsubscribeToDynamicLinks = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      unsubscribeToDynamicLinks();
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
  config,
};
