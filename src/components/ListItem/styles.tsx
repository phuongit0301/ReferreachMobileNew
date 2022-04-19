import {StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  contain: {
    ...GlobalStyles.mb15,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  contentContainer: {
    ...GlobalStyles.mh10,
    ...GlobalStyles.p10,
    ...GlobalStyles.mb15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
  },
  rightContainer: {
    alignSelf: 'flex-end',
    backgroundColor: BASE_COLORS.antiFlashWhiteColor,
    borderBottomLeftRadius: adjust(10),
    paddingHorizontal: adjust(15),
    paddingVertical: adjust(10),
  },
  itemContainer: {
    ...GlobalStyles.mb10,
    flex: 1,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
  locationText: {
    flex: 0.9,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.9,
  },
});
