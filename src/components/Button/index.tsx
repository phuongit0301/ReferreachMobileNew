import React from 'react';
import {View, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';

import {Paragraph} from '..';
import styles from './styles';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  bold?: boolean;
  bold600?: boolean;
  italic?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textTealBlue?: boolean;
  textGreyColor?: boolean;
  textCenter?: boolean;
  title?: string;
  onPress?: any;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isIconLeft?: boolean;
  isIconRight?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  bold600,
  italic,
  textWhite,
  textBlack,
  textTealBlue,
  textGreyColor,
  textCenter,
  title = 'Save',
  onPress = () => {},
  containerStyle = {},
  textStyle = {},
  disabled = false,
  isIconLeft = false,
  isIconRight = false,
  children,
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.containerCommonStyle, containerStyle]}>
        {isIconLeft && children}
        <Paragraph
          h1={h1}
          h2={h2}
          h3={h3}
          h4={h4}
          h5={h5}
          p={p}
          bold={bold}
          bold600={bold600}
          italic={italic}
          textWhite={textWhite}
          textBlack={textBlack}
          textTealBlue={textTealBlue}
          textGreyColor={textGreyColor}
          textCenter={textCenter}
          style={[styles.textColor, textStyle]}
          title={title}
        />
        {isIconRight && children}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
