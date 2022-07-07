import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, Loading, AuthHeader, Paragraph, Link} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;

const CheckYourEmailScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

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
              <Paragraph h5 textSteelBlueColor bold600 title={t('check_your_mail')} style={GlobalStyles.mb15} />
              <Paragraph p textDavysGreyColor title={t('check_your_mail_description')} style={GlobalStyles.mb20} />
              <View>
                <Button
                  title={t('ok')}
                  h3
                  textCenter
                  containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                  textStyle={styles.h3BoldDefault}
                  onPress={() => navigation.navigate(AppRoute.LOGIN)}
                />
                <Link
                  h5
                  textSpanishGrayColor
                  textDecoration
                  style={[GlobalStyles.textCenter, GlobalStyles.mt20, styles.h3Default]}
                  title={t('check_your_mail_link')}
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

export default CheckYourEmailScreen;
