import React from 'react';
import {View, GestureResponderEvent, ViewStyle, TextStyle, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  items: any;
  isAsker: boolean;
  data: any[];
  index: number;
}

const ListItemChat: React.FC<Props> = ({
  style = {},
  tagStyle = {},
  onPress = () => {},
  items,
  isAsker = false,
  data = [],
  index,
}: Props) => {
  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
        <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
          {isAsker && <View style={styles.border} />}
        </View>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart]}>
            <View style={[GlobalStyles.mr10, styles.imageContainer]}>
              <FastImage source={{uri: items?.avatar_url}} style={styles.avatar} />
            </View>
            <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.mb5]}>
                <Paragraph
                  bold
                  title={`${items?.first_name} ${items?.last_name}`}
                  style={[styles.textRight, GlobalStyles.mr5]}
                />
              </View>
              <Paragraph
                numberOfLines={2}
                ellipsizeMode='tail'
                p
                title={items?.introduction}
                style={[GlobalStyles.mb10, styles.introduction]}
              />
            </View>
          </View>
          <View style={GlobalStyles.flexRow}>
            <Paragraph title={moment(items?.created_at).format('DD-MMYYYY HH:mm:ss')} />
            <Paragraph title='notify' />
          </View>
        </View>
      </View>
      {isAsker ? (
        <View style={GlobalStyles.flexRow}>
          <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
            <View style={styles.border} />
          </View>
          <View style={GlobalStyles.mb15} />
        </View>
      ) : (
        <View style={GlobalStyles.mb15} />
      )}
    </View>
  );
};

export default ListItemChat;
