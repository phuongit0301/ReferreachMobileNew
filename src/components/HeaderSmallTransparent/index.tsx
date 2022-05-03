import React from 'react';
import {View, TouchableOpacity, TextStyle, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ImageStyle} from 'react-native-fast-image';

import {GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';
import styles from './styles';

interface Props {
  title: string;
  isBackButton?: boolean;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  iconBackUrl?: number;
  iconStyle?: ImageStyle;
  isRightButton?: boolean;
  onRightPress?: () => void;
  iconRightUrl?: number;
  iconRightStyle?: ImageStyle;
}

const HeaderSmallTransparent: React.FC<Props> = ({
  title,
  isBackButton = false,
  onBack = () => {},
  containerHeaderStyle = {},
  headerTextStyle = {},
  iconBackUrl = IMAGES.iconBackGrey,
  iconStyle = {},
  isRightButton = false,
  onRightPress = () => {},
  iconRightStyle = {},
  iconRightUrl = IMAGES.iconBurgerMenu,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pb15, containerHeaderStyle]}>
      <View style={styles.left}>
        {isBackButton && (
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.ml15]}>
            <Image source={iconBackUrl} style={[styles.iconBack, iconStyle]} />
          </TouchableOpacity>
        )}
      </View>
      <Paragraph
        h5
        style={[GlobalStyles.headerTextBlue, styles.center, headerTextStyle]}
        title={title ?? t('referreach')}
      />
      <View style={styles.right}>
        {isRightButton && (
          <TouchableOpacity onPress={onRightPress} style={[GlobalStyles.mr15]}>
            <Image source={iconRightUrl} resizeMode='contain' style={[styles.iconRight, iconRightStyle]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderSmallTransparent;
