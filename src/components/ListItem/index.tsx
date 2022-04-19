import React from 'react';
import {View, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle, Text} from 'react-native';

import {Trans} from 'react-i18next';
import moment from 'moment';

import {IMyAsk} from '~Root/services/ask/types';
import {Icon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust, dateToHours} from '~Root/utils';
import styles from './styles';

interface Props extends IMyAsk {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  ask_template_title: string;
  deadline: Date | string;
  showDeadline?: boolean;
  location: string;
  context?: string;
  line1: string;
  line2: string;
  label: string;
}

const ListItem: React.FC<Props> = ({
  style = {},
  styleRow = {},
  tagStyleContainer = {},
  tagStyle = {},
  onPress = () => {},
  ask_template_title = '',
  deadline = '',
  showDeadline = true,
  location = '',
  context = '',
  line1 = '',
  line2 = '',
  label = '',
}: Props) => {
  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
      <View style={[GlobalStyles.flexColumn, styles.itemContainer]}>
        {deadline !== '' && showDeadline && (
          <View style={styles.rightContainer}>
            <Paragraph textIndianRedColor bold title={`${dateToHours(deadline)} hours left`} />
          </View>
        )}
        <View style={styles.contentContainer}>
          <View style={[GlobalStyles.tagStyleContainer, GlobalStyles.mb10, tagStyleContainer]}>
            <Paragraph p title={label} style={[GlobalStyles.tagStyle, GlobalStyles.textUppercase, tagStyle]} />
          </View>
          <View style={[GlobalStyles.mb15, styleRow]}>
            <Paragraph h5 bold textSteelBlueColor title={line1} />
            <View style={GlobalStyles.flexRow}>
              <Trans
                i18nKey='ask_content_preview'
                values={{content: line2}}
                parent={Text}
                components={{
                  normal: <Text style={GlobalStyles.textNormal} />,
                  highlight: <Text style={GlobalStyles.textSteelBlue} />,
                }}
              />
            </View>
          </View>
          <View style={GlobalStyles.flexRow}>
            <View style={[GlobalStyles.mr5, styles.locationContainer]}>
              <Icon name='map-marker-alt' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
              <Paragraph title={location} style={styles.locationText} numberOfLines={1} />
            </View>
            <View style={styles.dateContainer}>
              <Icon name='calendar' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
              <Paragraph title={`${moment(deadline).format('YYYY-MM-DD')}`} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
