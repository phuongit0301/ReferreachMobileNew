import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  listContainer: {
    ...GlobalStyles.p10,
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderRadius: adjust(10),
  },
  buttonContainerStyle: {
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.whiteColor,
    borderColor: BASE_COLORS.primary,
    borderWidth: 1,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(15),
    marginRight: adjust(8),
  },
  buttonContainerActiveStyle: {
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.primary,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(15),
    marginRight: adjust(8),
  },
  buttonTextStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: BASE_STYLES.h3,
    lineHeight: adjust(32),
    color: BASE_COLORS.primary,
  },
  buttonTextActiveStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: BASE_STYLES.h3,
    lineHeight: adjust(32),
    color: BASE_COLORS.whiteColor,
  },
  textRequiredStyle: {
    color: BASE_COLORS.indianRedColor,
  },
  subTitleContainer: {
    ...GlobalStyles.flexRow,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'left',
  },
  tooltipStyle: {
    height: '25%',
  },
  tooltipNetworkStyle: {
    height: '25%',
  },
  tooltipContentStyle: {
    ...GlobalStyles.p20,
    backgroundColor: BASE_COLORS.davysGreyColor,
    flex: 1,
    width: '95%',
  },
  tooltipTitleColor: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: BASE_STYLES.h5,
    color: BASE_COLORS.antiFlashWhiteColor,
  },
  tooltipTextColor: {
    color: BASE_COLORS.antiFlashWhiteColor,
  },
  tooltipNetwork: {
    width: '90%',
  },
  tooltipCloseBtn: {
    flex: 1,
    alignItems: 'flex-end',
    width: adjust(15),
    height: adjust(15),
  },
  checkbox: {
    ...GlobalStyles.mt15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
