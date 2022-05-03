import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles, BASE_FONTS} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  tagContainer: {
    ...GlobalStyles.mb15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  titleStyle: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.gunmetalColor,
    textAlign: 'center',
    width: '100%',
  },
  tagSubTitle: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mv10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subTitleStyle: {
    ...GlobalStyles.ml10,
  },
  buttonContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.mt10,
    alignSelf: 'center',
    alignItems: 'center',
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
    borderWidth: 1,
    borderColor: BASE_COLORS.darkGrayColor,
  },
  buttonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.darkGrayColor,
  },
  cardItemContainer: {
    ...GlobalStyles.mt20,
    alignItems: 'flex-start',
    flex: 1,
  },
  cardSubTitleContainerStyle: {
    ...GlobalStyles.mt5,
  },
  cardTextRequiredStyle: {
    ...GlobalStyles.mt30,
    ...GlobalStyles.mr30,
    alignSelf: 'flex-end',
  },
  subTitleContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.mt30,
    alignItems: 'center',
  },
  subTitle: {
    ...GlobalStyles.ml10,
    color: BASE_COLORS.gunmetalColor,
  },
});
