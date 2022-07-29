import {Platform, StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, GlobalStyles} from '~Root/config';

import {adjust} from '~Root/utils';

export default StyleSheet.create({
  headerContainer: {
    flex: 0.15,
  },
  wrapper: {
    zIndex: 100,
  },
  userInfoContainer: {
    backgroundColor: BASE_COLORS.lighGray1,
    borderRadius: adjust(5),
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(4),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(4),
    elevation: adjust(2),
    position: 'absolute',
    top: adjust(-80),
    zIndex: 1000,
    width: '100%',
  },
  headerIntroduced: {
    marginTop: adjust(-8),
  },
  iconProtect: {
    width: adjust(11),
    height: adjust(13),
    marginLeft: adjust(-8),
    left: adjust(-5),
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    color: BASE_COLORS.darkGrayColor,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  textBlue: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.steelBlue2Color,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  textGreen: {
    fontFamily: BASE_FONTS.semiBold,
    fontWeight: '600',
    color: BASE_COLORS.forestGreenColor,
    fontSize: adjust(10),
    lineHeight: adjust(15),
  },
  contentContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(5),
  },
  bgBlur: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 105,
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
    width: '60%',
    zIndex: 208,
  },
  border: {
    borderWidth: 0.3,
    borderColor: BASE_COLORS.gainsboroColor,
    width: '100%',
  },
  iconChatWithContainer: {
    width: adjust(20),
    height: adjust(19),
  },
  iconChatWith: {
    width: adjust(20),
    height: adjust(19),
  },
  iconExtendDeadlineContainer: {
    width: adjust(20),
  },
  iconExtendDeadline: {
    width: adjust(17),
    height: adjust(17),
  },
  iconStartChatContainer: {
    width: adjust(24),
    height: adjust(24),
  },
  iconArchiveContainer: {
    width: adjust(20),
  },
  iconArchive: {
    width: adjust(15),
    height: adjust(19),
  },
  iconEndAskContainer: {
    width: adjust(20),
  },
  iconEndAsk: {
    width: adjust(18),
    height: adjust(18),
  },
  iconPlusContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(50),
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(4),
    },
    shadowOpacity: adjust(0.1),
    shadowRadius: adjust(4),
    elevation: adjust(4),
    width: adjust(30),
    height: adjust(30),
  },
  iconPlus: {
    width: adjust(14),
    height: adjust(15),
  },
  input: {
    borderRadius: adjust(20),
    backgroundColor: BASE_COLORS.whiteColor,
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(4),
    },
    shadowOpacity: adjust(0.1),
    shadowRadius: adjust(4),
    elevation: adjust(4),
  },
  chatBg: {
    width: '70%',
    backgroundColor: BASE_COLORS.lightPeriwinkleColor,
    borderTopLeftRadius: adjust(12),
    borderTopRightRadius: adjust(12),
    borderBottomRightRadius: adjust(12),
  },
  chatBgSecond: {
    maxWidth: '70%',
    alignSelf: 'flex-end',
    backgroundColor: BASE_COLORS.superiorityBlueColor,
    borderTopLeftRadius: adjust(12),
    borderTopRightRadius: adjust(12),
    borderBottomLeftRadius: adjust(12),
  },
  iconDoubleArrow: {
    width: adjust(14),
    height: adjust(14),
  },
  fontSmall: {
    fontSize: adjust(10),
    width: '45%',
  },
  headerName: {
    width: '95%',
    overflow: 'hidden',
  },
  txtTime: {
    fontSize: adjust(9),
  },
  chatContentArea: {
    lineHeight: adjust(16),
  },
  bgContainer: {
    ...StyleSheet.absoluteFill,
  },
});
