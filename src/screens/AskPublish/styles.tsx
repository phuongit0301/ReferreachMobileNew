import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {headerByRatio, adjust} from '~Root/utils';

const ratio = headerByRatio();

export default StyleSheet.create({
  iconCatPublish: {
    width: adjust(215),
    height: adjust(246),
  },
  btnDone: {
    ...GlobalStyles.mt15,
    ...GlobalStyles.ph40,
    ...GlobalStyles.ph20,
    backgroundColor: BASE_COLORS.forestGreenColor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: adjust(100),
  },
  titleStyle: {
    fontSize: adjust(14),
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
});
