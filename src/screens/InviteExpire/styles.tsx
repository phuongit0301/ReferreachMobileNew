import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  buttonContainerStyle: {
    backgroundColor: BASE_COLORS.oxleyColor,
    alignSelf: 'center',
    borderTopLeftRadius: adjust(100),
    borderTopRightRadius: adjust(100),
    borderBottomLeftRadius: adjust(100),
    borderBottomRightRadius: adjust(100),
  },
  textPrimary: {
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
  textSecondary: {
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.oxleyColor,
  },
});
