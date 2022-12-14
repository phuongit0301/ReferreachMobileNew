import {StyleSheet, Dimensions, Platform} from 'react-native';

import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  contain: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(10),
    width: '100%',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexWrap: 'wrap',
    width: width - adjust(80),
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
  circle: {
    width: adjust(10),
    height: adjust(10),
    backgroundColor: BASE_COLORS.darkGrayColor,
    borderRadius: adjust(20),
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
    fontFamily: BASE_FONTS.regular,
    fontWeight: '400',
    fontSize: adjust(10),
    width: '80%',
    lineHeight: adjust(15),
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
    left: adjust(0),
    marginTop: adjust(-15),
  },
  iconProtect1: {
    width: adjust(11),
    height: adjust(13),
    position: 'absolute',
    right: Platform.OS === 'ios' ? 0 : adjust(5),
    bottom: adjust(5),
  },
  iconProtect2: {
    width: adjust(11),
    height: adjust(13),
    position: 'absolute',
    right: adjust(5),
    bottom: adjust(5),
  },
  iconProtect3: {
    width: adjust(11),
    height: adjust(13),
    left: adjust(-5),
    marginTop: adjust(-15),
  },
  borderCurve: {
    height: adjust(25),
    width: adjust(5),
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: adjust(3),
  },
  itemWidth: {
    width: width - adjust(35),
  },
  textBold: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: '700',
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  bgKudos: {
    borderBottomLeftRadius: adjust(8),
    backgroundColor: BASE_COLORS.steelBlue2Color,
  },
  iconHand: {
    width: adjust(25),
    height: adjust(18),
  },
  kudosTextBold: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: '700',
    color: BASE_COLORS.whiteColor,
    fontSize: adjust(11),
    lineHeight: adjust(15),
  },
  kudosTextNormal: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
    fontSize: adjust(11),
    lineHeight: adjust(15),
  },
  kudosMessageContainer: {
    flex: 0.9,
  },
});
