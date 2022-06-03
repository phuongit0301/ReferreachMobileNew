import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {headerByRatio, adjust} from '~Root/utils';

const ratio = headerByRatio();

export default StyleSheet.create({
  inputWrapperStyle: {
    ...GlobalStyles.inputStyle,
    ...GlobalStyles.mb15,
    borderRadius: adjust(20),
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  inputIconStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.inputStyle,
    color: BASE_COLORS.blackColor,
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.steelBlueColor,
  },
  iconContainer: {
    position: 'absolute',
    right: adjust(10),
    zIndex: 10,
    ...GlobalStyles.ph10,
    ...GlobalStyles.pv10,
  },
  icon: {
    width: adjust(25),
    height: adjust(25),
  },
  iconSubtract: {
    width: adjust(20),
    height: adjust(20),
  },
  styleTag: {
    borderTopLeftRadius: adjust(22),
    borderTopRightRadius: adjust(22),
    borderBottomLeftRadius: adjust(22),
    borderBottomRightRadius: adjust(22),
    backgroundColor: BASE_COLORS.brightGrayColor,
    width: '100%',
  },
  styleDropDown: {
    borderTopLeftRadius: adjust(22),
    borderTopRightRadius: adjust(22),
    borderBottomLeftRadius: adjust(22),
    borderBottomRightRadius: adjust(22),
    backgroundColor: BASE_COLORS.whiteColor,
  },
  styleButton: {
    borderTopLeftRadius: adjust(22),
    borderTopRightRadius: adjust(22),
    borderBottomLeftRadius: adjust(22),
    borderBottomRightRadius: adjust(22),
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderWidth: 0,
    height: 'auto',
    width: '100%',
  },
  buttonTextStyle: {
    ...GlobalStyles.p,
    color: BASE_COLORS.steelBlue2Color,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    textAlign: 'left',
  },
  inputArea: {
    ...GlobalStyles.p,
    flex: 1,
    width: '100%',
    lineHeight: adjust(15),
    color: BASE_COLORS.gunmetalColor,
    height: '100%',
  },
  inputAreaContainer: {
    ...GlobalStyles.mt5,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderRadius: adjust(4),
    width: '100%',
    height: adjust(150),
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'flex-start',
    borderColor: BASE_COLORS.steelBlue2Color,
    borderWidth: 1,
  },
  fontSmall: {
    fontSize: adjust(10),
  },
  btnAdd: {
    textAlign: 'right',
  },
  fileType: {
    fontSize: adjust(13),
  },
  iconUploadDone: {
    width: adjust(64),
    height: adjust(62),
  },
  iconTrash: {
    width: adjust(22),
    height: adjust(22),
  },
  iconDropDown: {
    width: adjust(22),
    height: adjust(22),
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
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
});
