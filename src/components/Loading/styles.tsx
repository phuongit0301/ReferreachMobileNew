import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  logo: {
    height: height,
    width: width,
    resizeMode: 'cover',
  },
});
