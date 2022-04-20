import React, {useState} from 'react';
import {View, ScrollView, Platform, KeyboardAvoidingView, Image} from 'react-native';
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
import {
  InputValidateControl,
  Link,
  Button,
  Loading,
  AuthHeader,
  CheckBox,
  InputIconValidate,
} from '~Root/components';
import {LOGIN_FIELDS, LOGIN_KEYS, GlobalStyles, BASE_COLORS, IMAGES} from '~Root/config';
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
  const [isChecked, setCheckBox] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 10,
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

  const onCheckboxChange = () => {
    setCheckBox(!isChecked);
  };

  const onIconClick = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <AuthHeader showLeft={false} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={GlobalStyles.flexColumn}>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
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
                  rules={ruleEmail}
                  register={register}
                  autoFocus={true}
                  onSubmitEditing={onSubmitEditing}
                  keyboardType='email-address'
                />
                <InputIconValidate
                  label={t('password')}
                  secureTextEntry={secureTextEntry}
                  inputStyleWrapper={styles.inputWrapperStyle}
                  inputStyle={styles.inputIconStyle}
                  labelStyle={styles.labelStyle}
                  selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={LOGIN_FIELDS.password}
                  rules={rulePassword}
                  register={register}
                  showIcon={true}
                  isIconImage={true}
                  uri={IMAGES.iconEye}
                  imageStyleContainer={styles.iconEyeContainer}
                  imageStyle={styles.iconEye}
                  onIconClick={onIconClick}
                />
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.alignCenter]}>
                  <CheckBox text={t('remember_me')} isChecked={isChecked} onChange={onCheckboxChange} size={30} />
                  <Link onPress={onRegister} textDarkGrayColor textDecoration bold title={t('forgot_password')} />
                </View>
                <View style={GlobalStyles.mt30}>
                  <Button
                    title={t('login')}
                    h3
                    textCenter
                    onPress={handleSubmit(onLogin)}
                    containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                    textStyle={styles.h3BoldDefault}
                    disabled={!isValid}
                  />
                </View>
              </View>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter, GlobalStyles.justifyCenter]}>
                <Link
                  onPress={onForgotPassword}
                  h4
                  textForestGreenColor
                  textDecoration
                  style={styles.h3Default}
                  title={t('have_invite_code')}
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

export default LoginScreen;
