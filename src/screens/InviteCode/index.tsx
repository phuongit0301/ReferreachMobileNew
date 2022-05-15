import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {invitationRequest} from '~Root/services/register/actions';
import {showLoading, hideLoading} from '~Root/services/loading/actions';
import {IInviteCode} from '~Root/services/register/types';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {InputValidateControl, Button, Loading, AuthHeader, Paragraph} from '~Root/components';
import {INVITE_CODE_FIELDS, GlobalStyles, BASE_COLORS, INVITE_CODE_KEYS, IMAGES} from '~Root/config';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const schema = yup.object().shape({
  invite_code: yup.string().required('Invite Code is a required'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const InviteCodeScreen = ({navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<IInviteCode>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const onInvite: SubmitHandler<IInviteCode> = (credentials: IInviteCode) => {
    if (credentials.invite_code) {
      dispatch(showLoading());
      dispatch(
        invitationRequest(credentials.invite_code, (response: any) => {
          dispatch(hideLoading());
          if (response.success) {
            if (response?.data?.data?.attributes?.status === 'unused') {
              navigation.navigate(AppRoute.INVITE_CONFIRM, {code: credentials.invite_code});
            } else {
              navigation.navigate(AppRoute.INVITE_EXPIRE);
            }
          } else {
            console.log(response);
            setError(true);
          }
        }),
      );
    }
  };

  const ruleInput = {
    required: {value: true, message: t('invite_code_required')},
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <AuthHeader showLeft={true} onPressLeft={() => navigation.goBack()} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView style={GlobalStyles.container}>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.container, GlobalStyles.flexColumn, GlobalStyles.justifyCenter]}>
              <InputValidateControl
                label={t('your_invite_code')}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={INVITE_CODE_FIELDS.inviteCode}
                rules={ruleInput}
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
                  <Paragraph textDesireColor title={t('invitiation_code')} />
                </View>
              )}
              <View style={GlobalStyles.mt30}>
                <Button
                  title={t('next')}
                  h3
                  textCenter
                  onPress={handleSubmit(onInvite)}
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

export default InviteCodeScreen;
