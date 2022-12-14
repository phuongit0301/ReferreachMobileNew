import {StyleSheet} from 'react-native';

import {adjust} from '~Root/utils';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from '~Root/config';

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
  p: {
    fontSize: adjust(BASE_STYLES.p),
  },
  bold: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: 'bold',
  },
  bold600: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
  },
  italic: {
    fontStyle: 'italic',
  },
  default: {
    fontFamily: BASE_FONTS.regular,
  },
  textWhite: {
    color: BASE_COLORS.whiteColor,
  },
  textBlack: {
    color: BASE_COLORS.blackColor,
  },
  underline: {
    textDecorationLine: 'underline',
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
  textIndianRedColor: {
    color: BASE_COLORS.indianRedColor,
  },
  textForestGreenColor: {
    color: BASE_COLORS.forestGreenColor,
  },
  textDarkGrayColor: {
    color: BASE_COLORS.darkGrayColor,
  },
  textSpanishGrayColor: {
    color: BASE_COLORS.spanishGrayColor,
  },
  textGray3Color: {
    color: BASE_COLORS.gray3Color,
  },
  textCenter: {
    textAlign: 'center',
  },
});
