import React from 'react';
import {View, TouchableOpacity, TextStyle, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import {GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';
import styles from './styles';

interface Props {
  title: string;
  isBackButton?: boolean;
  onBack?: () => void;
  isLogo?: boolean;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  iconBackUrl?: number;
  iconStyle?: ImageStyle;
  isRightButton?: boolean;
  onRightPress?: () => void;
  iconRightUrl?: number;
  iconRightContainerStyle?: ViewStyle;
  iconRightStyle?: ImageStyle;
}

const HeaderSmallTransparent: React.FC<Props> = ({
  title,
  isBackButton = false,
  onBack = () => {},
  isLogo = false,
  containerHeaderStyle = {},
  headerTextStyle = {},
  iconBackUrl = IMAGES.iconBackGrey,
  iconStyle = {},
  isRightButton = false,
  onRightPress = () => {},
  iconRightContainerStyle = {},
  iconRightStyle = {},
  iconRightUrl = IMAGES.iconBurgerMenu,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv15, containerHeaderStyle]}>
      <View style={styles.left}>
        {isLogo && <FastImage source={IMAGES.logoSmall} style={[GlobalStyles.ml15, styles.logoSmall]} />}
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
      <View style={[styles.right, iconRightContainerStyle]}>
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
