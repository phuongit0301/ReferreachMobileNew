import React from 'react';
import {View, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {Image, Paragraph} from '~Root/components';
import styles from './styles';

interface Props {
  isBackButton?: boolean;
  title?: string;
  onBack?: () => void;
  containerHeaderStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  showTitle?: boolean;
}

const HeaderNormalBlue: React.FC<Props> = ({
  isBackButton = false,
  onBack = () => {},
  title = '',
  containerHeaderStyle = {},
  headerTextStyle = {},
  showTitle = true,
  children,
}) => {
  return (
    <LinearGradient
      colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
      style={[GlobalStyles.flexRow, styles.container]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.ph5]}>
        {isBackButton && (
          <TouchableOpacity onPress={onBack} style={[GlobalStyles.mr10]}>
            <Image source={IMAGES.iconBackWhite} style={GlobalStyles.iconBack} />
          </TouchableOpacity>
        )}
        {showTitle && <Paragraph h5 style={[GlobalStyles.headerTextWhite, headerTextStyle]} title={title} />}
        {children}
      </View>
    </LinearGradient>
  );
};

export default HeaderNormalBlue;
