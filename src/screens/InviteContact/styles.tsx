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
    backgroundColor: BASE_COLORS.oxleyColor,
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
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
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
  text: {
    ...GlobalStyles.h5,
    ...GlobalStyles.textCenter,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.jetColor,
  },
  textHighLight: {
    ...GlobalStyles.h5,
    ...GlobalStyles.textCenter,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.forestGreenColor,
  },
  btnLinkedIn: {
    borderColor: BASE_COLORS.starCommandBlueColor,
  },
  btnContact: {
    borderColor: BASE_COLORS.davyGreyColor,
  },
  icon: {
    width: adjust(25),
    height: adjust(25),
  },
  iconLinkedInStyleContainer: {
    backgroundColor: BASE_COLORS.starCommandBlueColor,
    borderTopLeftRadius: adjust(11),
    borderBottomLeftRadius: adjust(11),
    paddingVertical: adjust(10),
    paddingHorizontal: adjust(15),
  },
  iconPhoneStyleContainer: {
    backgroundColor: BASE_COLORS.davyGreyColor,
    borderTopLeftRadius: adjust(11),
    borderBottomLeftRadius: adjust(11),
    paddingVertical: adjust(10),
    paddingHorizontal: adjust(15),
  },
});
