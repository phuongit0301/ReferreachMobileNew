import React from 'react';
import {useWindowDimensions, View, ViewStyle} from 'react-native';

import {Paragraph, Image} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import {ISliderDataSource} from '~Root/types';
import styles from './styles';

const SliderItem: React.FC<{
  style?: ViewStyle;
  item: ISliderDataSource;
}> = ({style, item}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={[GlobalStyles.container, GlobalStyles.center, {width}, style]}>
      <Image
        resizeMode='cover'
        style={[
          GlobalStyles.mb15,
          {
            width: width * 0.5,
            height: height * 0.2,
          },
        ]}
        source={item.image}
      />
      <Paragraph textCenter textForestGreen2Color bold600 h3 title={item.title} style={GlobalStyles.mb15} />
      <Paragraph textCenter textWhite title={item.description} style={styles.description} />
    </View>
  );
};
export default SliderItem;
