import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  profileGradient: {
    borderBottomRightRadius: adjust(65),
    minHeight: adjust(200),
  },
  buttonUpdateContainerStyle: {
    ...GlobalStyles.mb20,
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    borderTopLeftRadius: adjust(24),
    borderTopRightRadius: adjust(24),
    borderBottomLeftRadius: adjust(24),
    borderBottomRightRadius: adjust(24),
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: BASE_COLORS.whiteColor,
  },
  buttonContainerStyle: {
    ...GlobalStyles.mb20,
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    borderBottomRightRadius: adjust(24),
    borderWidth: 1,
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderColor: BASE_COLORS.forestGreenColor,
  },
  txtButton: {
    fontFamily: BASE_FONTS.semiBold,
    color: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  textAreaContainerStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(10),
    backgroundColor: BASE_COLORS.brightGrayColor,
    height: adjust(100),
  },
  textAreaStyle: {
    ...GlobalStyles.pt10,
    borderRadius: adjust(10),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.brightGrayColor,
    height: adjust(80),
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.steelBlueColor,
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.persianRedColor,
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
  countCharacters: {
    alignItems: 'flex-end',
    marginTop: adjust(-20),
    marginRight: adjust(10),
  },
  iconEditContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: adjust(-20),
    marginBottom: adjust(15),
  },
  iconEdit: {
    ...GlobalStyles.p5,
    alignSelf: 'flex-end',
    backgroundColor: BASE_COLORS.steelBlue2Color,
    borderWidth: 2,
    borderColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(100),
  },
});
