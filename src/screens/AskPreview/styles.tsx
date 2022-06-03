import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {headerByRatio, adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  userProfile: {
    width: '75%',
  },
  styleAvatar: {
    width: adjust(55),
    height: adjust(55),
  },
  icon: {
    width: adjust(25),
    height: adjust(25),
  },
  iconCircle: {
    width: adjust(21),
    height: adjust(22),
  },
  iconPublish: {
    width: adjust(166),
    height: adjust(44),
  },
  btnContainer: {
    alignItems: 'center',
  },
  width: {
    width: '60%',
  },
});
