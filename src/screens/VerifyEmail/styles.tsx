import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import { adjust } from '../../utils';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: BASE_COLORS.tealBlueColor,
  },
  header: {
    zIndex: 20,
    top: Platform.OS === 'ios' ? 55 : 30,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  headerText: {
    color: BASE_COLORS.tealBlueColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: 12,
  },
  inputStyle: {
    ...GlobalStyles.h4,
    height: 44,
  },
  labelStyle: {
    ...GlobalStyles.h3,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  scrollViewContentContainer: {
    paddingBottom: 80,
  },
  buttonContainerStyle: {
    ...GlobalStyles.mb20,
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv10,
    borderTopLeftRadius: adjust(14),
    borderTopRightRadius: adjust(14),
    borderBottomLeftRadius: adjust(14),
    borderBottomRightRadius: adjust(14),
    backgroundColor: BASE_COLORS.whiteColor,
    borderWidth: 1,
    borderColor: BASE_COLORS.forestGreenColor,
  },
  h3Default: {
    ...GlobalStyles.h3,
    lineHeight: 32,
    color: BASE_COLORS.whiteColor,
  },
  txtButton: {
    fontFamily: BASE_FONTS.semiBold,
    color: BASE_COLORS.forestGreenColor,
  },
  content: {
    flex: 1,
  },
  description: {
    ...GlobalStyles.mb30,
    fontSize: adjust(10),
    flex: 0.3,
  },
  countDownContainer: {
    paddingHorizontal: adjust(20),
    paddingVertical: adjust(10),
    backgroundColor: BASE_COLORS.platinumColor,
    borderRadius: adjust(14),
  },
  bgBottom: {
    backgroundColor: 'rgba(188, 188, 188, 0.2)',
    borderRadius: adjust(14),
  },
});
