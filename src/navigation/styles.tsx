import {StyleSheet} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import {adjust} from '~Root/utils';

const styles = StyleSheet.create({
  tabContainer: {
    height: adjust(84),
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    elevation: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: adjust(10),
    borderTopWidth: 1,
    borderTopColor: BASE_COLORS.spanishGrayColor2,
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: 50,
  },
  tabArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mt10: {
    marginTop: 10,
  },
  tabBarArea: {
    flex: 1,
    position: 'relative',
  },
  tabBarRow: {
    flexDirection: 'row',
  },
  iconYourAsk: {
    width: adjust(29),
    height: adjust(28),
  },
  iconAirFeed: {
    width: adjust(40),
    height: adjust(33),
  },
  iconAsk: {
    width: adjust(37),
    height: adjust(28),
  },
  iconTrustNetWork: {
    width: adjust(28),
    height: adjust(32),
  },
  iconChat: {
    width: adjust(27),
    height: adjust(28),
  },
  iconActive: {
    borderWidth: 1,
    borderColor: BASE_COLORS.jetStreamColor,
    borderRadius: adjust(15),
    borderBottomRightRadius: adjust(20),
  },
  icons: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: adjust(15),
    borderBottomRightRadius: adjust(20),
  },
  iconContainer: {
    height: adjust(42),
    alignItems: 'center',
  },
  // drawer

  content: {
    flex: 1,
  },
  footer: {
    flex: 0.2,
  },
  iconClose: {
    width: adjust(19),
    height: adjust(18),
  },
  avatarBorder: {
    borderWidth: 1,
    borderColor: BASE_COLORS.whiteColor,
  },
  iconListContainer: {
    width: adjust(24),
  },
  iconLogout: {
    width: adjust(20),
    height: adjust(24),
  },
});

export default styles;
