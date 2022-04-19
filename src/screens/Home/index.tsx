import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MainNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph} from '~Root/components';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.HOME>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Paragraph title={'HOME'} />
    </View>
  );
};

export default HomeScreen;
