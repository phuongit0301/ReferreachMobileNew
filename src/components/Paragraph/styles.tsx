import {adjust} from '~Root/utils';

import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  h1: {
    fontSize: adjust(BASE_STYLES.h1),
  },
  h2: {
    fontSize: adjust(BASE_STYLES.h2),
  },
  h3: {
    fontSize: adjust(BASE_STYLES.h3),
  },
  h4: {
    fontSize: adjust(BASE_STYLES.h4),
  },
  h5: {
    fontSize: adjust(BASE_STYLES.h5),
  },
  h6: {
    fontSize: adjust(BASE_STYLES.h6),
  },
  p: {
    fontSize: adjust(BASE_STYLES.p),
  },
  bold: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: 'bold',
  },
  bold400: {
    ...GlobalStyles.bold400,
  },
  bold500: {
    ...GlobalStyles.bold500,
  },
  bold600: {
    ...GlobalStyles.bold600,
  },
  bold700: {
    ...GlobalStyles.bold700,
  },
  italic: {
    fontStyle: 'italic',
  },
  default: {
    fontFamily: BASE_FONTS.regular,
  },
  textPrimary: {
    color: BASE_COLORS.primary,
  },
  textWhite: {
    color: BASE_COLORS.whiteColor,
  },
  textBlack: {
    color: BASE_COLORS.blackColor,
  },
  textTealBlue: {
    color: BASE_COLORS.tealBlueColor,
  },
  textGreyColor: {
    color: BASE_COLORS.greyColor,
  },
  textOxleyColor: {
    color: BASE_COLORS.oxleyColor,
  },
  textSteelBlueColor: {
    color: BASE_COLORS.steelBlueColor,
  },
  textSteelBlue2Color: {
    color: BASE_COLORS.steelBlue2Color,
  },
  textIndianRedColor: {
    color: BASE_COLORS.indianRedColor,
  },
  textEerieBlackColor: {
    color: BASE_COLORS.eerieBlackColor,
  },
  textSpanishGrayColor: {
    color: BASE_COLORS.spanishGrayColor,
  },
  textSpanishGray2Color: {
    color: BASE_COLORS.spanishGray2Color,
  },
  textTimberWolfColor: {
    color: BASE_COLORS.timberWolfColor,
  },
  textForestGreenColor: {
    color: BASE_COLORS.forestGreenColor,
  },
  textForestGreen2Color: {
    color: BASE_COLORS.forestGreen2Color,
  },
  textDarkGrayColor: {
    color: BASE_COLORS.darkGrayColor,
  },
  textDavysGreyColor: {
    color: BASE_COLORS.davysGreyColor,
  },
  textDesireColor: {
    color: BASE_COLORS.desireColor,
  },
  textGray2Color: {
    color: BASE_COLORS.gray2Color,
  },
  textSilverChaliceColor: {
    color: BASE_COLORS.silverChaliceColor,
  },
  textGraniteGrayColor: {
    color: BASE_COLORS.graniteGrayColor,
  },
  textBrightGrayColor: {
    color: BASE_COLORS.brightGrayColor,
  },
  textLavenderGrayColor: {
    color: BASE_COLORS.lavenderGrayColor,
  },
  textGray3Color: {
    color: BASE_COLORS.gray3Color,
  },
  textJetColor: {
    color: BASE_COLORS.jetColor,
  },
  textArsenicColor: {
    color: BASE_COLORS.arsenicColor,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
});
