import React from 'react';
import {TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import {Icon, Paragraph} from '~Root/components';
import styles from './styles';

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
  disabled = false,
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.buttonContainer, buttonContainerStyle]} onPress={onPress}>
      <Paragraph h5 style={[styles.title, titleStyle]} title={title} />
      {showIcon && <Icon name={iconName} size={iconSize} color={iconColor} enableRTL={true} />}
    </TouchableOpacity>
  );
};

export default ButtonSecond;
