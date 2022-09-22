import {StyleSheet, Dimensions} from 'react-native';
import { BASE_FONTS } from '~Root/config';
import {adjust} from '~Root/utils';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  toastContainer: {
    backgroundColor: 'transparent',
    height: 0,
  },
  toastContainerActive: {
    width: width - 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastRow: {
    backgroundColor: '#313437',
    borderRadius: adjust(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: adjust(10),
    paddingHorizontal: adjust(15),
    paddingVertical: adjust(3),
  },
  toastTextContainer: {
    padding: 2,
  },
  toastText: {
    fontFamily: BASE_FONTS.notoSansRegular,
    fontWeight: '400',
    fontSize: adjust(12),
  },
  iconLogo: {
    width: adjust(18),
    height: adjust(18),
  },
});
