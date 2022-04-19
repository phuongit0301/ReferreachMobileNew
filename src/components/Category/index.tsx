import React from 'react';
import {TouchableOpacity} from 'react-native';

import {Icon, Paragraph} from '~Root/components';
import {BASE_COLORS} from '~Root/config';
import styles from './styles';

interface Props {
  onPress?: (item: any) => void;
  itemKey?: string;
  name?: string;
  showButton: boolean;
}

const Category: React.FC<Props> = ({onPress = () => {}, itemKey, name, showButton = true}) => {
  return (
    <TouchableOpacity onPress={() => onPress(itemKey)} style={[styles.tag, styles.mr10]}>
      <Paragraph p style={styles.tagText} title={name} />
      {showButton && <Icon name='times' size={12} color={BASE_COLORS.indianRedColor} />}
    </TouchableOpacity>
  );
};

export default Category;
