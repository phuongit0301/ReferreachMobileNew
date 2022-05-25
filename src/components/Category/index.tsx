import React from 'react';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Icon, Paragraph} from '~Root/components';
import {BASE_COLORS} from '~Root/config';
import styles from './styles';

interface Props {
  onPress?: (item: any) => void;
  itemKey?: string;
  name?: string;
  showButton: boolean;
  styleTag?: ViewStyle;
  tagText?: TextStyle;
  uri?: number;
}

const Category: React.FC<Props> = ({
  onPress = () => {},
  itemKey,
  name,
  showButton = true,
  styleTag = {},
  tagText = {},
  uri,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(itemKey)} style={[styles.tag, styles.mr10, styleTag]}>
      <Paragraph p style={[styles.tagText, tagText]} title={name} />
      {showButton && uri ? (
        <FastImage source={uri} resizeMode='cover' style={styles.iconCloseBlue} />
      ) : (
        <Icon name='times' size={12} color={BASE_COLORS.indianRedColor} />
      )}
    </TouchableOpacity>
  );
};

export default Category;
