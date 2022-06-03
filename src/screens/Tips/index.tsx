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
import {IActionUpdateUserInAppStatusSuccess} from '~Root/services/user/types';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.TIPS>;

const TipsScreen = ({navigation}: Props) => {
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
        <TouchableOpacity style={[GlobalStyles.ph20, GlobalStyles.pv5, styles.btnTips]} onPress={onUpdate}>
          <Paragraph textWhite title={t('skip')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyles.ph15, GlobalStyles.pv5, styles.btnMoreTips]}
          onPress={() => navigation.replace(AppRoute.TIPS_TWO)}>
          <Paragraph textWhite title={t('more_tips')} />
        </TouchableOpacity>
        <View style={[styles.bottom, GlobalStyles.flexRow]}>
          <View style={styles.arrowYourAskContainer}>
            <View style={[GlobalStyles.p10, styles.blocks, styles.yourAskTipsContainer]}>
              <Trans
                i18nKey='your_ask_tips'
                parent={Text}
                components={{
                  normal: <Text style={[styles.textNormal, GlobalStyles.textCenter, styles.content]} />,
                  bold: <Text style={[GlobalStyles.textBold, GlobalStyles.textCenter, styles.content]} />,
                }}
              />
            </View>
            <FastImage source={IMAGES.arrowYourAsk} resizeMode='contain' style={styles.arrowYourAsk} />
          </View>
          <View style={styles.arrowAirFeedContainer}>
            <View style={[GlobalStyles.p10, styles.blocks, styles.airFeedTipsContainer]}>
              <Trans
                i18nKey='air_feed_tips'
                parent={Text}
                components={{
                  normal: <Text style={[styles.textNormal, GlobalStyles.textCenter, styles.content]} />,
                  bold: <Text style={[GlobalStyles.textBold, GlobalStyles.textCenter, styles.content]} />,
                }}
              />
            </View>
            <FastImage source={IMAGES.arrowAirFeed} resizeMode='contain' style={styles.arrowAirFeed} />
          </View>
          <View style={styles.arrowAskContainer}>
            <View style={[GlobalStyles.p10, styles.blocks, styles.askTipsContainer]}>
              <Trans
                i18nKey='ask_tips'
                parent={Text}
                components={{
                  normal: <Text style={[styles.textNormal, GlobalStyles.textCenter, styles.content]} />,
                  bold: <Text style={[GlobalStyles.textBold, GlobalStyles.textCenter, styles.content]} />,
                }}
              />
            </View>
            <FastImage source={IMAGES.arrowAsk} resizeMode='contain' style={styles.arrowAsk} />
          </View>
          <View style={styles.iconContainer}>
            <FastImage source={IMAGES.iconYourAsk} resizeMode='contain' style={GlobalStyles.iconYourAsk} />
            <Paragraph textSilverChaliceColor bold600 title={'Your Ask'} style={[GlobalStyles.mt3, styles.textSmall]} />
          </View>
          <View style={styles.iconContainer}>
            <FastImage source={IMAGES.iconAIRFeed} resizeMode='contain' style={GlobalStyles.iconYourAsk} />
            <Paragraph textSilverChaliceColor bold600 title={'Air Feed'} style={[GlobalStyles.mt3, styles.textSmall]} />
          </View>
          <View style={styles.iconContainer}>
            <FastImage source={IMAGES.iconAsk} resizeMode='contain' style={GlobalStyles.iconYourAsk} />
            <Paragraph textSilverChaliceColor bold600 title={'Ask'} style={[GlobalStyles.mt3, styles.textSmall]} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TipsScreen;
