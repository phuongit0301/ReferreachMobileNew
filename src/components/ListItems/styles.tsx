import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';

export default StyleSheet.create({
  listContainer: {
    ...GlobalStyles.pb150,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.gray90Color,
  },
});
