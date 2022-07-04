import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  listContainer: {
    ...GlobalStyles.pb150,
  },
  tagStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.eerieBlackColor,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.eerieBlackColor,
  },
  avatar: {
    width: adjust(35),
    height: adjust(35),
    borderRadius: adjust(70),
  },
  borderContainer: {
    width: adjust(35),
  },
  border: {
    borderWidth: 0.5,
    borderColor: BASE_COLORS.darkGray,
    flex: 0.9,
  },
});
