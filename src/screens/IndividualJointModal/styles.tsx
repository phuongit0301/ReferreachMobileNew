import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.p15,
  },
  iconQuestion: {
    width: adjust(20),
    height: adjust(20),
  },
  checkBoxContainer: {
    ...GlobalStyles.mv20,
  },
  iconStyle: {
    ...GlobalStyles.mr5,
  },
  textStyle: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(9),
  },
  imageProfileContainer: {
    ...GlobalStyles.mr10,
    width: adjust(65),
    height: adjust(65),
    borderRadius: adjust(130),
    overflow: 'hidden',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
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
    ...GlobalStyles.p10,
    borderColor: BASE_COLORS.grayColor,
    borderWidth: 1,
    color: BASE_COLORS.primary,
    fontSize: adjust(BASE_STYLES.h5),
    width: '100%',
    textAlign: 'center',
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
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleItemContainer: {
    alignItems: 'center',
  },
  btnClose: {
    position: 'absolute',
    top: '2%',
    right: '5%',
  },
  toggleContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(12),
  },
  buttonContainerStyle: {
    backgroundColor: BASE_COLORS.forestGreenColor,
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
});
