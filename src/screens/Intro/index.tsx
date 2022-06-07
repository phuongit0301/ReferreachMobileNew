import React from 'react';
import {ImageBackground, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Intro, Loading} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {updateUserInAppStatus} from '~Root/services/user/actions';
import {useDispatch} from 'react-redux';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {IActionUpdateUserInAppStatusSuccess} from '~Root/services/user/types';

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
  const dispatch = useDispatch();

  const onUpdateOnboarding = () => {
    dispatch(showLoading());
    dispatch(
      updateUserInAppStatus(
        {in_app_status: IN_APP_STATUS_ENUM.ONBOARDING},
        (response: IActionUpdateUserInAppStatusSuccess['payload']) => {
          dispatch(hideLoading());
          if (response.success) {
            navigation.navigate(AppRoute.APP_DRAWER, {screen: AppRoute.MAIN_NAVIGATOR});
          }
        },
      ),
    );
  };

  return (
    <View style={[GlobalStyles.container]}>
      <ImageBackground source={IMAGES.introBg} style={[GlobalStyles.container]}>
        <Intro data={data} onPress={() => onUpdateOnboarding()} />
      </ImageBackground>
      <Loading />
    </View>
  );
};

export default IntroScreen;
