import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {AppRoute} from '~Root/navigation/AppRoute';
import {ButtonSecond, Link, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {CommonActions} from '@react-navigation/native';

const AskPubish = ({navigation}: any) => {
  const {t} = useTranslation();

  const onSave = () => {
    console.log(123123);
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
        onPress={onSave}
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
