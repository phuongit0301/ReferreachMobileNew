import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {Trans, useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {updateUserInAppStatus} from '~Root/services/user/actions';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {IActionUpdateUserInAppStatusSuccess} from '~Root/services/user/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.TIPS_TWO>;

const TipsTwoScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(showLoading());
    dispatch(
      updateUserInAppStatus(
        {in_app_status: IN_APP_STATUS_ENUM.SIGNUP_GUIDE_TIPS},
        (response: IActionUpdateUserInAppStatusSuccess['payload']) => {
          dispatch(hideLoading());
          if (response.success) {
            navigation.navigate(AppRoute.BOTTOM_TAB);
          }
        },
      ),
    );
  };

  return (
    <View style={[GlobalStyles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left', 'bottom']}>
        <View style={styles.burgerMenuContainer}>
          <View style={[GlobalStyles.center, styles.burgerMenuArea]}>
            <FastImage source={IMAGES.iconBurgerMenu} resizeMode='contain' style={styles.burgerMenu} />
          </View>
          <View style={styles.arrowBurgerContainer}>
            <FastImage source={IMAGES.arrowBurgerMenu} resizeMode='contain' style={styles.arrowBurgerMenu} />
            <View style={[GlobalStyles.p10, styles.blocks, styles.burgerTipsContainer]}>
              <Trans
                i18nKey='burger_menu_tips'
                parent={Text}
                components={{
                  normal: <Text style={[styles.textNormal, GlobalStyles.textCenter, styles.content]} />,
                  bold: <Text style={[GlobalStyles.textBold, GlobalStyles.textCenter, styles.content]} />,
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={[GlobalStyles.ph15, GlobalStyles.pv5, styles.btnMoreTips]} onPress={onUpdate}>
          <Paragraph textWhite title={t('end_help')} />
        </TouchableOpacity>
        <View style={[styles.bottom, GlobalStyles.flexRow]}>
          <View style={styles.arrowAskContainer}>
            <View style={[GlobalStyles.p10, styles.blocks, styles.askTipsContainer]}>
              <Trans
                i18nKey='chat_tips'
                parent={Text}
                components={{
                  normal: <Text style={[styles.textNormal, GlobalStyles.textCenter, styles.content]} />,
                  bold: <Text style={[GlobalStyles.textBold, GlobalStyles.textCenter, styles.content]} />,
                }}
              />
            </View>
            <FastImage source={IMAGES.arrowChat} resizeMode='contain' style={styles.arrowChat} />
          </View>
          <View style={styles.arrowTrustNetworkContainer}>
            <View style={[GlobalStyles.p10, styles.blocks, styles.trustNetworkTipsContainer]}>
              <Trans
                i18nKey='trust_network_tips'
                parent={Text}
                components={{
                  normal: <Text style={[styles.textNormal, GlobalStyles.textCenter, styles.content]} />,
                  bold: <Text style={[GlobalStyles.textBold, GlobalStyles.textCenter, styles.content]} />,
                }}
              />
            </View>
            <FastImage source={IMAGES.arrowTrustNetwork} resizeMode='contain' style={styles.arrowTrustNetwork} />
          </View>
          <View style={styles.iconContainer}>
            <FastImage source={IMAGES.iconTrustNetwork} resizeMode='contain' style={GlobalStyles.iconYourAsk} />
            <Paragraph textSilverChaliceColor bold600 title={'Trust'} style={GlobalStyles.mt3} />
          </View>
          <View style={styles.iconContainer}>
            <FastImage source={IMAGES.iconChat} resizeMode='contain' style={GlobalStyles.iconYourAsk} />
            <Paragraph textSilverChaliceColor bold600 title={'Chat'} style={GlobalStyles.mt3} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TipsTwoScreen;
