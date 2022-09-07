import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

export default StyleSheet.create({
  styleTag: {
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
    backgroundColor: BASE_COLORS.darkGray,
    borderWidth: 0,
  },
  styleTagPurple: {
    borderTopLeftRadius: adjust(16),
    borderTopRightRadius: adjust(16),
    borderBottomLeftRadius: adjust(16),
    borderBottomRightRadius: adjust(16),
    backgroundColor: BASE_COLORS.begoniaColor,
    borderWidth: 0,
  },
  tagContainer: {
    flexWrap: 'wrap',
  },
  iconThreeDotContainer: {
    flex: 0.05,
    alignSelf: 'flex-start',
    width: adjust(32),
    height: adjust(8),
  },
  iconThreeDot: {
    width: adjust(16),
    height: adjust(4),
  },
  iconCalendar: {
    width: adjust(16),
    height: adjust(16),
  },
  iconGlobe: {
    width: adjust(16),
    height: adjust(16),
  },
  iconVerify: {
    width: adjust(17),
    height: adjust(17),
  },
  icon35x35: {
    width: adjust(35),
    height: adjust(35),
  },
  cardContainer: {
    backgroundColor: BASE_COLORS.whiteColor,
    borderRadius: adjust(12),
  },
  tagText: {
    color: BASE_COLORS.whiteColor,
  },
  globeContainer: {
    width: '50%',
  },
  description: {
    flex: 1,
  },
  lineBorderContainer: {
    height: adjust(20),
  },
  lineBorder: {
    borderWidth: 2,
    borderColor: BASE_COLORS.flowkitGreyColor,
    borderRadius: adjust(10),
    width: adjust(50),
  },
  textNormal: {
    fontFamily: BASE_FONTS.regular,
    fontWeight: '400',
    fontStyle: 'normal',
    color: BASE_COLORS.darkGrayColor,
    fontSize: adjust(11),
    lineHeight: adjust(15),
  },
  textHighlight: {
    fontFamily: BASE_FONTS.bold,
    fontWeight: '700',
    color: BASE_COLORS.steelBlue2Color,
    fontSize: adjust(11),
    lineHeight: adjust(15),
  },
});
