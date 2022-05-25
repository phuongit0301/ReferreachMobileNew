import React, {useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {invitationRequest} from '~Root/services/register/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, Loading, AuthHeader, Paragraph, AvatarGradient} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {IGlobalState} from '~Root/types';

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
    navigation.navigate(AppRoute.LOGIN);
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
                dataInvite?.included[0]?.attributes.avatar !== '' ? (
                  <FastImage
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1651449600&Signature=gN3HddE96zhceWpqed3Y4PEQEk~63Tjlq9pctkLn6RQ8o5-YpaDukjfdyrRfckfkkdOm9hJSUfJw8sbn8xYffwa8qC5tvx9q57oNDV9ec4jghtEx2gwytrGhMHDN56xgBREO7lrW4gSZuOIH4M2MGLZYW1u8vnno2nKzO8bYoV~9~CjfHje~8pMpnjejXaJOs~nXtT3odBJv6xY2xKU1S1bsbU2cbMM7myHCkIpWxyjZzTR5MDfGgocImU9-QTNYF5OZ~4KnnVh7mdyq-T4hknGoepest7Y~arWa-UGVpjL-ddpHjApWd1B3VjKix~TPsr511VJuQPQGfR58pH8e4g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
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
                {/* {
                  dataInvite?.included?.length > 0 && 
                    <Paragraph h4 bold textSteelBlueColor title={dataInvite?.included[0]?.attributes?.first-name} style={GlobalStyles.mb20} />
                } */}
                <Paragraph h4 bold textSteelBlueColor title={`Kelly Choo`} style={GlobalStyles.mb20} />
                {dataInvite?.included && dataInvite?.included?.length > 0 && (
                  <Paragraph
                    textCenter
                    textSteelBlueColor
                    bold600
                    p
                    title={dataInvite?.included[0]?.attributes.introductions}
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
