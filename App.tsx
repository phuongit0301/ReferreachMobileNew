import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';

import AppNavigator from '~Root/navigation';
import rootStore from '~Root/store';
import {DeepLinkProvider} from '~Root/components';
import {PUBNUB} from '~Root/private/constants';
import {uid} from '~Root/utils';

console.disableYellowBox = true;

const onBeforeLift = () => {
  console.log('Before On Lift');
};
const {persistor, store} = rootStore();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
persistor.purge();

const pubnub = new PubNub({
  subscribeKey: PUBNUB.SUBSCRIBE_KEY,
  publishKey: PUBNUB.PUBLISH_KEY,
  uuid: uid(),
});

const App: React.FC<{initialURL?: string}> = ({initialURL}) => {
  console.log('props========>', initialURL);

  useEffect(() => {
    if (!initialURL) {
      return;
    }

    console.log('initialURL======?', initialURL);
  }, [initialURL]);

  return (
    <Provider store={store}>
      <PubNubProvider client={pubnub}>
        <PersistGate loading={<ActivityIndicator />} onBeforeLift={onBeforeLift} persistor={persistor}>
          <DeepLinkProvider>
            <SafeAreaProvider>
              <AppNavigator />
              <Toast />
            </SafeAreaProvider>
          </DeepLinkProvider>
        </PersistGate>
      </PubNubProvider>
    </Provider>
  );
};

export default App;
