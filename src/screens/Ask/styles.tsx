import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {headerByRatio, adjust} from '~Root/utils';

const ratio = headerByRatio();

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.whiteColor,
  },
  scrollView: {
    backgroundColor: BASE_COLORS.whiteColor,
    marginTop: 0,
    zIndex: -1,
    paddingTop: 0,
    flex: 1,
  },
  scrollViewContentContainer: {
    ...GlobalStyles.pb80,
  },
  contentContainer: {
    borderTopLeftRadius: adjust(22),
    marginTop: adjust(-20),
  },
  btn: {
    width: adjust(20),
    height: adjust(20),
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: adjust(5),
  },
  btnActive: {
    width: adjust(20),
    height: adjust(20),
    borderRadius: adjust(5),
  },
  dotPagination: {
    height: adjust(4),
    width: adjust(36),
  },
  styleTag: {
    borderTopLeftRadius: adjust(22),
    borderTopRightRadius: adjust(22),
    borderBottomLeftRadius: adjust(22),
    borderBottomRightRadius: adjust(22),
    backgroundColor: BASE_COLORS.steelBlue2Color,
    borderWidth: 0,
  },
  styleDropDown: {
    borderTopLeftRadius: adjust(22),
    borderTopRightRadius: adjust(22),
    borderBottomLeftRadius: adjust(22),
    borderBottomRightRadius: adjust(22),
    backgroundColor: BASE_COLORS.whiteColor,
  },
  styleButton: {
    borderTopLeftRadius: adjust(22),
    borderTopRightRadius: adjust(22),
    borderBottomLeftRadius: adjust(22),
    borderBottomRightRadius: adjust(22),
    backgroundColor: BASE_COLORS.steelBlue2Color,
    height: 'auto',
  },
  tagContainer: {
    flexWrap: 'wrap',
  },
  tagText: {
    color: BASE_COLORS.whiteColor,
  },
  iconDropDown: {
    width: adjust(22),
    height: adjust(22),
  },
  buttonTextStyle: {
    ...GlobalStyles.p,
    color: BASE_COLORS.whiteColor,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    textAlign: 'left',
  },
  iconCatContainer: {
    position: 'absolute',
    bottom: adjust(25),
    right: adjust(25),
  },
  iconCat: {
    width: adjust(80),
    height: adjust(66),
  },
  iconCatNext: {
    width: adjust(107),
    height: adjust(51),
  },
  tooltipStyle: {
    height: Platform.OS === 'ios' ? '25%' : '32%',
  },
  tooltipNetworkStyle: {
    height: '25%',
  },
  tooltipContentStyle: {
    ...GlobalStyles.p20,
    position: 'absolute',
    bottom: adjust(85),
    left: adjust(30),
    borderRadius: adjust(10),
    backgroundColor: BASE_COLORS.whiteColor,
    width: '60%',
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(5),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(5),
    elevation: adjust(2),
    zIndex: 1,
  },
  tooltipTitleColor: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: BASE_STYLES.h5,
    color: BASE_COLORS.antiFlashWhiteColor,
  },
  tooltipTextColor: {
    color: BASE_COLORS.antiFlashWhiteColor,
  },
  tooltipNetwork: {
    width: '90%',
  },
  tooltipCloseBtnContainer: {
    position: 'absolute',
    right: adjust(-48),
    top: adjust(-25),
  },
  textSmall: {
    fontSize: adjust(11),
  },
  iconCloseCircleWhite: {
    width: adjust(26),
    height: adjust(26),
  },
  inputContainer: {
    ...GlobalStyles.mt5,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderRadius: adjust(22),
    width: '70%',
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'center',
  },
  inputAreaContainer: {
    ...GlobalStyles.mt5,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderRadius: adjust(22),
    width: '100%',
    height: adjust(150),
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'flex-start',
    borderColor: BASE_COLORS.steelBlue2Color,
    borderWidth: 1,
  },
  input: {
    ...GlobalStyles.p,
    flex: 1,
    lineHeight: adjust(15),
    color: BASE_COLORS.gunmetalColor,
  },
  inputArea: {
    ...GlobalStyles.p,
    flex: 1,
    width: '100%',
    lineHeight: adjust(15),
    color: BASE_COLORS.gunmetalColor,
    height: '100%',
  },
  inputDynamicContainer: {
    ...GlobalStyles.mb5,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(22),
    width: '70%',
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: BASE_COLORS.darkGray,
  },
  btnGreetings: {
    borderWidth: 1,
    borderColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(22),
  },
  iconTriangle: {
    position: 'absolute',
    bottom: adjust(-10),
    right: adjust(-28),
    shadowColor: BASE_COLORS.whiteColor,
    shadowOffset: {
      width: 0,
      height: adjust(5),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(5),
    elevation: adjust(2),
  },
});
