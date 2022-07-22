import React from 'react';
import {View} from 'react-native';

import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';

interface Params {
  tabLabel?: string;
}

const PersonalScreen: React.FC<Params> = () => {
  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
      <Paragraph h1 title='Personal' />
    </View>
  );
};

export default PersonalScreen;
