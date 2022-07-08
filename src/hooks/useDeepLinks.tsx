/* eslint-disable @typescript-eslint/no-floating-promises */
import {useEffect, useContext, useState} from 'react';
import {InteractionManager} from 'react-native';

import {navigationRef} from '~Root/services/navigation';
import {DeepLinkContext} from '~Root/components';

export enum DeepLinkEnum {
  NAVIGATION = 'NAVIGATION',
}

export const useDeepLinks = (deepLinks?: DeepLinkEnum[]) => {
  const [hookRoute, setHookRoute] = useState<string>();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const {deepLinksState, addDeepLink, removeDeepLink} = useContext(DeepLinkContext);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      const route = navigationRef.current?.getCurrentRoute();
      if (!hookRoute) {
        setHookRoute(route?.name);
      }
    });

    const handleNavigationStateChange = () => {
      setCurrentRoute(navigationRef.current?.getCurrentRoute()?.name);
    };

    navigationRef.current?.addListener('state', handleNavigationStateChange);

    return () => {
      task.cancel();
      navigationRef.current?.removeListener('state', handleNavigationStateChange);
    };
  }, []);

  useEffect(() => {
    (async () => {
      console.log('deepLinks=====>', deepLinks);
      console.log('hookRoute=====>', hookRoute);
      console.log('currentRoute=====>', currentRoute);

      if (!deepLinks || hookRoute !== currentRoute) {
        return;
      }

      const found = deepLinksState.filter(link => deepLinks.includes(link.type));

      if (!found.length) {
        return;
      }

      const currentLink = found[0];
      await currentLink.action();
      removeDeepLink(currentLink.id);
    })();
  }, [deepLinksState, hookRoute, currentRoute]);

  return {addDeepLink};
};
