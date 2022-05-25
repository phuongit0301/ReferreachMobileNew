import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(12),
  },
});
