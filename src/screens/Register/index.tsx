import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
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
import {IActionLoginFailure, IActionLoginRequested, IActionLoginSuccess} from '~Root/services/login/types';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {InputValidateControl, Button, Loading, AuthHeader, InputIconValidate, Paragraph, Link} from '~Root/components';
import {REGISTER_FIELDS, REGISTER_KEYS, GlobalStyles, BASE_COLORS, IMAGES} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Minimum of 8 characters, with upper and lowercase and a number, or a symbol.',
    ),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const RegisterScreen = ({navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: {errors, isValid},
  } = useForm<IActionLoginRequested['payload']>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(80),
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState({
    first: true,
    second: true,
  });

  const onRegister: SubmitHandler<IActionLoginRequested['payload']> = (
    credentials: IActionLoginRequested['payload'],
  ) => {
    // if (credentials.email && credentials.password) {
    //   dispatch(showLoading());
    //   dispatch(
    //     loginRequest(credentials, (response: IActionLoginSuccess['payload'] | IActionLoginFailure['payload']) => {
    //       dispatch(hideLoading());
    //       if (response.success) {
    //         Toast.show({
    //           position: 'bottom',
    //           type: response.success ? 'success' : 'error',
    //           text1: t('login_successful'),
    //           visibilityTime: 4000,
    //           autoHide: true,
    //         });
    //       } else {
    //         Toast.show({
    //           position: 'bottom',
    //           type: 'error',
    //           text1: response?.message ?? t('login_error'),
    //           visibilityTime: 2000,
    //           autoHide: true,
    //         });
    //       }
    //     }),
    //   );
    // }
    navigation.navigate(AppRoute.VERIFY_EMAIL);
  };

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  const onIconClick = () => {
    setSecureTextEntry({
      ...secureTextEntry,
      first: !secureTextEntry.first,
    });
  };

  const onIconConfirmClick = () => {
    setSecureTextEntry({
      ...secureTextEntry,
      second: !secureTextEntry.second,
    });
  };

  const onLogin = () => {
    navigation.navigate(AppRoute.LOGIN);
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <AuthHeader showLeft={true} onPressLeft={() => navigation.goBack()} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
              <Paragraph h4 textCenter bold600 textSteelBlueColor title={t('signup')} style={GlobalStyles.mb20} />
              <InputValidateControl
                label={`${t('first_name')}*`}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={REGISTER_FIELDS.first_name}
                register={register}
                autoFocus={true}
                onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.last_name)}
              />
              <InputValidateControl
                label={`${t('last_name')}*`}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={REGISTER_FIELDS.last_name}
                register={register}
                onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.email)}
              />
              <InputValidateControl
                label={`${t('email')}*`}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={REGISTER_FIELDS.email}
                register={register}
                onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.password)}
                keyboardType='email-address'
              />
              <View style={GlobalStyles.mb15}>
                <InputIconValidate
                  label={`${t('password')}*`}
                  secureTextEntry={secureTextEntry.first}
                  inputStyleWrapper={styles.inputWrapperStyle}
                  inputStyle={styles.inputIconStyle}
                  labelStyle={styles.labelStyle}
                  selectionColor={BASE_COLORS.blackColor}
                  placeholderTextColor={BASE_COLORS.blackColor}
                  errors={errors}
                  control={control}
                  name={REGISTER_FIELDS.password}
                  register={register}
                  showIcon={true}
                  isIconImage={true}
                  uri={IMAGES.iconEye}
                  imageStyleContainer={styles.iconEyeContainer}
                  styleContainer={GlobalStyles.mb5}
                  imageStyle={styles.iconEye}
                  onIconClick={onIconClick}
                  onSubmitEditing={() => onSubmitEditing(REGISTER_KEYS.confirm_password)}
                />
                <Paragraph textGray2Color title={t('register_password_condition')} style={styles.textCondition} />
              </View>
              <InputIconValidate
                label={`${t('confirm_password')}*`}
                secureTextEntry={secureTextEntry.second}
                inputStyleWrapper={styles.inputWrapperStyle}
                inputStyle={styles.inputIconStyle}
                labelStyle={styles.labelStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={REGISTER_FIELDS.confirm_password}
                register={register}
                showIcon={true}
                isIconImage={true}
                uri={IMAGES.iconEye}
                imageStyleContainer={styles.iconEyeContainer}
                imageStyle={styles.iconEye}
                onIconClick={onIconConfirmClick}
              />
              <View>
                <Button
                  title={t('signup')}
                  h4
                  textCenter
                  onPress={handleSubmit(onRegister)}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...GlobalStyles.mb20,
                    ...styles.buttonContainerStyle,
                  }}
                  textStyle={styles.h3BoldDefault}
                  disabled={!isValid}
                />
                <Link
                  onPress={onLogin}
                  textCenter
                  textForestGreenColor
                  textDecoration
                  bold600
                  title={t('login_stead')}
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

export default RegisterScreen;
