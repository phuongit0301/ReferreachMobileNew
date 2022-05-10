import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';

type Props = NativeStackScreenProps<BottomTabParams, AppRoute.AIR_FEED>;

const TrustNetworkScreen = ({navigation}: Props) => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
      <Paragraph h2 bold title={'Trust Network'} />
    </View>
  );
};

export default TrustNetworkScreen;
