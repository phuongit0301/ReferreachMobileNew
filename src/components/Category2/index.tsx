import React from 'react';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Icon, Paragraph} from '~Root/components';
import {BASE_COLORS} from '~Root/config';
import styles from './styles';

interface Props {
  onPress?: (item: any) => void;
  onClear?: (item: any) => void;
  itemKey?: string;
  name?: string;
  showButton: boolean;
  styleTag?: ViewStyle;
  tagText?: TextStyle;
  uri?: number;
}

const Category2: React.FC<Props> = ({
  onPress = () => {},
  onClear = () => {},
  itemKey,
  name,
  showButton = true,
  styleTag = {},
  tagText = {},
  uri,
}) => {
  return (
    <View style={[styles.tag, styles.mr10, styleTag]}>
      <TouchableOpacity onPress={() => onPress(itemKey)}>
        <Paragraph p style={[styles.tagText, tagText]} title={name} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClear(itemKey)}>
        {showButton && uri ? (
          <FastImage source={uri} resizeMode='cover' style={styles.iconCloseBlue} />
        ) : (
          <Icon name='times' size={12} color={BASE_COLORS.indianRedColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Category2;
