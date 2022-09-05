import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  inputIconStyle: {
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
  buttonSignUpContainerStyle: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
  },
  h3BoldSignUpDefault: {
    fontFamily: BASE_FONTS.notoSansExtraBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.oxleyColor,
    fontSize: adjust(14),
  },
  h3: {
    ...GlobalStyles.mb38,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
  },
  h3Default: {
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.notoSansExtraBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
    fontSize: adjust(14),
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
  border: {
    borderBottomColor: BASE_COLORS.oxleyColor,
    borderBottomWidth: 1,
  },
});
