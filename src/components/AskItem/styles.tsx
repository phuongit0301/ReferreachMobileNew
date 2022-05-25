import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  styleTag: {
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
    backgroundColor: BASE_COLORS.darkGray,
    borderWidth: 0,
  },
  styleTagPurple: {
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
    backgroundColor: BASE_COLORS.begoniaColor,
    borderWidth: 0,
  },
  tagContainer: {
    flexWrap: 'wrap',
  },
  iconThreeDot: {
    width: adjust(16),
    height: adjust(4),
  },
  iconCalendar: {
    width: adjust(16),
    height: adjust(16),
  },
  iconGlobe: {
    width: adjust(16),
    height: adjust(16),
  },
  iconVerify: {
    width: adjust(17),
    height: adjust(17),
  },
  icon35x35: {
    width: adjust(35),
    height: adjust(35),
  },
  cardContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(12),
  },
  tagText: {
    color: BASE_COLORS.whiteColor,
  },
});
