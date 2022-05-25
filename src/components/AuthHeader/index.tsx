import React from 'react';
import {View, TouchableOpacity, ViewStyle, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

export interface Props {
  style?: ViewStyle;
  styleLeft?: ViewStyle;
  styleLogoContainer?: ViewStyle;
  showLeft?: boolean;
  onPressLeft?: () => void;
}

const AuthHeader: React.FC<Props> = ({
  style = {},
  styleLeft = {},
  styleLogoContainer = {},
  showLeft = true,
  onPressLeft = () => {},
}) => {
  return (
    <SafeAreaView style={[styles.widthFull, GlobalStyles.mt10]} edges={['top', 'left', 'right', 'bottom']}>
      <View style={[GlobalStyles.flexRow, style]}>
        {showLeft && (
          <TouchableOpacity style={[styles.iconBackContainer, styleLeft]} onPress={onPressLeft}>
            <Image source={IMAGES.iconBackGreen} resizeMode={'contain'} />
          </TouchableOpacity>
        )}
        <View style={[GlobalStyles.container, GlobalStyles.center, styles.logoContainer, styleLogoContainer]}>
          <Image source={IMAGES.logo} resizeMode={'contain'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthHeader;
