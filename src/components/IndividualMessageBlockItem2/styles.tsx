import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  checkBoxContainer: {
    ...GlobalStyles.mv20,
  },
  iconStyle: {
    ...GlobalStyles.mr5,
  },
  textStyle: {
    ...GlobalStyles.p,
    fontFamily: BASE_FONTS.semiBold,
    color: BASE_COLORS.steelBlueColor,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  imageProfileContainer: {
    ...GlobalStyles.mr10,
    maxWidth: '50%',
  },
  imageProfile: {
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(130),
  },
  styleContainer: {
    width: '100%',
  },
  inputStyle: {
    ...GlobalStyles.pv15,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
  },
  inputBorderStyle: {
    ...GlobalStyles.mt10,
    ...GlobalStyles.pt10,
    ...GlobalStyles.pb12,
    ...GlobalStyles.pv12,
    borderColor: BASE_COLORS.grayColor,
    borderWidth: 1,
    color: BASE_COLORS.darkGrayColor,
    fontSize: adjust(10),
    width: '100%',
    height: adjust(80),
    borderRadius: adjust(5),
    backgroundColor: BASE_COLORS.cultured1Color,
  },
  inputErrorStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.redColor,
  },
  labelStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.h5),
    color: BASE_COLORS.primary,
  },
  textColor: {
    color: BASE_COLORS.tealBlueColor,
  },
  disableContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BASE_COLORS.whiteColor,
    opacity: 0.4,
    zIndex: 10,
  },
  iconDoubleArrow: {
    width: adjust(20),
    height: adjust(20),
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    color: BASE_COLORS.darkGrayColor,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  textBlue: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.steelBlue2Color,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  textGreen: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.forestGreenColor,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  itemContainer: {
    width: '100%',
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(12),
  },
});
