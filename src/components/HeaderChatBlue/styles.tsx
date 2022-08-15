import {StyleSheet, Platform} from 'react-native';

import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? adjust(35) : 0,
    borderBottomLeftRadius: adjust(10),
    borderBottomRightRadius: adjust(10),
    flex: 0.3,
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
