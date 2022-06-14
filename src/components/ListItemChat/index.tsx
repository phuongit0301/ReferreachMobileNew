import React from 'react';
import {View, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle, Text} from 'react-native';

import {Icon, Image, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';
import {IPeopleToAsk} from '~Root/services/chat/types';

interface Props extends IPeopleToAsk {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  name: string;
  title: string;
  status: string;
  description?: string;
  image: string;
  count: number;
  hour: string;
}

const ListItemChat: React.FC<Props> = ({
  style = {},
  tagStyle = {},
  onPress = () => {},
  name = '',
  title = '',
  status = '',
  description,
  image,
  count = 0,
  hour = '',
}: Props) => {
  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={GlobalStyles.avatar2} />
        </View>
        <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
          <View style={[styles.rightContainer, GlobalStyles.flexRow]}>
            <Paragraph textWhite bold title={status} style={[styles.textRight, GlobalStyles.mr5]} />
            <Icon name='arrow-right' size={adjust(8)} color={BASE_COLORS.whiteColor} />
          </View>
          <View style={GlobalStyles.flexRow}>
            <View style={styles.contentArea}>
              <Paragraph
                p
                title={name}
                style={[GlobalStyles.tagStyle, GlobalStyles.mb10, GlobalStyles.textUppercase, tagStyle]}
              />
              <Paragraph p bold textEerieBlackColor title={title} numberOfLines={1} style={styles.title} />
              <Paragraph p title={description} numberOfLines={1} />
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.itemCenter, GlobalStyles.mr10]}>
              <Paragraph p textOxleyColor title={hour} numberOfLines={1} style={GlobalStyles.mb5} />
              <View style={styles.countContainer}>
                <Paragraph p textWhite title={`${count}`} numberOfLines={1} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemChat;
