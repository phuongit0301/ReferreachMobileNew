import React from 'react';
import {View, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ImageStyle} from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';

import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';
import styles from './styles';

interface Props {
  isBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  iconBackUrl?: number;
  iconStyle?: ImageStyle;
  isRightButton?: boolean;
  onRightPress?: () => void;
  iconRightUrl?: number;
  styleContainer?: ViewStyle;
  iconRightStyle?: ImageStyle;
}

const HeaderChatContextBlue: React.FC<Props> = ({
  isBackButton = false,
  onBack = () => {},
  title = '',
  containerHeaderStyle = {},
  headerTextStyle = {},
  iconBackUrl = IMAGES.iconBackWhite,
  iconStyle = {},
  isRightButton = false,
  onRightPress = () => {},
  iconRightStyle = {},
  iconRightUrl = IMAGES.iconBurgerMenuWhite,
  styleContainer = {},
  children,
}) => {
  const {t} = useTranslation();

  return (
    <LinearGradient
      colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
      style={[GlobalStyles.flexRow, styles.container, styleContainer]}>
      <View style={[GlobalStyles.flexColumn]}>
        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.container,
            GlobalStyles.justifyBetween,
            GlobalStyles.mt10,
            containerHeaderStyle,
          ]}>
          <View style={styles.left}>
            {isBackButton && (
              <TouchableOpacity onPress={onBack} style={[GlobalStyles.ml15]}>
                <Image source={iconBackUrl} style={[styles.iconBack, iconStyle]} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[GlobalStyles.flexColumn, styles.center]}>
            <Paragraph
              bold600
              textWhite
              h5
              style={[GlobalStyles.textCenter, headerTextStyle]}
              title={title ?? t('chat')}
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
        {children}
      </View>
    </LinearGradient>
  );
};

export default HeaderChatContextBlue;
