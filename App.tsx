import React from 'react';
import {ActivityIndicator, Alert, Linking} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

import AppNavigator from '~Root/navigation';
import rootStore from '~Root/store';
import {AppRoute} from '~Root/navigation/AppRoute';

console.disableYellowBox = true;

const onBeforeLift = () => {
  console.log('Before On Lift');
};
const {persistor, store} = rootStore();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
persistor.purge();

export const config = {
  screens: {
    [AppRoute.INVITE_CODE]: 'invite/:code',
    [AppRoute.ASK_DETAILS]: 'a/:id',
  },
};

const linking = {
  prefixes: ['referreach://', 'https://referreach.com', 'https://*.referreach.com'],
  config,
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
  },
  subscribe(listener: any) {
    const onReceiveURL = ({url}: {url: string}) => {console.log('listener=======>', url); listener(url)};

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
    };
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} onBeforeLift={onBeforeLift} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer linking={linking} fallback={<ActivityIndicator />}>
            <AppNavigator />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
