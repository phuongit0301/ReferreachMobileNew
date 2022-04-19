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
    ...GlobalStyles.mt30,
    ...GlobalStyles.ph20,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: adjust(20),
  },
  buttonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.blackColor,
  },
  cardItemContainer: {
    ...GlobalStyles.mt20,
    alignItems: 'center',
    flex: 1,
  },
  cardSubTitleContainerStyle: {
    ...GlobalStyles.mt15,
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
