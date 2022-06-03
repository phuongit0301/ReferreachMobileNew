import {StyleSheet} from 'react-native';
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
    right: adjust(15),
  },
  iconContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(6),
    alignItems: 'center',
    width: adjust(54),
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
  burgerMenuContainer: {
    position: 'absolute',
    top: adjust(30),
    right: adjust(30),
  },
  burgerMenuArea: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(6),
    width: adjust(40),
    height: adjust(40),
    shadowColor: BASE_COLORS.whiteColor,
    shadowOffset: {
      width: 0,
      height: adjust(8),
    },
    shadowOpacity: adjust(0.5),
    shadowRadius: adjust(25),
    elevation: adjust(20),
  },
  arrowTrustNetworkContainer: {
    position: 'absolute',
    bottom: adjust(60),
    right: adjust(95),
  },
  arrowAskContainer: {
    position: 'absolute',
    bottom: adjust(60),
    right: 0,
  },
  arrowBurgerContainer: {
    position: 'absolute',
    top: adjust(10),
    right: adjust(40),
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
    width: adjust(100),
    height: adjust(80),
  },
  arrowTrustNetwork: {
    width: adjust(115),
    height: adjust(230),
    marginLeft: adjust(50),
  },
  arrowChat: {
    width: adjust(32),
    height: adjust(99),
    marginLeft: adjust(80),
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
  trustNetworkTipsContainer: {
    width: adjust(166),
  },
  askTipsContainer: {
    width: adjust(134),
    marginRight: adjust(10),
  },
  burgerTipsContainer: {
    width: adjust(134),
    marginLeft: adjust(-40),
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
    top: adjust(80),
    right: adjust(20),
    zIndex: 10,
  },
  burgerMenu: {
    width: adjust(35),
    height: adjust(30),
  },
});
