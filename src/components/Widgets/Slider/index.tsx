import React from 'react';
import {ViewStyle} from 'react-native';

import {ISliderDataSource} from '~Root/types';
import Slider from './Slider';
import SliderList from './SliderList';
import Pagination from './Pagination';

interface IProps {
  data: ISliderDataSource[];
  onPress: () => void;
  style?: ViewStyle;
}

const Intro: React.FC<IProps> = ({data = [], onPress = () => {}, style = {}}) => {
  return (
    <Slider data={data} style={style}>
      <SliderList />
      <Pagination onPress={onPress} />
    </Slider>
  );
};

export default Intro;
