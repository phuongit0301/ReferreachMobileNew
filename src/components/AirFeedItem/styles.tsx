import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  itemContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(12),
  },
  avatarContainer: {
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(100),
    overflow: 'hidden',
  },
  avatar: {
    width: adjust(50),
    height: adjust(50),
  },
  textSmall: {
    fontSize: adjust(10),
  },
  groupBtn: {
    alignSelf: 'flex-end',
  },
  iconShareContainer: {
    backgroundColor: BASE_COLORS.platinum1Color,
    borderRadius: adjust(6),
    alignSelf: 'center',
  },
  iconShare: {
    width: adjust(14),
    height: adjust(15),
  },
  buttonContainerStyle: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv5,
    borderTopLeftRadius: adjust(6),
    borderTopRightRadius: adjust(6),
    borderBottomLeftRadius: adjust(6),
    borderBottomRightRadius: adjust(12),
    backgroundColor: BASE_COLORS.forestGreenColor,
  },
});
