import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.brightGrayColor,
  },
  inputContainer: {
    ...GlobalStyles.mt15,
    ...GlobalStyles.ph15,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(50),
    paddingVertical: Platform.OS === 'ios' ? adjust(5) : 0,
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
  itemContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(12),
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
    backgroundColor: BASE_COLORS.gray2Color,
    borderRadius: adjust(50),
    padding: adjust(5),
  },
  iconEditBgActive: {
    backgroundColor: BASE_COLORS.forestGreenColor,
    borderRadius: adjust(50),
    padding: adjust(5),
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
    width: '45%',
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
});
