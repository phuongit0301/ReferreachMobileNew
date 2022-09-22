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
    left: adjust(15),
    position: 'absolute',
    zIndex: 10,
  },
  logo: {
    width: adjust(138),
    height: adjust(18),
  },
  iconUserPlus34x33: {
    width: adjust(34),
    height: adjust(33),
  },
  iconUsers39x35: {
    width: adjust(39),
    height: adjust(35),
  },
  iconPlus40x40: {
    width: adjust(40),
    height: adjust(40),
  },
  iconPlus: {
    width: adjust(16),
    height: adjust(15),
  },
  block: {
    borderRadius: adjust(8),
  },
  block2: {
    borderRadius: adjust(20),
    height: adjust(32),
  },
  text: {
    fontSize: adjust(10),
  },
});
