import React from 'react';
import {Alert, Share, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {AppRoute} from '~Root/navigation/AppRoute';
import {ButtonSecond, Link, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {DEEP_LINK_URL} from '~Root/private/api';
import styles from './styles';

const AskPubish = ({navigation}: any) => {
  const {t} = useTranslation();

  const askState = useSelector((state: IGlobalState) => state.askState);

  const onShare = async () => {
    try {
      if (!askState?.dataAskCreated?.id) {
        return false;
      }
      await Share.share({
        title: askState?.dataAskCreated?.attributes?.greeting ?? '',
        message: `${DEEP_LINK_URL}/a/${askState?.dataAskCreated?.id}`,
      });
    } catch (error) {
      Alert.alert((error as any).message);
    }
  };

  const onLinkClick = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: AppRoute.ASK}],
    });
    navigation.dispatch(resetAction);
    navigation.navigate(AppRoute.YOUR_ASK);
  };

  return (
    <View style={[GlobalStyles.container, GlobalStyles.center]}>
      <FastImage source={IMAGES.iconCatPublish} resizeMode='cover' style={styles.iconCatPublish} />
      <Paragraph h2 textSteelBlue2Color title='Woohoo!' />
      <Paragraph h3 textSteelBlue2Color title='You published your Ask!' />
      <ButtonSecond
        title='Share you ask'
        buttonContainerStyle={{...GlobalStyles.mb30, ...styles.btnDone}}
        titleStyle={styles.titleStyle}
        onPress={onShare}
        showIcon={false}
        showIconImage={true}
        imageUrl={IMAGES.iconArrowUpCircle}
        imageStyle={GlobalStyles.mr5}
      />
      <Link onPress={onLinkClick} h5 textSpanishGrayColor textDecoration textCenter title={t('skip_for_now')} />
    </View>
  );
};

export default AskPubish;
