import React from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, Loading, AuthHeader, Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONFIRM>;

const InviteConfirmScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const onAccept = () => {
    navigation.navigate(AppRoute.REGISTER);
  };

  const onReject = () => {
    navigation.goBack();
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
                <FastImage
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1651449600&Signature=gN3HddE96zhceWpqed3Y4PEQEk~63Tjlq9pctkLn6RQ8o5-YpaDukjfdyrRfckfkkdOm9hJSUfJw8sbn8xYffwa8qC5tvx9q57oNDV9ec4jghtEx2gwytrGhMHDN56xgBREO7lrW4gSZuOIH4M2MGLZYW1u8vnno2nKzO8bYoV~9~CjfHje~8pMpnjejXaJOs~nXtT3odBJv6xY2xKU1S1bsbU2cbMM7myHCkIpWxyjZzTR5MDfGgocImU9-QTNYF5OZ~4KnnVh7mdyq-T4hknGoepest7Y~arWa-UGVpjL-ddpHjApWd1B3VjKix~TPsr511VJuQPQGfR58pH8e4g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                  }}
                  style={[GlobalStyles.avatar, GlobalStyles.mb15]}
                />
                <Paragraph h4 bold textSteelBlueColor title='Kelly Choo' style={GlobalStyles.mb20} />
                <Paragraph
                  textCenter
                  textSteelBlueColor
                  bold600
                  p
                  title='wants to invite you to his Trust Network and be one of his referral partners.'
                />
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
