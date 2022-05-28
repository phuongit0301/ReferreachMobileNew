import React from 'react';
import {TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import {Icon, Paragraph} from '~Root/components';
import styles from './styles';
import FastImage, {ImageStyle} from 'react-native-fast-image';

interface Props {
  title?: string;
  onPress?: () => void;
  iconName?: string;
  buttonContainerStyle?: ViewStyle & TextStyle;
  titleStyle?: ViewStyle & TextStyle;
  iconColor?: string;
  iconSize?: number;
  showIcon?: boolean;
  disabled?: boolean;
  showIconImage?: boolean;
  resizeMode?: 'cover' | 'contain';
  imageUrl?: any;
  imageStyle?: ImageStyle;
}

const ButtonSecond: React.FC<Props> = ({
  onPress,
  buttonContainerStyle,
  title,
  titleStyle,
  iconName = 'home',
  iconColor = BASE_COLORS.oxleyColor,
  iconSize = 14,
  showIcon = true,
  showIconImage = false,
  disabled = false,
  imageUrl,
  resizeMode = 'cover',
  imageStyle = {},
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.buttonContainer, buttonContainerStyle]} onPress={onPress}>
      {showIconImage && <FastImage source={imageUrl} resizeMode={resizeMode} style={[styles.icon, imageStyle]} />}
      <Paragraph h5 style={[styles.title, titleStyle]} title={title} />
      {showIcon && <Icon name={iconName} size={iconSize} color={iconColor} enableRTL={true} />}
    </TouchableOpacity>
  );
};

export default ButtonSecond;
