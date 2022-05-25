import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {IMAGES} from '~Root/config';
import Paragraph from '../Paragraph';
import styles from './styles';

interface Props {
  label: string;
}

const Dropdown: React.FC<Props> = ({label}) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return <Paragraph title='This is where the dropdown will be rendered.' />;
    }
  };

  return (
    <TouchableOpacity onPress={toggleDropdown}>
      {renderDropdown()}
      <Paragraph title={label} />
      <FastImage source={IMAGES.iconDropDown} resizeMode='cover' style={styles.iconDropDown} />
    </TouchableOpacity>
  );
};

export default Dropdown;
