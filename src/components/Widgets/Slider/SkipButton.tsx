import React from 'react';
import {View, ViewStyle, TouchableOpacity} from 'react-native';

import Paragraph from '~Root/components/Paragraph';
import styles from './styles';

const SkipButton: React.FC<{
  style?: ViewStyle;
  visible?: boolean;
  onPress?: () => void;
}> = ({style, visible = true, onPress = () => {}}) => {
  return (
    <View style={[styles.textSkip, style]}>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Paragraph textWhite title={`${visible ? '' : 'skip'}`} />
      </TouchableOpacity>
    </View>
  );
};

export default SkipButton;
