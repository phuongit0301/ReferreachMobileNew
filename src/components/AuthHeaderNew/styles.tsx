import {StyleSheet} from 'react-native';
import {BASE_FONTS, BASE_COLORS} from '~Root/config';

import {adjust} from '~Root/utils';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
  },
  widthFull: {
    width: '100%',
  },
  logoContainer: {
    width: adjust(134),
    height: adjust(97),
  },
  iconBackContainer: {
    left: adjust(15),
    position: 'absolute',
    zIndex: 10,
  },
  logo: {
    width: adjust(138),
    height: adjust(18),
  },
  title: {
    fontFamily: BASE_FONTS.regular,
    fontWeight: '500',
    fontSize: adjust(14),
    color: BASE_COLORS.steelBlue2Color,
  },
});
