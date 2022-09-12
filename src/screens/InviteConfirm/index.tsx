import React, {useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {invitationRejectRequest, invitationRequest} from '~Root/services/register/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, Loading, AuthHeader, Paragraph, AvatarGradient} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {IGlobalState} from '~Root/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONFIRM>;

const InviteConfirmScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {dataInvite} = useSelector((state: IGlobalState) => state.registerState);

  useEffect(() => {
    if (route.params?.code) {
      dispatch(
        invitationRequest(route.params?.code, () => {
          console.log(1231231);
        }),
      );
    }
  }, [route.params?.code]);

  const onAccept = () => {
    navigation.navigate(AppRoute.REGISTER);
  };

  const onReject = () => {
    if (route.params?.code) {
      dispatch(showLoading());
      dispatch(
        invitationRejectRequest(route.params?.code, (response: any) => {
          dispatch(hideLoading());
          Toast.show({
            position: 'bottom',
            type: 'success',
            text1: t('invitation_rejected'),
            visibilityTime: 1200,
            autoHide: true,
          });
          setTimeout(() => {
            navigation.navigate(AppRoute.INVITE_CODE, {resetForm: true});
          }, 1250);
        }),
      );
    }
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <AuthHeader showLeft={true} onPressLeft={() => navigation.goBack()} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.mt30]}>
              <View style={GlobalStyles.alignCenter}>
                {dataInvite?.included &&
                dataInvite?.included?.length > 0 &&
                dataInvite?.included[0]?.attributes?.avatar_metadata ? (
                    <FastImage
                      source={{
                        uri: dataInvite?.included[0]?.attributes?.avatar_metadata?.avatar_url,
                      }}
                      style={[GlobalStyles.avatar, GlobalStyles.mb15]}
                    />
                  ) : (
                    <AvatarGradient
                      title='AD'
                      color1={BASE_COLORS.oxleyColor}
                      color2={BASE_COLORS.steelBlueColor}
                      stylesContainer={GlobalStyles.mb15}
                    />
                  )}
                {dataInvite?.included && dataInvite?.included?.length > 0 && (
                  <Paragraph
                    h4
                    bold
                    textSteelBlueColor
                    title={`${dataInvite?.included[0]?.attributes?.first_name ?? ''} ${
                      dataInvite?.included[0]?.attributes?.last_name ?? ''
                    }`}
                    style={GlobalStyles.mb20}
                  />
                )}
                {dataInvite?.included && dataInvite?.included?.length > 0 && (
                  <Paragraph
                    textCenter
                    textSteelBlueColor
                    bold600
                    p
                    title={dataInvite?.included[0]?.attributes.pitch}
                  />
                )}
              </View>
              <View style={[GlobalStyles.container, GlobalStyles.flexColumn, GlobalStyles.mt30]}>
                <Button
                  title={t('accept')}
                  h4
                  textCenter
                  onPress={onAccept}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...GlobalStyles.mb30,
                    ...styles.buttonContainerStyle,
                  }}
                  textStyle={styles.textPrimary}
                />
                <Button
                  title={t('reject')}
                  h4
                  textCenter
                  onPress={onReject}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...styles.buttonSecondContainerStyle,
                  }}
                  textStyle={{...styles.textSecondary, ...GlobalStyles.textCenter}}
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

export default InviteConfirmScreen;
