import React from 'react';
import {View, GestureResponderEvent, ViewStyle, TextStyle} from 'react-native';

import styles from './styles';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  item: {
    id: number;
    name: string;
  };
  index: number;
}

const InviteContactItem: React.FC<Props> = ({
  style = {},
  styleRow = {},
  onPress = () => {},
  item,
  index = 1,
}: Props) => {
  return (
    <View style={[styles.contain, style]}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <Paragraph textTealBlue bold title={`Invite ${index}`} />
        <Paragraph textGreyColor title={` taken by ${item?.name || ' Unknown'}`} />
      </View>
    </View>
  );
};

export default InviteContactItem;
