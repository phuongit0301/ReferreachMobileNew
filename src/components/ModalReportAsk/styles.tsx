import {PixelRatio, StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  styleModal: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pt15,
    flex: PixelRatio.get() < 2 ? 1 : 0.5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  mainButtonContainer: {
    alignItems: 'center',
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    alignSelf: 'center',
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  textAreaStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mb5,
    borderColor: BASE_COLORS.blackColor,
    borderWidth: 1,
    color: BASE_COLORS.blackColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  labelStyle: {
    ...GlobalStyles.h3,
    ...GlobalStyles.mb10,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
  },
});
