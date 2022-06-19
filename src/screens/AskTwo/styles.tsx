import {Platform, StyleSheet, Dimensions} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const windowWidth = Dimensions.get('window').width;

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
    bottom: adjust(70),
    left: adjust(35),
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
  inputWrapperStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    backgroundColor: BASE_COLORS.brightGrayColor,
    color: BASE_COLORS.blackColor,
  },
  inputIconStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.inputStyle,
    color: BASE_COLORS.blackColor,
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.steelBlueColor,
  },
  iconContainer: {
    position: 'absolute',
    right: adjust(10),
    zIndex: 10,
    ...GlobalStyles.ph10,
    ...GlobalStyles.pv10,
  },
  icon: {
    width: adjust(25),
    height: adjust(25),
  },
  iconSubtract: {
    width: adjust(20),
    height: adjust(20),
  },
  btnAdd: {
    textAlign: 'right',
  },
  item: {
    width: windowWidth - 80,
  },
  borderBottom: {
    ...GlobalStyles.mh10,
    borderBottomColor: BASE_COLORS.steelBlueColor,
    borderBottomWidth: 1,
    flex: 1,
    width: '90%',
  },
  locationContainer: {
    backgroundColor: BASE_COLORS.brightGrayColor,
    paddingVertical: adjust(5),
    paddingHorizontal: adjust(5),
    borderBottomLeftRadius: adjust(10),
    borderBottomRightRadius: adjust(10),
    position: 'absolute',
    left: 0,
    right: 0,
    top: adjust(65),
    zIndex: 100,
  },
});
