import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.brightGrayColor,
  },
  dot: {
    width: adjust(5),
    height: adjust(5),
  },
  buttonContainerStyle: {
    backgroundColor: 'transparent',
    borderColor: BASE_COLORS.forestGreenColor,
    borderWidth: 1,
  },
  buttonMainContainerStyle: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderColor: BASE_COLORS.forestGreenColor,
    borderWidth: 1,
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.notoSansExtraBold,
    fontWeight: '600',
    color: BASE_COLORS.forestGreenColor,
    fontSize: adjust(14),
  },
  h3BoldMainDefault: {
    fontFamily: BASE_FONTS.notoSansExtraBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
    fontSize: adjust(14),
  },
  groupButton: {
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
});
