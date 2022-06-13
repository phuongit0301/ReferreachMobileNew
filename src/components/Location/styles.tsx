import {Dimensions, Platform, StyleSheet} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputDynamicContainer: {
    ...GlobalStyles.mb5,
    ...GlobalStyles.ph10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(229, 229, 229, 0.46);',
    borderColor: BASE_COLORS.steelBlue2Color,
    borderRadius: adjust(22),
    borderWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? adjust(10) : 0,
    alignItems: 'center',
    height: adjust(35),
  },
  locationArea: {
    backgroundColor: BASE_COLORS.brightGrayColor,
    paddingVertical: adjust(5),
    paddingHorizontal: adjust(5),
    borderBottomLeftRadius: adjust(10),
    borderBottomRightRadius: adjust(10),
    position: 'absolute',
    left: 0,
    right: 0,
    top: adjust(40),
    zIndex: 50,
  },
  borderBottom: {
    ...GlobalStyles.mh10,
    borderBottomColor: BASE_COLORS.steelBlueColor,
    borderBottomWidth: 1,
    flex: 1,
    width: '90%',
  },
  item: {
    width: windowWidth - 80,
  },
});

export default styles;
