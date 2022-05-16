import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.gainsboroColor,
  },
  inputIconStyle: {
    ...GlobalStyles.h4,
    ...GlobalStyles.inputStyle,
    color: BASE_COLORS.blackColor,
  },
  inputWrapperStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    backgroundColor: BASE_COLORS.gainsboroColor,
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.steelBlueColor,
  },
  buttonContainerStyle: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(3),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(3),
    elevation: adjust(2),
  },
  buttonSecondContainerStyle: {
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
    alignSelf: 'center',
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
  textPrimary: {
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
  textSecondary: {
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.oxleyColor,
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
});
