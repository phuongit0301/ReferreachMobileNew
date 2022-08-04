import {StyleSheet} from 'react-native';

import {GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.pt35,
    height: adjust(100),
  },
  left: {
    height: adjust(14),
    width: '15%',
  },
  center: {
    width: '70%',
  },
  right: {
    width: '15%',
    height: adjust(23),
  },
  iconRight: {
    width: adjust(35),
    height: adjust(30),
  },
  iconBack: {
    width: adjust(14),
    height: adjust(14),
  },
});
