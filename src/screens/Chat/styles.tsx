import {StyleSheet, Platform} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  searchContainer: {
    borderBottomColor: BASE_COLORS.eerieBlackColor,
    borderBottomWidth: 1,
  },
  iconSearch: {
    width: adjust(18),
    height: adjust(18),
  },
  input: {
    ...GlobalStyles.h5,
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
  },
});
