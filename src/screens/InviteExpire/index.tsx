import React from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, Loading, AuthHeader, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INVITE_CONFIRM>;

const InviteExpireScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const onDone = () => {
    navigation.navigate(AppRoute.LOGIN);
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
            <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.mt30]}>
              <View style={GlobalStyles.alignCenter}>
                <FastImage source={IMAGES.iconRobotBroken} style={[GlobalStyles.avatar, GlobalStyles.mb15]} />
                <Paragraph h4 bold textSteelBlueColor title='Oops!' style={GlobalStyles.mb10} />
                <Paragraph
                  textCenter
                  textBlack
                  bold600
                  p
                  title='Seems like this invite code has expired.'
                  style={GlobalStyles.ph50}
                />
              </View>
              <View style={[GlobalStyles.container, GlobalStyles.flexColumn, GlobalStyles.mt30]}>
                <Button
                  title={t('ok')}
                  h4
                  textCenter
                  onPress={onDone}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...GlobalStyles.mb30,
                    ...styles.buttonContainerStyle,
                  }}
                  textStyle={styles.textPrimary}
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

export default InviteExpireScreen;
