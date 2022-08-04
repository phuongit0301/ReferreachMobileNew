import {StyleSheet, Dimensions} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.52;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

export default StyleSheet.create({
  iconHand: {
    width: adjust(297),
    height: adjust(310),
  },
  description: {
    lineHeight: adjust(22),
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
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
  handRate: {
    width: adjust(31),
    height: adjust(25),
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
    maxWidth: viewportWidth - adjust(90),
    borderRadius: adjust(31),
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
  },
  btn: {
    width: viewportWidth - adjust(30),
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderRadius: adjust(10),
  },
});
