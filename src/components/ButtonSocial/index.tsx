import React from 'react';
import {TouchableOpacity, ViewStyle, TextStyle, View} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Image, Paragraph, Icon} from '~Root/components';
import styles from './styles';

interface Props {
  title?: string;
  onPress?: () => void;
  iconUrl?: number;
  buttonContainerStyle?: ViewStyle;
  titleContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  iconStyleContainer?: ViewStyle;
  iconStyle?: ImageStyle;
  showIcon?: boolean;
  disabled?: boolean;
}

const ButtonSocial: React.FC<Props> = ({
  onPress,
  buttonContainerStyle,
  titleContainerStyle,
  title,
  titleStyle,
  iconUrl,
  iconStyleContainer = {},
  iconStyle = {},
  showIcon = true,
  disabled = false,
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.buttonContainer, buttonContainerStyle]} onPress={onPress}>
      {showIcon && iconUrl ? (
        <View style={iconStyleContainer}>
          <Image source={iconUrl} resizeMode='contain' style={iconStyle} />
        </View>
      ) : (
        <Icon name={'fa-facebook'} size={20} color={BASE_COLORS.blackColor} enableRTL={true} />
      )}
      <View style={[GlobalStyles.container, GlobalStyles.center, titleContainerStyle]}>
        <Paragraph h5 textBlack textCenter style={titleStyle} title={title} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonSocial;
