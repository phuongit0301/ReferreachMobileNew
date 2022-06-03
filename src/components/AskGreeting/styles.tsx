import {StyleSheet} from 'react-native';
import {BASE_COLORS} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  btnGreetings: {
    borderWidth: 1,
    borderColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(22),
  },
  btnGreetingsSelected: {
    borderWidth: 1,
    borderColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(22),
    backgroundColor: BASE_COLORS.greyColor,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: BASE_COLORS.darkGray,
  },
});
