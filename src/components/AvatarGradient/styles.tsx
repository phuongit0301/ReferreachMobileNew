import {StyleSheet} from 'react-native';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  imageContainer: {
    borderRadius: adjust(160),
    width: adjust(80),
    height: adjust(80),
  },
  circleGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
});
