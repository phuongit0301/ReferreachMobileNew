import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  inputContainer: {
    ...GlobalStyles.ph15,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderRadius: adjust(50),
    paddingVertical: 0,
    alignItems: 'center',
    height: adjust(30),
  },
  iconSearch: {
    width: adjust(18),
    height: adjust(18),
    opacity: 0.3,
  },
  input: {
    fontFamily: BASE_FONTS.notoSansRegular,
    lineHeight: adjust(17),
    color: BASE_COLORS.gunmetalColor,
    fontSize: adjust(13),
  },
  itemContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderTopWidth: 1,
    borderTopColor: BASE_COLORS.brightGrayColor,
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
    backgroundColor: BASE_COLORS.forestGreenColor,
  },
  buttonContainerStyle2: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    backgroundColor: BASE_COLORS.forestGreenColor,
  },
  buttonContainer2Style: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    backgroundColor: BASE_COLORS.whiteColor,
    borderWidth: 1,
    borderColor: BASE_COLORS.forestGreenColor,
  },
  buttonConfirmContainerStyle: {
    ...GlobalStyles.ph15,
    ...GlobalStyles.pv8,
    borderTopLeftRadius: adjust(32),
    borderTopRightRadius: adjust(32),
    borderBottomLeftRadius: adjust(32),
    borderBottomRightRadius: adjust(32),
    backgroundColor: BASE_COLORS.forestGreenColor,
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    width: adjust(50),
    height: adjust(50),
    borderRadius: adjust(100),
    overflow: 'hidden',
  },
  avatar: {
    width: adjust(50),
    height: adjust(50),
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
    width: adjust(24),
    height: adjust(24),
  },
  iconEditAskContainer: {
    width: adjust(24),
    height: adjust(24),
  },
  iconExtendDeadline: {
    width: adjust(17),
    height: adjust(17),
  },
  iconExtendDeadlineContainer: {
    width: adjust(24),
    height: adjust(24),
  },
  iconEndAskContainer: {
    width: adjust(24),
    height: adjust(24),
  },
  iconEndAsk: {
    width: adjust(18),
    height: adjust(18),
  },
  border: {
    borderWidth: 1,
    borderColor: BASE_COLORS.gainsboroColor,
    width: '100%',
  },
  text: {
    lineHeight: adjust(20),
  },
  iconEditBg: {
    backgroundColor: BASE_COLORS.brightGrayColor,
    borderRadius: adjust(50),
    height: adjust(30),
    width: adjust(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEditBgActive: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderRadius: adjust(50),
    height: adjust(30),
    width: adjust(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEdit: {
    width: adjust(13),
    height: adjust(12),
  },
  iconMessageContainer: {
    backgroundColor: BASE_COLORS.oxleyColor,
    borderRadius: adjust(50),
  },
  iconMessage: {
    width: adjust(18),
    height: adjust(18),
  },
  iconDelete: {
    width: adjust(26),
    height: adjust(25),
  },
  btnText: {
    backgroundColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(50),
  },
  btnContainer: {
    width: adjust(80),
    alignItems: 'flex-end',
  },
  nameContainer: {
    width: '42%',
  },
  textSmall: {
    fontSize: adjust(10),
  },
  btnBottom: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderRadius: adjust(12),
    position: 'absolute',
    bottom: adjust(30),
    right: adjust(30),
  },
  inputWrapperStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(20),
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  labelStyle: {
    ...GlobalStyles.labelStyle,
    color: BASE_COLORS.steelBlueColor,
  },
  inputStyle: {
    ...GlobalStyles.inputStyle,
    borderRadius: adjust(8),
    color: BASE_COLORS.blackColor,
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  inputErrorStyle: {
    borderColor: BASE_COLORS.persianRedColor,
  },
  h3BoldDefault: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
    fontSize: adjust(12),
  },
  h3BoldDefault2: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.forestGreenColor,
    fontSize: adjust(12),
  },
  styleModal: {
    paddingLeft: 0,
    paddingRight: 0,
    height: adjust(400),
    borderRadius: adjust(8),
  },
  styleModal2: {
    paddingLeft: 0,
    paddingRight: 0,
    height: adjust(200),
    borderRadius: adjust(8),
  },
  styleModal3: {
    paddingLeft: 0,
    paddingRight: 0,
    height: adjust(300),
    borderRadius: adjust(8),
  },
  styleModal4: {
    paddingLeft: 0,
    paddingRight: 0,
    height: adjust(500),
    borderRadius: adjust(8),
  },
  styleModalRemove: {
    height: adjust(250),
  },
  groupButton: {
    width: '80%',
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    fontSize: adjust(BASE_STYLES.p),
    lineHeight: adjust(18),
  },
  textBold: {
    fontFamily: BASE_FONTS.semiBold,
    fontSize: adjust(BASE_STYLES.p),
  },
  btnDone: {
    ...GlobalStyles.mt15,
    ...GlobalStyles.ph40,
    ...GlobalStyles.pv15,
    backgroundColor: BASE_COLORS.forestGreenColor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: adjust(100),
  },
  titleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: adjust(BASE_STYLES.h4),
    fontWeight: '600',
    color: BASE_COLORS.whiteColor,
  },
  blockArea: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(8),
  },
  blockArea1: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderTopLeftRadius: adjust(8),
    borderTopRightRadius: adjust(8),
  },
  buttonSignUpContainerStyle: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderColor: BASE_COLORS.oxleyColor,
    borderWidth: 1,
  },
  h3BoldSignUpDefault: {
    fontFamily: BASE_FONTS.notoSansExtraBold,
    fontWeight: '600',
    lineHeight: adjust(BASE_STYLES.h3),
    color: BASE_COLORS.oxleyColor,
    fontSize: adjust(14),
  },
  footerContainer: {
    height: adjust(5),
    backgroundColor: BASE_COLORS.whiteColor,
    borderBottomLeftRadius: adjust(8),
    borderBottomRightRadius: adjust(8),
    overflow: 'hidden',
  },
  iconClose: {
    width: adjust(14),
    height: adjust(14),
  },
  headerContainer: {
    borderBottomColor: BASE_COLORS.lavenderGrayColor,
    borderBottomWidth: 1,
    width: '100%',
  },
  headerContainer1: {
    borderBottomColor: BASE_COLORS.lavenderGrayColor,
    width: '100%',
  },
  iconQuestion: {
    width: adjust(20),
    height: adjust(20),
    opacity: 0.5,
  },
  highlight: {
    fontFamily: BASE_FONTS.regular,
    fontWeight: '500',
    fontSize: adjust(11),
    fontStyle: 'italic',
    color: BASE_COLORS.darkGray,
  },
  circle: {
    width: adjust(50),
    height: adjust(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(100),
  },
  circleActive: {
    width: adjust(50),
    height: adjust(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
    backgroundColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(100),
  },
  tagCount: {
    position: 'absolute',
    right: adjust(10),
    top: '30%',
  },
  qrCode: {
    width: adjust(230),
    height: adjust(230),
  },
  iconCopy: {
    width: adjust(18),
    height: adjust(18),
  },
  iconShare: {
    width: adjust(15),
    height: adjust(15),
  },
  textCenter: {
    textAlign: 'center',
  },
});
