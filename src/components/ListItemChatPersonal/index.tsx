import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {IData, IIncluded, IPeopleToAsk} from '~Root/services/chat/types';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (item: IData) => void;
  items: IData;
  isAsker: boolean;
  data: IIncluded[];
  index: number;
}

const ListItemChatPersonal: React.FC<Props> = ({
  style = {},
  tagStyle = {},
  onPress = () => {},
  items,
  isAsker = false,
  data = [],
  index,
}: Props) => {
  const dataUser = data.length > 0 ? data[0] : null;

  if (items?.attributes?.related_chat_contexts?.length > 0) {
    items?.attributes?.related_chat_contexts.map((item, index) => {
      const user1 = item?.members.length > 0 ? item?.members[0] : null;
      const user2 = item?.members.length > 1 ? item?.members[1] : null;

      return (
        <TouchableOpacity
          style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}
          onPress={() => onPress(items)}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
              <View style={styles.border} />
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart]}>
                <View style={[GlobalStyles.mr10, styles.imageContainer]}>
                  <FastImage source={{uri: user1?.avatar_metadata?.avatar_url}} style={styles.avatar} />
                </View>
                <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.mb5]}>
                    <Paragraph bold title={user1?.full_name} style={[styles.textRight, GlobalStyles.mr5]} />
                  </View>
                  <Paragraph
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    p
                    title={user1?.pitch}
                    style={[GlobalStyles.mb10, styles.introduction]}
                  />
                </View>
              </View>
              <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.pr60]}>
                <Paragraph title={moment(dataUser?.attributes?.created_at).format('DD-MM-YYYY HH:mm A')} />
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
        </TouchableOpacity>
      );
    });
  }
  return (
    <TouchableOpacity style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]} onPress={() => onPress(items)}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
        <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
          <View style={styles.border} />
        </View>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart]}>
            <View style={[GlobalStyles.mr10, styles.imageContainer]}>
              <FastImage source={{uri: dataUser?.attributes?.avatar_metadata?.avatar_url}} style={styles.avatar} />
            </View>
            <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.mb5]}>
                <Paragraph
                  bold
                  title={`${dataUser?.attributes?.first_name} ${dataUser?.attributes?.last_name}`}
                  style={[styles.textRight, GlobalStyles.mr5]}
                />
              </View>
              <Paragraph
                numberOfLines={2}
                ellipsizeMode='tail'
                p
                title={dataUser?.attributes?.pitch}
                style={[GlobalStyles.mb10, styles.introduction]}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.pr60]}>
            <Paragraph title={moment(dataUser?.attributes?.created_at).format('DD-MM-YYYY HH:mm A')} />
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
    </TouchableOpacity>
  );
};

export default ListItemChatPersonal;
