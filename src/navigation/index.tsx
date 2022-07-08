import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, InteractionManager, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import SwitchNavigation from './SwitchNavigation';
import {checkDeepLinkResult, navigationRef} from '~Root/services/navigation';
import {useURL, useDeepLinks, DeepLinkEnum} from '~Root/hooks';
import {AppRoute} from './AppRoute';

export const config = {
  screens: {
    [AppRoute.INVITE_CODE]: 'i/:code',
    [AppRoute.ASK_DETAILS]: 'a/:id',
  },
};

export const linking = {
  prefixes: ['referreach://', 'https://referreach.com', 'https://*.referreach.com'],
  config,
  // async getInitialURL() {
  //   const url = await Linking.getInitialURL();
  //   if (url != null) {
  //     return url;
  //   }
  // },
  // subscribe(listener: any) {
  //   const onReceiveURL = ({url}: {url: string}) => {
  //     console.log('listener=======>', url);
  //     listener(url);
  //   };

  //   // Listen to incoming links from deep linking
  //   const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

  //   return () => {
  //     // Clean up the event listeners
  //     linkingSubscription.remove();
  //   };
  // },
};

const AppNavigator = () => {
  const {addDeepLink} = useDeepLinks();
  const link = useURL();

  const handleDeepLink = useCallback(
    (url: string) => {
      const task = InteractionManager.runAfterInteractions(() => {
        const {didDeepLinkLand, action, linkPath} = checkDeepLinkResult(url);
        if (!didDeepLinkLand) {
          addDeepLink({
            id: linkPath,
            type: DeepLinkEnum.NAVIGATION,
            action: () => navigationRef.current?.dispatch(action),
          });
        }
      });

      return () => task.cancel();
    },
    [navigationRef],
  );

  useEffect(() => {
    if (!link) {
      return;
    }
    console.log('link111111============>', link);
    handleDeepLink(link);
  }, [link]);
  console.log(link);
  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator />} ref={navigationRef}>
      <SwitchNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
