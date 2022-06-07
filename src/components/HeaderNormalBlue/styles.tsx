import {StyleSheet} from 'react-native';

import {GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.pt40,
    ...GlobalStyles.pb15,
    borderBottomLeftRadius: adjust(6),
    borderBottomRightRadius: adjust(28),
  },
});
