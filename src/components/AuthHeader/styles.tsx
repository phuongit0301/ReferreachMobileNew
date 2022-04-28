import {StyleSheet} from 'react-native';

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
    position: 'absolute',
    width: adjust(23),
    height: adjust(21),
    left: adjust(15),
    top: adjust(15),
    zIndex: 10,
  },
  logo: {
    width: adjust(138),
    height: adjust(18),
  },
});
