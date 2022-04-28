import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {GlobalStyles, IMAGES, BASE_COLORS} from '~Root/config';
import {Image} from '~Root/components';
import FastImage from 'react-native-fast-image';
import styles from '../AuthHeader/styles';

interface Props {
  isBackButton?: boolean;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
}

const HeaderSmallBlue: React.FC<Props> = ({isBackButton = false, onBack = () => {}, containerHeaderStyle = {}}) => {
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
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.mr10]}>
            <Image source={IMAGES.iconBackGreen} style={GlobalStyles.iconBack} />
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
