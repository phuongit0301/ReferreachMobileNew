import {StyleSheet, Dimensions} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.7;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

export default StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  iconBack: {
    width: adjust(14),
    height: adjust(14),
  },
  description: {
    lineHeight: adjust(18),
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(entryBorderRadius),
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: adjust(18),
    shadowColor: BASE_COLORS.blackColor,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    borderRadius: adjust(entryBorderRadius),
  },
  imageContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  image: {
    borderRadius: adjust(110),
    width: adjust(55),
    height: adjust(55),
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: BASE_COLORS.blackColor,
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: BASE_COLORS.blackColor,
  },
  title: {
    color: BASE_COLORS.blackColor,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    color: BASE_COLORS.grayColor,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputArea: {
    ...GlobalStyles.p,
    width: '100%',
    lineHeight: adjust(15),
    color: BASE_COLORS.gunmetalColor,
    height: 120,
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderRadius: adjust(10),
  },
  starRate: {
    width: adjust(29),
    height: adjust(27),
  },
  rateContainer: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderRadius: adjust(25),
  },
  border: {
    backgroundColor: BASE_COLORS.whiteColor,
    height: adjust(40),
    width: 1,
  },
  avatar: {
    borderRadius: adjust(84),
    width: adjust(42),
    height: adjust(42),
  },
  userListContainer: {
    flex: 0.35,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  btn: {
    width: viewportWidth - adjust(70),
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderRadius: adjust(10),
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(4),
    },
    shadowOpacity: adjust(0.15),
    shadowRadius: adjust(1),
    elevation: adjust(5),
  },
  styleTag: {
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
  },
  buttonContainer: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    alignSelf: 'center',
    alignItems: 'center',
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
    borderWidth: 1,
    borderColor: BASE_COLORS.darkGrayColor,
    flex: 0.5,
  },
  buttonTextStyle: {
    ...GlobalStyles.mr10,
    color: BASE_COLORS.darkGrayColor,
  },
  cardItemContainer: {
    ...GlobalStyles.mb10,
    alignItems: 'flex-start',
    flex: 0.5,
    minHeight: adjust(120),
  },
  cardSubTitleContainerStyle: {
    ...GlobalStyles.mt5,
  },
  cardTextRequiredStyle: {
    ...GlobalStyles.mt30,
    ...GlobalStyles.mr30,
    alignSelf: 'flex-end',
  },
  subTitleStyle: {
    ...GlobalStyles.ml10,
  },
  titleStyle: {
    fontSize: BASE_STYLES.p,
    fontFamily: BASE_FONTS.notoSansBold,
    fontWeight: '700',
  },
  tagText: {
    fontSize: BASE_STYLES.p,
    fontFamily: BASE_FONTS.regular,
    fontWeight: '500',
  },
  name: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: '700',
  },
  position: {
    fontFamily: BASE_FONTS.notoSansRegular,
    fontWeight: '400',
  },
  text: {
    fontFamily: BASE_FONTS.notoSansRegular,
    fontWeight: '400',
  },
  text1: {
    fontSize: adjust(10),
    fontFamily: BASE_FONTS.notoSansRegular,
    fontWeight: '400',
  },
  text3: {
    fontFamily: BASE_FONTS.notoSansRegular,
    fontWeight: '400',
    fontSize: adjust(9),
  },
  iconProtect: {
    width: adjust(17),
    height: adjust(20),
    top: adjust(5),
    left: adjust(-20),
  },
});
