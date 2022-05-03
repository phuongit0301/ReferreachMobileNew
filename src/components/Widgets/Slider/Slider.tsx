import React, {useRef, useState} from 'react';
import {Animated, useWindowDimensions, View, ViewStyle} from 'react-native';
import {GlobalStyles} from '~Root/config';
import {ISliderDataSource} from '~Root/types';

interface ISliderListProps {
  style?: ViewStyle;
  scrollX?: Animated.Value;
  data?: ISliderDataSource[];
  currentIndex?: number;
  q?: (newIndex: number) => void;
}
type ChildT = React.ReactElement<ISliderListProps>;
type ChildrenT = ChildT[] | ChildT;

const Slider: React.FC<{style?: ViewStyle; data: ISliderDataSource[]}> = ({style, data, children}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const childrenWithProps = React.Children.map(children as ChildrenT, (child: ChildT) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        data,
        scrollX,
        currentIndex,
        setCurrentIndex,
        ...child.props, // override with directly passed props
      });
    }
    return child;
  });
  return <View style={[GlobalStyles.container, {width}, style]}>{childrenWithProps}</View>;
};

export default Slider;
