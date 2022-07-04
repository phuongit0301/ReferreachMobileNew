import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import {showLoading, hideLoading} from '~Root/services/loading/actions';
import {forgotPasswordRequest} from '~Root/services/login/actions';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {InputValidateControl, Button, Loading, AuthHeader, Paragraph} from '~Root/components';
import {GlobalStyles, BASE_COLORS, LOGIN_FIELDS, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';

interface IForgotPassword {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const ForgotPasswordScreen = ({navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<IForgotPassword>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loginState = useSelector((state: IGlobalState) => state.loginState);
  const [error, setError] = useState(false);

  const onSent: SubmitHandler<IForgotPassword> = (credentials: IForgotPassword) => {
    if (credentials.email) {
      setError(false);
      dispatch(showLoading());
      dispatch(
        forgotPasswordRequest(credentials.email, async (response: any) => {
          dispatch(hideLoading());
          if (response.success) {
            navigation.navigate(AppRoute.CHECK_YOUR_MAIL);
          } else {
            if (response.message) {
              setError(true);
            }
          }
        }),
      );
    }
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <AuthHeader showLeft={true} onPressLeft={() => navigation.goBack()} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView style={GlobalStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.container, GlobalStyles.flexColumn, GlobalStyles.justifyCenter]}>
              <Paragraph h5 textSteelBlueColor bold600 title={t('forgot_password')} style={GlobalStyles.mb15} />
              <Paragraph p textDavysGreyColor title={t('forgot_password_description')} style={GlobalStyles.mb50} />
              <InputValidateControl
                label={t('email')}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={LOGIN_FIELDS.email}
                register={register}
                autoFocus={true}
              />
              {isValid && error && (
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                  <FastImage
                    source={IMAGES.iconError}
                    resizeMode='cover'
                    style={[GlobalStyles.mr5, styles.iconError]}
                  />
                  <Paragraph textDesireColor title={loginState?.message} />
                </View>
              )}
              <View style={GlobalStyles.mt30}>
                <Button
                  title={t('sent')}
                  h3
                  textCenter
                  onPress={handleSubmit(onSent)}
                  containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                  textStyle={styles.h3BoldDefault}
                  disabled={!isValid}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default ForgotPasswordScreen;
