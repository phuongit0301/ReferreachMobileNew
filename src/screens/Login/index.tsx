import React from 'react';
import {View, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {loginRequest} from '~Root/services/login/actions';
import {showLoading, hideLoading} from '~Root/services/loading/actions';
import {IFormData} from '~Root/services/login/types';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {InputValidateControl, Paragraph, Link, Button, Loading, HeaderSmallBlue} from '~Root/components';
import {LOGIN_FIELDS, LOGIN_KEYS, GlobalStyles, BASE_COLORS} from '~Root/config';
import styles from './styles';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format'),
  password: yup.string(),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const LoginScreen = ({navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: {errors, isValid},
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const onLogin: SubmitHandler<IFormData> = (credentials: IFormData) => {
    if (credentials.email && credentials.password) {
      // dispatch(showLoading());
      console.log(12313123);
    }
  };

  const ruleEmail = {
    required: {value: true, message: 'Email is required'},
  };

  const rulePassword = {
    required: {value: true, message: 'Password is required'},
  };

  const onSubmitEditing = () => {
    setFocus(LOGIN_KEYS.password);
  };

  const onRegister = () => {
    // navigation.navigate(AppRoute.INVITE_CODE);
    navigation.navigate(AppRoute.FEED_BACK_MODAL);
  };

  const onForgotPassword = () => {
    navigation.navigate(AppRoute.FORGOT_PASSWORD);
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue title={t('referreach')} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={GlobalStyles.flexColumn}>
              <View style={GlobalStyles.flexColumn}>
                <View style={GlobalStyles.titleContainer}>
                  <Paragraph h3 textBlack style={styles.h3} title={t('welcome')} />
                </View>
                <InputValidateControl
                  label={t('email')}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={LOGIN_FIELDS.email}
                  rules={ruleEmail}
                  register={register}
                  autoFocus={true}
                  onSubmitEditing={onSubmitEditing}
                  keyboardType='email-address'
                />
                <InputValidateControl
                  label={t('password')}
                  secureTextEntry={true}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={LOGIN_FIELDS.password}
                  rules={rulePassword}
                  register={register}
                />
                <View style={GlobalStyles.mt30}>
                  <Button
                    title='Log in'
                    h3
                    textCenter
                    bordered
                    onPress={handleSubmit(onLogin)}
                    containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                    textStyle={styles.h3BoldDefault}
                    disabled={!isValid}
                  />
                </View>
              </View>
              <View style={[GlobalStyles.flexColumn, styles.signUpArea]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.itemCenter, GlobalStyles.mb30]}>
                  <Paragraph h4 bold textBlack style={styles.h3Default} title={t('have_an_invite_code')} />
                  <Link
                    onPress={onRegister}
                    h4
                    textBlack
                    textDecoration
                    bold
                    style={[styles.h3Default, styles.signUpLink]}
                    title={t('sign_up')}
                  />
                </View>
                <View style={[GlobalStyles.flexRow, GlobalStyles.itemCenter]}>
                  <Link
                    onPress={onForgotPassword}
                    h4
                    textBlack
                    textDecoration
                    style={styles.h3Default}
                    title={t('forgot_password')}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default LoginScreen;
