import {StyleSheet, Dimensions} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  contain: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderTopLeftRadius: adjust(10),
    borderBottomLeftRadius: adjust(10),
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
    borderColor: BASE_COLORS.darkGrayColor,
    flex: 1,
  },
  avatar: {
    width: adjust(35),
    height: adjust(35),
    borderRadius: adjust(70),
  },
  avatarGroup: {
    marginBottom: adjust(-10),
  },
  avatarSmall: {
    width: adjust(21),
    height: adjust(21),
    borderRadius: adjust(42),
  },
  avatarCount: {
    width: adjust(21),
    height: adjust(21),
    borderRadius: adjust(42),
    backgroundColor: BASE_COLORS.darkGrayColor,
    marginLeft: adjust(-5),
  },
  introduction: {
    fontSize: adjust(10),
    width: '80%',
  },
  redCircle: {
    width: adjust(10),
    height: adjust(10),
    backgroundColor: BASE_COLORS.desireColor,
    borderRadius: adjust(20),
  },
  iconProtect: {
    width: adjust(11),
    height: adjust(13),
    marginRight: adjust(5),
    marginTop: adjust(-15),
  },
  borderCurve: {
    height: adjust(25),
    width: adjust(5),
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: adjust(3),
  },
  iconPin: {
    width: adjust(16),
    height: adjust(16),
  },
  itemWidth: {
    width: width,
  },
});
