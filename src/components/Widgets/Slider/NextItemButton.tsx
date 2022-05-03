/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {useEffect, useRef} from 'react';
import {Animated, View, ViewStyle, TouchableOpacity} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {Icon} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {ISliderDataSource} from '~Root/types';
import {adjust} from '~Root/utils';
import styles from './styles';

const NextItemButton: React.FC<{
  style?: ViewStyle;
  data: ISliderDataSource[];
  percentage: number;
  currentIndex: number;
  setCurrentIndex: (newIndex: number) => void;
}> = ({style, data, percentage, currentIndex, setCurrentIndex}) => {
  const size = 48;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;

  const progressRef = useRef(null);
  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, [percentage]);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('pressed::');
        if (currentIndex <= data.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }}>
      <Svg width={size} height={size}>
        <G rotation='-90' origin={center}>
          <Circle stroke='#90959E' cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
          <Circle
            ref={progressRef}
            stroke={BASE_COLORS.whiteColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            // strokeDashoffset={circumference - (circumference * 33) / 100}
          />
        </G>
        <View style={[GlobalStyles.p12, styles.button]}>
          <Icon name='arrow-right' color={BASE_COLORS.whiteColor} size={adjust(12)} />
        </View>
      </Svg>
    </TouchableOpacity>
  );
};

export default NextItemButton;
