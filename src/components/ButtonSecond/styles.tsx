import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BASE_COLORS.oxleyColor,
    borderRadius: 24,
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 15,
    paddingLeft: 15,
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    color: BASE_COLORS.oxleyColor,
  },
  icon: {
    width: adjust(22),
    height: adjust(22),
  },
});
