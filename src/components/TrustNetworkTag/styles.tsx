import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from '~Root/config';

export default StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  text: {
    fontFamily: BASE_FONTS.notoSansRegular,
    fontWeight: '500',
    fontSize: BASE_STYLES.h6,
    color: BASE_COLORS.arsenicColor,
  },
});
