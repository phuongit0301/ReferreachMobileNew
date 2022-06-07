import React from 'react';
import {View, TouchableOpacity, TextStyle, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
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
  iconRightStyle?: ImageStyle;
}

const HeaderSmallBlueWithBG: React.FC<Props> = ({
  title,
  isBackButton = false,
  onBack = () => {},
  isLogo = false,
  containerHeaderStyle = {},
  headerTextStyle = {},
  iconBackUrl = IMAGES.iconBackWhite,
  iconStyle = {},
  isRightButton = false,
  onRightPress = () => {},
  iconRightStyle = {},
  iconRightUrl = IMAGES.iconBurgerMenuWhite,
}) => {
  const {t} = useTranslation();

  return (
    <LinearGradient
      colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
      style={[GlobalStyles.pt40, GlobalStyles.pb40, GlobalStyles.flexRow]}>
      <View style={styles.imageBgContainer}>
        <FastImage source={IMAGES.headerSmalBg} resizeMode='contain' style={styles.imageBg} />
      </View>
      <View
        style={[
          GlobalStyles.flexRow,
          GlobalStyles.container,
          GlobalStyles.justifyBetween,
          GlobalStyles.alignCenter,
          containerHeaderStyle,
        ]}>
        <View style={styles.left}>
          {isLogo && <FastImage source={IMAGES.logoSmall} style={[GlobalStyles.ml15, styles.logoSmall]} />}
          {isBackButton && (
            <TouchableOpacity onPress={onBack} style={[GlobalStyles.ml15]}>
              <Image source={iconBackUrl} style={[styles.iconBack, iconStyle]} />
            </TouchableOpacity>
          )}
        </View>
        <View style={[GlobalStyles.flexColumn, styles.groupHeader]}>
          <Paragraph
            bold600
            textWhite
            h5
            style={[GlobalStyles.textCenter, headerTextStyle]}
            title={title ?? t('referreach')}
          />
          <Paragraph
            textWhite
            style={[GlobalStyles.textCenter, headerTextStyle]}
            title={`Creating an Ask is as easy as 1-2-3!`}
          />
        </View>
        <View style={styles.right}>
          {isRightButton && (
            <TouchableOpacity onPress={onRightPress} style={[GlobalStyles.mr15]}>
              <Image source={iconRightUrl} resizeMode='contain' style={[styles.iconRight, iconRightStyle]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeaderSmallBlueWithBG;
