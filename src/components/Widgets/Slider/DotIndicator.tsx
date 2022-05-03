import React from 'react';
import {Animated, useWindowDimensions, View, ViewStyle} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {ISliderDataSource} from '~Root/types';
import styles from './styles';

const DotIndicator: React.FC<{
  style?: ViewStyle;
  data: ISliderDataSource[];
  scrollX: Animated.Value;
  currentIndex: number;
}> = ({style, data, scrollX, currentIndex}) => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={[
        GlobalStyles.ml30,
        GlobalStyles.mr15,
        GlobalStyles.flexRow,
        GlobalStyles.center,
        styles.dotContainer,
        style,
      ]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, {width: dotWidth, opacity, backgroundColor: BASE_COLORS.whiteColor}]}
          />
        );
      })}
    </View>
  );
};
export default DotIndicator;
