import {StyleSheet} from 'react-native';
import {BASE_COLORS, BASE_FONTS, BASE_STYLES} from '~Root/config';
import {adjust, lineHeightByRatio} from '~Root/utils';

export default StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: BASE_COLORS.greyColor,
    marginTop: -2,
    overflow: 'hidden',
  },
  border: {
    borderBottomColor: BASE_COLORS.greyColor,
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: '5%',
  },
  alphabetContainer: {
    height: '100%',
    position: 'absolute',
    right: 0,
    top: '10%',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: adjust(20),
    bottom: adjust(30),
    zIndex: 10,
  },
  buttonStyle: {
    backgroundColor: BASE_COLORS.oxleyColor,
    shadowColor: BASE_COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: adjust(5),
    },
    shadowOpacity: adjust(0.2),
    shadowRadius: adjust(5),
    elevation: adjust(2),
  },
  textPrimary: {
    fontFamily: BASE_FONTS.semiBold,
    lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
    color: BASE_COLORS.whiteColor,
  },
});
