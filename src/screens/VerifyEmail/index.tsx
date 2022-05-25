import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {renewVerificationCodeRequest} from '~Root/services/register/actions';
import {IActionRenewVerificationCodeSuccess} from '~Root/services/register/types';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {countDownRequest, onClearProgress} from '~Root/services/auth/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph, Button, Loading, Otp, AuthHeader} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';
import {IGlobalState} from '~Root/types';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VERIFY_EMAIL>;

const VerifyEmailScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const authState = useSelector((state: IGlobalState) => state.authState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countDownRequest());

    return () => {
      dispatch(onClearProgress({progress: 0}));
    };
  }, []);

  const resendEmail = () => {
    dispatch(showLoading());
    dispatch(
      renewVerificationCodeRequest((response: IActionRenewVerificationCodeSuccess['payload']) => {
        dispatch(hideLoading());
        if (response.renew) {
          Toast.show({
            position: 'bottom',
            type: response.renew ? 'success' : 'error',
            text1: t('renew'),
            visibilityTime: 4000,
            autoHide: true,
          });
          dispatch(countDownRequest());
        }
      }),
    );
  };

  const convertTime = (millisec: number) => {
    if (!millisec) return '00:00:00';

    const hours = Math.floor(millisec / 60 / 60);
    const minutes = Math.floor(millisec / 60) - hours * 60;
    const seconds = millisec % 60;

    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <AuthHeader showLeft={true} onPressLeft={onBack} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView
          style={GlobalStyles.scrollViewWhite}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollViewContentContainer}>
          <View style={[GlobalStyles.flexColumn, styles.content]}>
            <View style={styles.titleContainer}>
              <Paragraph h5 bold600 textSteelBlueColor title={t('verify_email')} style={GlobalStyles.mb30} />
            </View>
            <Paragraph p textDarkGrayColor textCenter title={t('verify_email_sent')} style={GlobalStyles.mb20} />
            <Paragraph p textDarkGrayColor textCenter title={t('follow_link')} style={GlobalStyles.mb30} />
            <Paragraph
              p
              bold600
              textForestGreenColor
              textCenter
              title={t('input_verification_code')}
              style={GlobalStyles.mb20}
            />
            <Otp styleContainer={GlobalStyles.mb30} navigation={navigation} />
            <Paragraph h5 textSteelBlueColor bold600 textCenter title={t('not_get_email')} style={GlobalStyles.mb20} />
            <View style={[GlobalStyles.p20, styles.bgBottom]}>
              <Button
                title={t('resend_email')}
                h5
                textCenter
                onPress={resendEmail}
                containerStyle={styles.buttonContainerStyle}
                // disabled={authState.progress > 0}
                textStyle={styles.txtButton}
              />
              <View style={styles.countDownContainer}>
                <Paragraph
                  p
                  textCenter
                  bold600
                  textDavysGreyColor
                  title={t('resend_in_time')}
                  style={GlobalStyles.mb10}
                />
                <Paragraph h4 textCenter textOxleyColor bold600 title={convertTime(authState?.progress)} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default VerifyEmailScreen;
