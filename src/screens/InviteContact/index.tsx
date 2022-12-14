import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Link, Loading, HeaderSmallBlue, ButtonSocial} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {t} from 'i18next';
import {Trans} from 'react-i18next';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONTACT>;

const InviteContactScreen = ({navigation}: Props) => {
  const onLinkedIn = () => {
    console.log(123213);
  };

  const onPhoneContact = () => {
    navigation.navigate(AppRoute.LIST_CONTACT);
  };

  const onSkip = () => {
    navigation.navigate(AppRoute.INTRO);
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue isBackButton={false} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView
          style={GlobalStyles.scrollViewWhite}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.justifyCenter]}>
            <View style={GlobalStyles.mb15}>
              <Trans
                i18nKey='increase_the_reach'
                components={{
                  text: <Text style={[GlobalStyles.p, styles.text]} />,
                  highlight: <Text style={[GlobalStyles.p, styles.textHighLight]} />,
                }}
              />
            </View>
            <View style={GlobalStyles.mb40}>
              <Trans
                i18nKey='go_ahead'
                values={{number: 25}}
                components={{
                  text: <Text style={[GlobalStyles.p, styles.text]} />,
                  highlight: <Text style={[GlobalStyles.p, styles.textHighLight]} />,
                }}
              />
            </View>
            <ButtonSocial
              iconUrl={IMAGES.iconLinkedin}
              iconStyleContainer={styles.iconLinkedInStyleContainer}
              iconStyle={styles.icon}
              onPress={onLinkedIn}
              title={t('invite_linkedin')}
              buttonContainerStyle={{...GlobalStyles.mb15, ...styles.btnLinkedIn}}
            />
            <ButtonSocial
              iconUrl={IMAGES.iconPhone}
              iconStyleContainer={styles.iconPhoneStyleContainer}
              iconStyle={styles.icon}
              onPress={onPhoneContact}
              title={t('invite_contact')}
              buttonContainerStyle={{...GlobalStyles.mb40, ...styles.btnContact}}
            />
            <Link
              onPress={onSkip}
              h4
              textSpanishGrayColor
              textDecoration
              textCenter
              style={styles.h3Default}
              title={t('skip_for_now')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default InviteContactScreen;
