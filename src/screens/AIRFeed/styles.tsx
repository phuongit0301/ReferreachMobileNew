import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  contentContainer: {
    paddingBottom: adjust(350),
    flexGrow: 1,
  },
  inputContainer: {
    ...GlobalStyles.mt15,
    ...GlobalStyles.ph15,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(50),
    paddingVertical: Platform.OS === 'ios' ? adjust(8) : 0,
    alignItems: 'center',
  },
  iconSearch: {
    width: adjust(18),
    height: adjust(18),
  },
  input: {
    ...GlobalStyles.h5,
    flex: 1,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
    fontSize: adjust(13),
  },
  cardContainer: {
    backgroundColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(12),
  },
  cardImage: {
    width: adjust(120),
    height: adjust(161),
  },
  buttonContainerStyle: {
    ...GlobalStyles.mb20,
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    borderBottomRightRadius: adjust(24),
    borderWidth: 1,
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderColor: BASE_COLORS.whiteColor,
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(3),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(3),
    elevation: adjust(2),
  },
  menu: {
    position: 'absolute',
    backgroundColor: BASE_COLORS.whiteColor,
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(4),
    },
    shadowOpacity: adjust(0.1),
    shadowRadius: adjust(4),
    elevation: adjust(4),
    top: 0,
    right: 0,
    width: '55%',
  },
  iconEditAsk: {
    width: adjust(23),
    height: adjust(16),
  },
  iconEditAskContainer: {
    width: adjust(24),
    height: adjust(24),
  },
  iconExtendDeadline: {
    width: adjust(17),
    height: adjust(17),
  },
  iconStartChatContainer: {
    width: adjust(24),
    height: adjust(24),
  },
  iconEndAsk: {
    width: adjust(15),
    height: adjust(16),
  },
  border: {
    borderWidth: 1,
    borderColor: BASE_COLORS.gainsboroColor,
    width: '100%',
  },
  bgBlur: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  text: {
    lineHeight: adjust(20),
  },
  profileGradient: {
    borderBottomRightRadius: adjust(65),
  },
  iconThreeDotContainer: {
    width: adjust(32),
    height: adjust(8),
  },
  iconThreeDot: {
    width: adjust(16),
    height: adjust(4),
    tintColor: BASE_COLORS.whiteColor,
  },
  contentNormal: {
    color: BASE_COLORS.whiteColor,
    fontSize: adjust(12),
  },
  contentBold: {
    color: BASE_COLORS.whiteColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: adjust(12),
  },
  globeContainer: {
    width: '55%',
  },
  iconCalendar: {
    width: adjust(16),
    height: adjust(16),
  },
  iconGlobe: {
    width: adjust(16),
    height: adjust(16),
  },
  iconCircle: {
    width: adjust(17),
    height: adjust(17),
  },
  icon: {
    width: adjust(35),
    height: adjust(35),
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  btnGroup: {
    flex: 1,
    position: 'absolute',
    bottom: adjust(-30),
    left: 0,
    right: 0,
    zIndex: 100,
  },
  btnCircle: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(100),
    width: adjust(75),
    height: adjust(75),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(3),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(3),
    elevation: adjust(2),
  },
  btnText: {
    fontSize: adjust(9),
    lineHeight: adjust(15),
    width: Platform.OS === 'android' ? '80%' : '70%',
  },
  btnText2: {
    fontSize: adjust(9),
    lineHeight: adjust(15),
    width: '60%',
  },
});
