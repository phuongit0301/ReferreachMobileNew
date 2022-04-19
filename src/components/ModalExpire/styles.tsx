import {PixelRatio, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  modalHeader: {
    width: '60%',
  },
  title: {
    ...GlobalStyles.textUppercase,
  },
  styleModal: {
    ...GlobalStyles.pt15,
    flex: PixelRatio.get() < 2 ? 1 : 0.4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  styleModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
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
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  mainButtonContainer: {
    alignItems: 'center',
    flex: 1,
  },
  mainButtonTextStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
    alignSelf: 'center',
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  buttonContainerStyle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mb15,
    ...GlobalStyles.pv15,
    borderWidth: 1,
    borderColor: BASE_COLORS.blackColor,
    borderRadius: adjust(24),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  h5BoldDefault: {
    ...GlobalStyles.h5,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
});
