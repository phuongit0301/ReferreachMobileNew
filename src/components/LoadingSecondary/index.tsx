import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import styles from './styles';

const LoadingSecondary = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgBlur} />
      <View style={styles.waitingContainer}>
        <ActivityIndicator size={'large'} animating={true} color={`${BASE_COLORS.whiteColor}`} />
      </View>
    </View>
  );
};

export default LoadingSecondary;
