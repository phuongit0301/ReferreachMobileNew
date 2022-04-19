import React from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

import AppNavigator from '~Root/navigation';
import rootStore from '~Root/store';

console.disableYellowBox = true;

const onBeforeLift = () => {
  console.log('Before On Lift');
};
const {persistor, store} = rootStore();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
persistor.purge();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} onBeforeLift={onBeforeLift} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer fallback={<ActivityIndicator />}>
            <AppNavigator />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
