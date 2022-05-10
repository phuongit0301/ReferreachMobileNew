import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {GlobalStyles, IMAGES, BASE_COLORS} from '~Root/config';
import {Image} from '~Root/components';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import styles from '../AuthHeader/styles';

interface Props {
  isBackButton?: boolean;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  iconBackUrl?: number;
  iconStyle?: ImageStyle;
}

const HeaderSmallBlue: React.FC<Props> = ({
  isBackButton = false,
  onBack = () => {},
  containerHeaderStyle = {},
  iconBackUrl = IMAGES.iconBackGreen,
  iconStyle = GlobalStyles.iconBack,
}) => {
  return (
    <LinearGradient
      colors={[BASE_COLORS.steelBlueColor, BASE_COLORS.cyanCornflowerBlueColor]}
      style={[
        GlobalStyles.containerHeader,
        GlobalStyles.containerHeaderBlueSM,
        GlobalStyles.flexRow,
        containerHeaderStyle,
      ]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.ph5, GlobalStyles.header]}>
        {isBackButton && (
          <TouchableOpacity onPress={onBack} style={styles.iconBackContainer}>
            <Image source={iconBackUrl} style={iconStyle} />
          </TouchableOpacity>
        )}
        <View style={[GlobalStyles.alignCenter, GlobalStyles.fullWidth]}>
          <FastImage source={IMAGES.logo2} resizeMode='contain' style={styles.logo} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeaderSmallBlue;
