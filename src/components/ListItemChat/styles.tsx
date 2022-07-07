import {StyleSheet} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  contain: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(10),
    width: '100%',
  },
  contentContainer: {
    flex: 1,
  },
  contentArea: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '82%',
    padding: 10,
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: BASE_COLORS.whiteColor,
    marginTop: adjust(-20),
  },
  rightContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.oxleyColor,
    borderBottomLeftRadius: adjust(10),
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    zIndex: 10,
    marginTop: adjust(-20),
  },
  itemContainer: {
    flex: 1,
    borderLeftColor: BASE_COLORS.tealBlueColor,
    borderLeftWidth: adjust(13),
  },
  imageContainer: {
    justifyContent: 'center',
  },
  textRight: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(10),
  },
  title: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(10),
  },
  countContainer: {
    ...GlobalStyles.ph6,
    ...GlobalStyles.pv2,
    borderRadius: adjust(10),
    backgroundColor: BASE_COLORS.oxleyColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  borderContainer: {
    width: adjust(35),
  },
  border: {
    borderWidth: 0.5,
    borderColor: BASE_COLORS.darkGray,
    flex: 1,
  },
  avatar: {
    width: adjust(35),
    height: adjust(35),
    borderRadius: adjust(70),
  },
  introduction: {
    fontSize: adjust(10),
    width: '80%',
  },
});
