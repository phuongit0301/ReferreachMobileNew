import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, ActivityIndicator} from 'react-native';

import {renewVerificationCodeRequest} from '~Root/services/register/actions';
import {IActionRenewVerificationCodeSuccess} from '~Root/services/register/types';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {userInfoRequest} from '~Root/services/user/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {BASE_COLORS} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.APP_CHECK>;

const AppCheckScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: IGlobalState) => state.authState);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(
        userInfoRequest((response: any) => {
          if (response?.data?.confirmed_at) {
            if (response?.data?.in_app_status === IN_APP_STATUS_ENUM.ONBOARD_COMPLETED) {
              navigation.navigate(AppRoute.APP_DRAWER);
              return;
            }

            if (response?.data?.in_app_status === IN_APP_STATUS_ENUM.ONBOARDING) {
              navigation.navigate(AppRoute.MAIN_NAVIGATOR);
              return;
            }

            if (response?.data?.in_app_status === IN_APP_STATUS_ENUM.INVITATION_SENT) {
              navigation.navigate(AppRoute.INTRO);
              return;
            }

            navigation.navigate(AppRoute.INVITE_CONTACT);
          } else {
            dispatch(
              renewVerificationCodeRequest((res: IActionRenewVerificationCodeSuccess['payload']) => {
                navigation.navigate(AppRoute.VERIFY_EMAIL);
              }),
            );
          }
        }),
      );
    }
  }, [dispatch, authState.isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.waitingContainer}>
        <ActivityIndicator animating={true} size='large' color={`${BASE_COLORS.blackColor}`} />
      </View>
    </View>
  );
};

export default AppCheckScreen;
