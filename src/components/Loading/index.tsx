import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {DotIndicator} from 'react-native-indicators';

import {BASE_COLORS} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';

const Loading = () => {
  const {loading} = useSelector((state: IGlobalState) => state.loadingState);
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DotIndicator animating={true} color={`${BASE_COLORS.whiteColor}`} count={3} size={12} />
    </View>
  );
};

export default Loading;
