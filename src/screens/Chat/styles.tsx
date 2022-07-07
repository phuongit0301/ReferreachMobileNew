import {StyleSheet, Platform} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  itemContainer: {
    maxWidth: adjust(80),
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(18),
    padding: adjust(2),
    alignSelf: 'flex-start',
  },
  searchContainer: {
    borderBottomColor: BASE_COLORS.eerieBlackColor,
    borderBottomWidth: 1,
  },
  iconSearchContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(20),
  },
  iconSearch: {
    width: adjust(15),
    height: adjust(15),
  },
  input: {
    ...GlobalStyles.h5,
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
  },
  avatar: {
    borderRadius: adjust(56),
    width: adjust(28),
    height: adjust(28),
  },
  name: {
    fontSize: adjust(9),
    width: '50%',
    flexWrap: 'wrap',
  },
});
