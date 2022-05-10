import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';
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
  areaViewContainer: {
    marginTop: ratio?.marginTop,
    flex: 1,
  },
  btnSecond: {
    borderColor: BASE_COLORS.whiteColor,
  },
  titleStyle: {
    color: BASE_COLORS.whiteColor,
  },
  headerContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    marginTop: ratio?.marginTop,
  },
  title: {
    textTransform: 'uppercase',
  },
  titleNetwork: {
    textTransform: 'capitalize',
  },
  highlightTitle: {
    ...GlobalStyles.mt5,
  },
  titleBlue: {
    ...GlobalStyles.mr5,
    color: BASE_COLORS.primary,
  },
  header: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: BASE_COLORS.primary,
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    fontSize: 12,
  },
  limitWidth: {
    width: '60%',
  },
  userInfoArea: {
    alignItems: 'flex-start',
  },
  tabView: {
    ...GlobalStyles.p10,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    ...GlobalStyles.m5,
    ...GlobalStyles.p15,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    height: adjust(150),
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  tab: {
    ...GlobalStyles.pb10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  tabActive: {
    borderBottomColor: BASE_COLORS.primary,
    borderBottomWidth: 2,
  },
  tabIcon: {
    width: adjust(20),
    height: adjust(20),
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabScrollContainer: {
    flex: 1,
  },
  tabs: {
    ...GlobalStyles.pt5,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: BASE_COLORS.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  askContainer: {
    marginTop: 12,
    flex: 1,
  },
  askHeader: {
    ...GlobalStyles.flexRow,
    ...GlobalStyles.ph10,
    ...GlobalStyles.pb5,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.primary,
    alignItems: 'center',
  },
  mainButtonContainer: {
    ...GlobalStyles.mainButtonContainer,
  },
  textStyle: {
    ...GlobalStyles.h5,
    ...GlobalStyles.mainButtonTextStyle,
  },
  mainButtonArea: {
    ...GlobalStyles.mainButtonArea,
  },
  cancelButtonArea: {
    ...GlobalStyles.mainButtonArea,
    ...GlobalStyles.mr10,
    backgroundColor: BASE_COLORS.indianRedColor,
  },
  networkContainer: {
    ...GlobalStyles.mt10,
    flex: 1,
  },
  editButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconContainer: {
    ...GlobalStyles.mr5,
  },
  tooltipStyle: {
    height: '38%',
  },
  tooltipNetworkStyle: {
    height: '34%',
  },
  tooltipContentStyle: {
    ...GlobalStyles.p20,
    backgroundColor: BASE_COLORS.davysGreyColor,
    flex: 1,
    width: '85%',
  },
  tooltipTextColor: {
    color: BASE_COLORS.antiFlashWhiteColor,
  },
  tooltipNetwork: {
    width: '80%',
  },
  tooltipCloseBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  inviteLeftArea: {
    ...GlobalStyles.pv5,
    ...GlobalStyles.ph10,
    ...GlobalStyles.textUppercase,
    fontSize: adjust(8),
    borderRadius: adjust(24),
    backgroundColor: BASE_COLORS.forestGreenColor,
  },
  buttonGroup: {
    ...GlobalStyles.flexRow,
    justifyContent: 'center',
  },
});
