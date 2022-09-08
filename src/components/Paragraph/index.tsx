import React from 'react';
import {Text} from 'react-native';

import styles from './styles';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  bold?: boolean;
  bold400?: boolean;
  bold500?: boolean;
  bold600?: boolean;
  bold700?: boolean;
  italic?: boolean;
  textPrimary?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textTealBlue?: boolean;
  textGreyColor?: boolean;
  textOxleyColor?: boolean;
  textIndianRedColor?: boolean;
  textSteelBlueColor?: boolean;
  textSteelBlue2Color?: boolean;
  textEerieBlackColor?: boolean;
  textSpanishGrayColor?: boolean;
  textSpanishGray2Color?: boolean;
  textTimberWolfColor?: boolean;
  textForestGreenColor?: boolean;
  textForestGreen2Color?: boolean;
  textDarkGrayColor?: boolean;
  textGray2Color?: boolean;
  textDavysGreyColor?: boolean;
  textDesireColor?: boolean;
  textSilverChaliceColor?: boolean;
  textGraniteGrayColor?: boolean;
  textBrightGrayColor?: boolean;
  textLavenderGrayColor?: boolean;
  textJetColor?: boolean;
  textCenter?: boolean;
  textRight?: boolean;
  textLeft?: boolean;
  title?: string;
  style?: any;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
}

const Paragraph: React.FC<Props> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  bold,
  bold400,
  bold500,
  bold600,
  bold700,
  italic,
  textPrimary,
  textWhite,
  textBlack,
  textTealBlue,
  textGreyColor,
  textOxleyColor,
  textIndianRedColor,
  textSteelBlueColor,
  textSteelBlue2Color,
  textEerieBlackColor,
  textSpanishGrayColor,
  textSpanishGray2Color,
  textTimberWolfColor,
  textForestGreenColor,
  textForestGreen2Color,
  textDarkGrayColor,
  textGray2Color,
  textDavysGreyColor,
  textDesireColor,
  textSilverChaliceColor,
  textGraniteGrayColor,
  textBrightGrayColor,
  textLavenderGrayColor,
  textJetColor,
  textCenter,
  textRight,
  textLeft,
  title,
  style,
  numberOfLines = undefined,
  ellipsizeMode = 'tail',
  ...rest
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.default,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        h5 && styles.h5,
        h6 && styles.h6,
        p && styles.p,
        bold && styles.bold,
        bold400 && styles.bold400,
        bold500 && styles.bold500,
        bold600 && styles.bold600,
        bold700 && styles.bold700,
        italic && styles.italic,
        textPrimary && styles.textPrimary,
        textWhite && styles.textWhite,
        textBlack && styles.textBlack,
        textTealBlue && styles.textTealBlue,
        textGreyColor && styles.textGreyColor,
        textOxleyColor && styles.textOxleyColor,
        textIndianRedColor && styles.textIndianRedColor,
        textSteelBlueColor && styles.textSteelBlueColor,
        textSteelBlue2Color && styles.textSteelBlue2Color,
        textEerieBlackColor && styles.textEerieBlackColor,
        textSpanishGrayColor && styles.textSpanishGrayColor,
        textSpanishGray2Color && styles.textSpanishGray2Color,
        textTimberWolfColor && styles.textTimberWolfColor,
        textForestGreenColor && styles.textForestGreenColor,
        textForestGreen2Color && styles.textForestGreen2Color,
        textDarkGrayColor && styles.textDarkGrayColor,
        textGray2Color && styles.textGray2Color,
        textDavysGreyColor && styles.textDavysGreyColor,
        textDesireColor && styles.textDesireColor,
        textSilverChaliceColor && styles.textSilverChaliceColor,
        textGraniteGrayColor && styles.textGraniteGrayColor,
        textBrightGrayColor && styles.textBrightGrayColor,
        textLavenderGrayColor && styles.textLavenderGrayColor,
        textJetColor && styles.textJetColor,
        textCenter && styles.textCenter,
        textRight && styles.textRight,
        textLeft && styles.textLeft,
        style,
      ]}
      {...rest}>
      {title}
    </Text>
  );
};

export default Paragraph;
