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
  titleWidth: {
    width: '82%',
    overflow: 'hidden',
  },
  iconPin: {
    width: adjust(16),
    height: adjust(16),
  },
  textHighlight: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: '700',
    fontSize: adjust(10),
    lineHeight: adjust(15),
    color: BASE_COLORS.steelBlue2Color,
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    fontWeight: '500',
    color: BASE_COLORS.darkGrayColor,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
});
