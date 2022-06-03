import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, TextInput, FlatList, Platform, KeyboardAvoidingView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {ButtonSecond, Category, HeaderSmallBlueWithBG, Link, Paragraph, Tags} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {adjust} from '~Root/utils';

type Props = NativeStackScreenProps<BottomTabParams, AppRoute.AIR_FEED>;

const PAGINATION = [1, 2, 3];
const DEFAULT_FORM_STATE = {
  greeting: false,
  role: false,
  position: true,
  description: false,
  details: false,
  positionSuggestion: false,
  descriptionSuggestion: false,
};

const AskPubish = ({navigation}: any) => {
  const {t} = useTranslation();

  const onSave = () => {
    console.log(123123);
  };
  const onLinkClick = () => {
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
