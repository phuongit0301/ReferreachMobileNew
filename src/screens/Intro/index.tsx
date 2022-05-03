import React from 'react';
import {ImageBackground, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Intro} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const data = [
  {
    id: '0',
    title: 'Group transactions',
    description:
      'Group your recurrent transactions\nso you can easily track them.\nMake a new group or use the predifine one,\nit’s up to you.',
    image: IMAGES.onboard1,
  },
  {
    id: '1',
    title: 'Manage transactions',
    description:
      'Keep track of your recurrent transactions.\nIntroduce new provider, plan, category, etc.\nor use some of the predefined ones.',
    image: IMAGES.onboard2,
  },
  {
    id: '2',
    title: 'Get reminded',
    description: 'Set prefer way of reminding yourself,\nand when and how often to be reminded.',
    image: IMAGES.onboard3,
  },
];

const IntroScreen = ({navigation}: Props) => {
  return (
    <View style={[GlobalStyles.container]}>
      <ImageBackground source={IMAGES.introBg} style={[GlobalStyles.container]}>
        <Intro data={data} onPress={() => navigation.navigate(AppRoute.PROFILE)} />
      </ImageBackground>
    </View>
  );
};

export default IntroScreen;
