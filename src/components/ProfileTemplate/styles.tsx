import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollViewWhite: {
    marginVertical: 0,
  },
  imageButton: {
    ...GlobalStyles.pv15,
  },
  profileGradient: {
    borderBottomRightRadius: adjust(65),
    minHeight: adjust(200),
  },
  iconEditContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: adjust(-20),
    marginBottom: adjust(15),
  },
  buttonUpdateContainerStyle: {
    ...GlobalStyles.mb20,
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    borderTopLeftRadius: adjust(24),
    borderTopRightRadius: adjust(24),
    borderBottomLeftRadius: adjust(24),
    borderBottomRightRadius: adjust(24),
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: BASE_COLORS.whiteColor,
  },
  txtButton: {
    fontFamily: BASE_FONTS.semiBold,
    color: BASE_COLORS.whiteColor,
  },
});
