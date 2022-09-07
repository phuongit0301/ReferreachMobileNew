import React, {useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
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
import {InputValidateControl, Button, Loading, AuthHeader} from '~Root/components';
import {INVITE_CODE_FIELDS, GlobalStyles, BASE_COLORS, INVITE_CODE_KEYS} from '~Root/config';
import styles from './styles';

const schema = yup.object().shape({
  invite_code: yup.string().required('Invite Code is a required'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const InviteCodeScreen = ({route, navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    trigger,
    formState: {errors, isValid},
  } = useForm<IInviteCode>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();
  // const [error, setError] = useState(false);

  useEffect(() => {
    const code: string = (route?.params as any)?.code;
    const resetForm: string = (route?.params as any)?.resetForm;
    if (code) {
      setValue('invite_code', code);
      handleInvite(code);
    }

    if (resetForm) {
      setValue('invite_code', '');
    }
  }, [route?.params]);

  const onInvite: SubmitHandler<IInviteCode> = (credentials: IInviteCode) => {
    if (credentials.invite_code) {
      handleInvite(credentials.invite_code);
    }
  };

  const handleInvite = (code: string) => {
    dispatch(showLoading());
    dispatch(
      invitationRequest(code, async (response: any) => {
        dispatch(hideLoading());
        if (response.success) {
          if (response?.data?.data?.attributes?.status === 'unused') {
            navigation.navigate(AppRoute.INVITE_CONFIRM, {code});
          } else {
            navigation.navigate(AppRoute.INVITE_EXPIRE);
          }
        } else {
          await trigger();
          setError(INVITE_CODE_KEYS.inviteCode, {
            message: response?.message?.detail ? response?.message?.detail : response?.message,
          });
        }
      }),
    );
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
                register={register}
                autoFocus={true}
              />
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
