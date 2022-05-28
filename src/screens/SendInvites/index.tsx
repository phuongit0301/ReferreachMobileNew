import React from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, Loading, Paragraph, Icon, HeaderSmallBlue} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {adjust} from '~Root/utils';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.SEND_INVITES>;

const SendInvitesScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const onAccept = () => {
    navigation.navigate(AppRoute.INTRO);
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue
        iconBackUrl={IMAGES.iconBackWhite}
        iconStyle={GlobalStyles.iconBackWhiteStyle}
        onBack={onBack}
        isBackButton={true}
      />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView>
          <ScrollView
            style={GlobalStyles.scrollViewWhite}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.mt30]}>
              <View style={GlobalStyles.alignCenter}>
                <Icon name='paper-plane' size={adjust(30)} color={BASE_COLORS.blackColor} style={GlobalStyles.mb10} />
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
                  <Paragraph textForestGreenColor bold600 title='Your invites ' />
                  <Paragraph textBlack bold600 title='are on the way!' />
                </View>
                <View style={GlobalStyles.justifyCenter}>
                  <Paragraph textCenter bold600 title='The next ' />
                  <Paragraph textCenter bold600 title='connection could be ' />
                  <Paragraph textCenter bold600 title='life changing!' />
                </View>
              </View>
              <View style={[GlobalStyles.container, GlobalStyles.flexColumn, GlobalStyles.mt30]}>
                <Button
                  title={t('share_invite')}
                  h4
                  textCenter
                  onPress={onBack}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...GlobalStyles.mb30,
                    ...GlobalStyles.mh15,
                    ...styles.buttonContainerStyle,
                  }}
                  textStyle={styles.textPrimary}
                />
                <Button
                  title={t('proceed')}
                  h4
                  textCenter
                  onPress={onAccept}
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

export default SendInvitesScreen;
