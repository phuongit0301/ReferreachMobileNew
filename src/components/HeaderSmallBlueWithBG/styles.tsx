import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  iconBack: {
    width: adjust(14),
    height: adjust(14),
  },
  iconRight: {
    width: adjust(35),
    height: adjust(30),
  },
  center: {
    width: '70%',
  },
  left: {
    height: adjust(14),
    width: '15%',
  },
  right: {
    width: '15%',
    height: adjust(23),
  },
  logoSmall: {
    width: adjust(30),
    height: adjust(22),
  },
  groupHeader: {
    marginBottom: adjust(-10),
  },
});
