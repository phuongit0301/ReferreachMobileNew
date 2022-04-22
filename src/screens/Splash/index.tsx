import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import GlobalSplashScreen from 'react-native-splash-screen';

import {BASE_COLORS} from '~Root/config';
import styles from './styles';

const SplashScreen = () => {
  useEffect(() => {
    GlobalSplashScreen.hide();
  });

  return (
    <View style={styles.container}>
      {/* <Image source={IMAGES.splash} style={styles.logo} /> */}
      <View style={styles.waitingContainer}>
        <ActivityIndicator animating={true} size='large' color={`${BASE_COLORS.blackColor}`} />
      </View>
    </View>
  );
};

export default SplashScreen;
