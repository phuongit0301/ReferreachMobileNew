/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {IDataChatPersonal, IIncluded} from '~Root/services/chat/types';
import {IUserState} from '~Root/services/user/types';
import {Avatar, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (item: any) => void;
  onPin?: (id: string, index: number) => void;
  onUnPin?: (id: string, index: number) => void;
  item: IIncluded;
  dataChatPersonal: IDataChatPersonal;
  userState: IUserState;
  index: number;
}

const ListItemChatPersonal: React.FC<Props> = ({
  style = {},
  onPress = () => {},
  onPin = () => {},
  onUnPin = () => {},
  item,
  dataChatPersonal,
  index,
  userState,
}: Props) => {
  let user1 = null;

  if (item?.relationships?.members?.data?.length > 0) {
    const userAnother = item?.relationships?.members?.data.find((x: any) => +x.id !== +userState?.userInfo?.id);

    if (dataChatPersonal?.included.length > 0 && userAnother) {
      user1 = dataChatPersonal?.included.find((x: any) => +x.id === +userAnother?.id);
    }
  }

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
              <FastImage
                source={IMAGES.iconProtect}
                resizeMode='cover'
                style={user1?.attributes?.avatar_metadata?.avatar_url ? styles.iconProtect : styles.iconProtect1}
              />
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
                {item?.attributes?.pinned ? (
                  <TouchableOpacity onPress={() => onUnPin(item?.id, index)}>
                    <FastImage source={IMAGES.iconPinActive} resizeMode='cover' style={styles.iconPin} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => onPin(item?.id, index)}>
                    <FastImage source={IMAGES.iconPin} resizeMode='cover' style={styles.iconPin} />
                  </TouchableOpacity>
                )}
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
            {item?.attributes?.last_message_metadata?.sender_id === userState?.userInfo?.id && (
              <View style={styles.redCircle} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemChatPersonal;
