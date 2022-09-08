import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Paragraph} from '~Root/components';
import styles from '~Root/components/AuthHeader/styles';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';

const HEADER_HEIGHT = 100;

const AnimatedHeader = ({animatedValue, onVisibleInviteModal}: any) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, 44],
    extrapolate: 'clamp',
  });

  const headerTop = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [120, 116],
    extrapolate: 'clamp',
  });

  const buttonHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [insets.top + 100, 0],
    extrapolateRight: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolateRight: 'clamp',
  });

  const buttonScaleHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [44, 88],
    extrapolateLeft: 'identity',
    extrapolateRight: 'clamp',
  });

  const opacity1 = animatedValue.interpolate({
    inputRange: [0, 88],
    outputRange: [0, 1],
    extrapolateRight: 'clamp',
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: ['transparent', BASE_COLORS.whiteColor],
    extrapolateRight: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: headerTop,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor,
      }}>
      <View>
        <Animated.View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.justifyBetween,
            GlobalStyles.ph15,
            {height: buttonHeight, opacity},
          ]}>
          <LinearGradient
            colors={[BASE_COLORS.forestGreenColor, BASE_COLORS.steelBlue2Color]}
            style={[
              GlobalStyles.flexColumn,
              GlobalStyles.container,
              GlobalStyles.itemCenter,
              GlobalStyles.mr15,
              styles.block,
            ]}>
            <TouchableOpacity
              onPress={onVisibleInviteModal}
              style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.itemCenter]}>
              <FastImage
                source={IMAGES.iconUserPlus40x40}
                resizeMode='cover'
                style={[GlobalStyles.mb5, styles.iconPlus40x40]}
              />
              <Paragraph h5 bold textWhite title='Invite' style={GlobalStyles.mb5} />
              <Paragraph textWhite title='to Trust Network' style={styles.text} />
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={[BASE_COLORS.cyanCornflowerBlueColor, BASE_COLORS.steelBlue2Color]}
            style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.itemCenter, styles.block]}>
            <FastImage
              source={IMAGES.iconUsers40x40}
              resizeMode='cover'
              style={[GlobalStyles.mb5, styles.iconPlus40x40]}
            />
            <Paragraph h5 bold textWhite title='Join' style={GlobalStyles.mb5} />
            <Paragraph textWhite title='Trust Network' style={styles.text} />
          </LinearGradient>
        </Animated.View>
        <Animated.View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.itemCenter,
            GlobalStyles.justifyBetween,
            GlobalStyles.ph15,
            {height: buttonScaleHeight, opacity: opacity1, backgroundColor: BASE_COLORS.whiteColor},
          ]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.forestGreenColor]}
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.container,
              GlobalStyles.itemCenter,
              GlobalStyles.justifyCenter,
              GlobalStyles.mr15,
              styles.block2,
            ]}>
            <TouchableOpacity
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.container,
                GlobalStyles.itemCenter,
                GlobalStyles.justifyCenter,
              ]}
              onPress={onVisibleInviteModal}>
              <FastImage source={IMAGES.iconUserPlus} resizeMode='cover' style={[GlobalStyles.mr5, styles.iconPlus]} />
              <Paragraph bold textWhite title='Invite' />
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={[BASE_COLORS.cyanCornflowerBlueColor, BASE_COLORS.steelBlue2Color]}
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.container,
              GlobalStyles.itemCenter,
              GlobalStyles.justifyCenter,
              styles.block2,
            ]}>
            <FastImage source={IMAGES.iconUsers} resizeMode='cover' style={[GlobalStyles.mr5, styles.iconPlus]} />
            <Paragraph bold textWhite title='Join' />
          </LinearGradient>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default AnimatedHeader;
