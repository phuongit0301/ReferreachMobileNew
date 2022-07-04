import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  contentContainer: {
    flex: 0.7,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  inputIconStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    color: BASE_COLORS.blackColor,
  },
  inputWrapperStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.steelBlueColor,
  },
  buttonContainerStyle: {
    backgroundColor: BASE_COLORS.forestGreenColor,
  },
  h3: {
    ...GlobalStyles.mb38,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: adjust(BASE_STYLES.h3),
  },
  h3Default: {
    lineHeight: adjust(BASE_STYLES.h3),
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: adjust(BASE_STYLES.h3),
    color: BASE_COLORS.whiteColor,
  },
  signUpArea: {
    ...GlobalStyles.mt46,
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.persianRedColor,
  },
  iconEyeContainer: {
    position: 'absolute',
    right: adjust(10),
    zIndex: 10,
    ...GlobalStyles.ph10,
    ...GlobalStyles.pv10,
  },
  iconEye: {
    width: adjust(19),
    height: adjust(7),
  },
  iconError: {
    width: adjust(14),
    height: adjust(14),
  },
});
