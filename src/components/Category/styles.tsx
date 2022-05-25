import {StyleSheet} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  tag: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mb5,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(10),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  tagText: {
    ...GlobalStyles.mr5,
    color: BASE_COLORS.oxleyColor,
    fontWeight: '600',
  },
  mr10: {
    ...GlobalStyles.mr10,
  },
  iconClose: {
    ...GlobalStyles.ml5,
    width: adjust(8),
    height: adjust(8),
  },
  iconCloseBlue: {
    width: adjust(22),
    height: adjust(22),
  },
});
