/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {IDataChatPersonal, IIncluded} from '~Root/services/chat/types';
import {Avatar, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {CHAT_BOX_TYPE_ENUM} from '~Root/utils';
import {IGlobalState} from '~Root/types';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (item: any) => void;
  item: IIncluded;
  dataChatPersonal: IDataChatPersonal;
  index: number;
}

const ListItemChatPersonal: React.FC<Props> = ({
  style = {},
  onPress = () => {},
  item,
  dataChatPersonal,
  index,
}: Props) => {
  const user1 = dataChatPersonal?.included.length > 0 ? dataChatPersonal?.included[0] : null;

  return (
    <TouchableOpacity
      key={`chat-personal-item-${item?.id}-${index}`}
      style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, GlobalStyles.mb15, style]}
      onPress={() => onPress(item)}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.pl35, styles.itemWidth]}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart, GlobalStyles.mb10]}>
            <View style={[GlobalStyles.mr10, GlobalStyles.alignEnd]}>
              <Avatar
                styleAvatar={{...GlobalStyles.mb5, ...styles.avatar}}
                styleContainerGradient={{...GlobalStyles.mb5, ...styles.avatar}}
                textStyle={{...GlobalStyles.h5, ...GlobalStyles.textBoldNormal}}
                userInfo={{
                  avatar_url: user1?.attributes?.avatar_metadata?.avatar_url,
                  avatar_lat: user1?.attributes?.avatar_metadata?.avatar_lat,
                  avatar_lng: user1?.attributes?.avatar_metadata?.avatar_lng,
                  first_name: user1?.attributes?.first_name,
                  last_name: user1?.attributes?.last_name,
                }}
              />
              <FastImage source={IMAGES.iconProtect} resizeMode='cover' style={styles.iconProtect} />
            </View>
            <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb5]}>
                  <Paragraph
                    bold600
                    textBlack
                    title={`${user1?.attributes?.first_name} ${user1?.attributes?.last_name}`}
                  />
                </View>
                <TouchableOpacity>
                  <FastImage source={IMAGES.iconPinActive} resizeMode='cover' style={styles.iconPin} />
                </TouchableOpacity>
              </View>
              <Paragraph
                numberOfLines={2}
                ellipsizeMode='tail'
                p
                textDarkGrayColor
                title={item?.attributes?.last_message_metadata?.message}
                style={[GlobalStyles.mb10, styles.introduction]}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
            <Paragraph
              h6
              bold400
              textDarkGrayColor
              title={moment(item?.attributes?.created_at).format('DD-MM-YYYY HH:mmA')}
            />
            <View style={styles.redCircle} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemChatPersonal;
