import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  listContainer: {
    ...GlobalStyles.pt10,
    ...GlobalStyles.pb150,
  },
  iconContainer: {
    ...GlobalStyles.pv15,
    ...GlobalStyles.ph20,
    ...GlobalStyles.mr10,
    borderRadius: 100,
    backgroundColor: BASE_COLORS.davysGreyColor,
  },
  textStyle: {
    textAlign: 'center',
  },
  description: {
    lineHeight: adjust(15),
  },
  paginationContainer: {
    alignItems: 'center',
  },
  textSkip: {
    justifyContent: 'flex-start',
    width: '10%',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E6E6E6',
    marginHorizontal: 8,
  },
  buttonContainerStyle: {
    ...GlobalStyles.pv9,
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
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
  textPrimary: {
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
  button: {
    borderRadius: adjust(24),
  },
  dotContainer: {
    width: '50%',
  },
  hide: {
    width: '10%',
  },
});
