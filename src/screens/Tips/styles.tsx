import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {headerByRatio, adjust} from '~Root/utils';

const ratio = headerByRatio();

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  bottom: {
    position: 'absolute',
    bottom: adjust(35),
    left: 15,
    right: 0,
  },
  highlight: {
    height: adjust(66),
    width: adjust(57),
    backgroundColor: BASE_COLORS.whiteColor,
    shadowColor: BASE_COLORS.whiteColor,
    shadowOffset: {
      width: 0,
      height: adjust(9),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(3),
    elevation: adjust(2),
    borderRadius: adjust(6),
    zIndex: 10,
  },
  iconYourAskHighlight: {
    width: adjust(57),
    height: adjust(57),
    marginRight: adjust(5),
  },
  iconAirFeedHighlight: {
    width: adjust(57),
    height: adjust(57),
    marginRight: adjust(5),
  },
  iconAskHighlight: {
    width: adjust(57),
    height: adjust(57),
  },
  iconContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(6),
    alignItems: 'center',
    width: Platform.OS === 'android' ? adjust(60) : adjust(54),
    height: adjust(54),
    justifyContent: 'center',
    marginRight: adjust(5),
    shadowColor: BASE_COLORS.whiteColor,
    shadowOffset: {
      width: 0,
      height: adjust(8),
    },
    shadowOpacity: adjust(0.5),
    shadowRadius: adjust(25),
    elevation: adjust(20),
  },
  arrowYourAskContainer: {
    position: 'absolute',
    bottom: adjust(60),
    left: adjust(20),
  },
  arrowAirFeedContainer: {
    position: 'absolute',
    bottom: adjust(60),
    left: adjust(95),
  },
  arrowAskContainer: {
    position: 'absolute',
    bottom: adjust(60),
    left: adjust(150),
  },
  arrowYourAsk: {
    width: adjust(38),
    height: adjust(92),
  },
  arrowAirFeed: {
    width: adjust(46),
    height: adjust(227),
  },
  arrowAsk: {
    width: adjust(114),
    height: adjust(348),
  },
  arrowBurgerMenu: {
    width: adjust(176),
    height: adjust(156),
  },
  arrowTrustNetwork: {
    width: adjust(115),
    height: adjust(230),
  },
  arrowChat: {
    width: adjust(35),
    height: adjust(110),
  },
  content: {
    color: BASE_COLORS.whiteColor,
    lineHeight: adjust(20),
  },
  blocks: {
    backgroundColor: 'rgba(28, 29, 30, 0.5);',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: adjust(10),
  },
  yourAskTipsContainer: {
    width: adjust(108),
  },
  airFeedTipsContainer: {
    width: adjust(166),
    marginLeft: adjust(-80),
  },
  askTipsContainer: {
    width: adjust(134),
    marginLeft: adjust(-10),
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    fontSize: BASE_STYLES.h5,
    color: BASE_COLORS.lightBlackColor,
  },
  btnTips: {
    backgroundColor: 'rgba(28, 29, 30, 0.8)',
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(8),
    position: 'absolute',
    top: adjust(10),
    right: adjust(20),
    zIndex: 10,
  },
  btnMoreTips: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(8),
    position: 'absolute',
    bottom: adjust(120),
    right: adjust(20),
    zIndex: 10,
  },
  textSmall: {
    fontSize: adjust(10),
  },
});
