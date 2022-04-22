import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MainNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.HOME>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
      <Paragraph h2 bold title={'HOME'} />
    </View>
  );
};

export default HomeScreen;
