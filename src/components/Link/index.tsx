import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  title: string;
  style?: any;
  bold?: boolean;
  bold600?: boolean;
  italic?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textTealBlue?: boolean;
  textGreyColor?: boolean;
  textOxleyColor?: boolean;
  textIndianRedColor?: boolean;
  textSteelBlueColor?: boolean;
  textForestGreenColor?: boolean;
  textDarkGrayColor?: boolean;
  textSpanishGrayColor?: boolean;
  textGray3Color?: boolean;
  textCenter?: boolean;
  textDecoration?: boolean;
  onPress?: any;
}

const Link: React.FC<Props> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  title,
  style,
  bold,
  bold600,
  italic,
  textWhite,
  textBlack,
  textTealBlue,
  textGreyColor,
  textOxleyColor,
  textIndianRedColor,
  textSteelBlueColor,
  textForestGreenColor,
  textDarkGrayColor,
  textSpanishGrayColor,
  textGray3Color,
  textCenter,
  textDecoration,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          h1 && styles.h1,
          h2 && styles.h2,
          h3 && styles.h3,
          h4 && styles.h4,
          h5 && styles.h5,
          p && styles.p,
          bold && styles.bold,
          bold600 && styles.bold600,
          italic && styles.italic,
          textWhite && styles.textWhite,
          textBlack && styles.textBlack,
          textTealBlue && styles.textTealBlue,
          textGreyColor && styles.textGreyColor,
          textOxleyColor && styles.textOxleyColor,
          textIndianRedColor && styles.textIndianRedColor,
          textSteelBlueColor && styles.textSteelBlueColor,
          textForestGreenColor && styles.textForestGreenColor,
          textDarkGrayColor && styles.textDarkGrayColor,
          textSpanishGrayColor && styles.textSpanishGrayColor,
          textGray3Color && styles.textGray3Color,
          textCenter && styles.textCenter,
          textDecoration && styles.underline,
          styles.default,
          style,
        ]}
        {...rest}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Link.defaultProps = {
  title: 'Link',
  style: {},
  bold: false,
  italic: false,
  textDecoration: false,
  onPress: () => {},
};

export default Link;
