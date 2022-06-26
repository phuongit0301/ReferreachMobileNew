import {StyleSheet} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    ...GlobalStyles.mb15,
  },
  textInputWrapper: {
    borderColor: BASE_COLORS.whiteColor,
    borderWidth: 1,
    borderRadius: adjust(16),
    paddingVertical: adjust(12),
    paddingHorizontal: adjust(12),
    color: BASE_COLORS.whiteColor,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  labelStyle: {
    color: BASE_COLORS.whiteColor,
  },
  inputStyle: {
    width: '100%',
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.redColor,
  },
  textError: {
    color: BASE_COLORS.redColor,
    marginTop: adjust(10),
  },
});
