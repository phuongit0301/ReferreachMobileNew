import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

interface Props {
  currentRate: number;
  onRate?: (index: number) => void;
}

const Rate: React.FC<Props> = ({currentRate = 0, onRate = () => {}}) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map(x => (
        <TouchableOpacity style={GlobalStyles.mr5} onPress={() => onRate(x)} key={`rate-${currentRate}${x}`}>
          {+currentRate >= +x ? (
            <FastImage source={IMAGES.starRateFill} resizeMode='contain' style={styles.starRate} />
          ) : (
            <FastImage source={IMAGES.starRate} resizeMode='contain' style={styles.starRate} />
          )}
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Rate;
