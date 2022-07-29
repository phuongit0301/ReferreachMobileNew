/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {t} from 'i18next';
import moment from 'moment';

import {IIncluded, IUserChatList} from '~Root/services/chat/types';
import {Avatar, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {CHAT_BOX_TYPE_ENUM} from '~Root/utils';
import {useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyleContainer?: ViewStyle;
  tagStyle?: TextStyle;
  onPress?: (item: any) => void;
  items: IIncluded;
  isAsker: boolean;
  dataUser: IUserChatList;
  index: number;
}

const ListItemChat: React.FC<Props> = ({
  style = {},
  tagStyle = {},
  onPress = () => {},
  items,
  isAsker = false,
  dataUser,
  index,
}: Props) => {
  const userState = useSelector((state: IGlobalState) => state.userState);

  if (items?.attributes?.related_chat_contexts?.length > 0) {
    return items?.attributes?.related_chat_contexts.map((item: any, index: number) => {
      const user1 = item?.members.length > 0 ? item?.members[0] : null;
      const user2 = item?.members.length > 1 ? item?.members[1] : null;

      if (item?.chat_box_type === CHAT_BOX_TYPE_ENUM.RESPONDED) {
        return (
          <TouchableOpacity
            key={`chat-item-${item?.id}-${index}`}
            style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}
            onPress={() => onPress(item)}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
              <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
                <View style={styles.border} />
              </View>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart, GlobalStyles.mb10]}>
                  <View style={[GlobalStyles.mr10, GlobalStyles.alignEnd]}>
                    <Avatar
                      styleAvatar={{...GlobalStyles.mb5, ...styles.avatar}}
                      styleContainerGradient={{...GlobalStyles.mb5, ...styles.avatar}}
                      textStyle={{...GlobalStyles.h5, ...GlobalStyles.textBoldNormal}}
                      userInfo={{
                        avatar_url: user1.avatar_metadata?.avatar_url,
                        avatar_lat: user1.avatar_metadata?.avatar_lat,
                        avatar_lng: user1.avatar_metadata?.avatar_lng,
                        first_name: user1.first_name,
                        last_name: user1.last_name,
                      }}
                    />
                    <FastImage source={IMAGES.iconProtect} resizeMode='cover' style={styles.iconProtect} />
                  </View>
                  <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
                    <View style={[GlobalStyles.flexRow, GlobalStyles.pr30, GlobalStyles.mb5, styles.headerContainer]}>
                      <Paragraph bold600 textBlack title={`${user1?.full_name} `} />
                      <Paragraph bold600 textSteelBlue2Color title={t('responded')} />
                    </View>
                    <Paragraph
                      numberOfLines={2}
                      ellipsizeMode='tail'
                      p
                      textDarkGrayColor
                      title={item?.last_message_metadata?.message}
                      style={[GlobalStyles.mb10, styles.introduction]}
                    />
                  </View>
                </View>
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.pr60]}>
                  <Paragraph
                    h6
                    bold400
                    textDarkGrayColor
                    title={moment(dataUser?.attributes?.created_at).format('DD-MM-YYYY HH:mmA')}
                  />
                  {item?.last_message_metadata?.sender_id === userState?.userInfo?.id && (
                    <View style={styles.redCircle} />
                  )}
                </View>
              </View>
            </View>
            <View style={GlobalStyles.flexRow}>
              {index + 1 < items?.attributes?.related_chat_contexts.length && (
                <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
                  <View style={styles.border} />
                </View>
              )}
              <View style={GlobalStyles.mb15} />
            </View>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          key={`chat-item-${item?.id}-${index}`}
          style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}
          onPress={() => onPress(item)}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
              <View style={styles.border} />
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart, GlobalStyles.mb20]}>
                <View style={[GlobalStyles.mr5]}>
                  <View style={[GlobalStyles.alignSelfStart, GlobalStyles.alignEnd]}>
                    <Avatar
                      styleAvatar={{...GlobalStyles.mb5, ...styles.avatar}}
                      styleContainerGradient={{...GlobalStyles.mb5, ...styles.avatar}}
                      textStyle={{...GlobalStyles.h5, ...GlobalStyles.textBoldNormal}}
                      userInfo={{
                        avatar_url: user1.avatar_metadata?.avatar_url,
                        avatar_lat: user1.avatar_metadata?.avatar_lat,
                        avatar_lng: user1.avatar_metadata?.avatar_lng,
                        first_name: user1.first_name,
                        last_name: user1.last_name,
                      }}
                    />
                    <FastImage source={IMAGES.iconProtect} resizeMode='cover' style={styles.iconProtect1} />
                  </View>
                  {user2 && (
                    <View style={[GlobalStyles.flexRow, GlobalStyles.alignEnd, GlobalStyles.ml5]}>
                      <View style={[styles.borderCurve, GlobalStyles.mr2]} />
                      <View style={[GlobalStyles.flexRow, styles.avatarGroup]}>
                        <Avatar
                          styleAvatar={{...GlobalStyles.mb5, ...styles.avatarSmall}}
                          styleContainerGradient={{...GlobalStyles.mb5, ...styles.avatarSmall}}
                          textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                          userInfo={{
                            avatar_url: user2.avatar_metadata?.avatar_url,
                            avatar_lat: user2.avatar_metadata?.avatar_lat,
                            avatar_lng: user2.avatar_metadata?.avatar_lng,
                            first_name: user2.first_name,
                            last_name: user2.last_name,
                          }}
                        />
                        {item?.members.length > 2 && (
                          <View style={[GlobalStyles.alignCenter, GlobalStyles.justifyCenter, styles.avatarCount]}>
                            <Paragraph h6 textWhite bold700 title='+2' />
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>
                <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.pr30, GlobalStyles.mb5, styles.headerContainer]}>
                    <Paragraph bold600 title={`${user1?.full_name} `} />
                    <Paragraph bold600 textSteelBlue2Color title={t('introduced')} />
                    <Paragraph bold600 title={` ${user2?.full_name}`} />
                  </View>
                  <Paragraph
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    p
                    textDarkGrayColor
                    title={item?.last_message_metadata?.message}
                    style={[GlobalStyles.mb10, styles.introduction]}
                  />
                </View>
              </View>
              <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween, GlobalStyles.pr60]}>
                <Paragraph
                  h6
                  bold400
                  textDarkGrayColor
                  title={moment(dataUser?.attributes?.created_at).format('DD-MM-YYYY HH:mmA')}
                />
                {item?.last_message_metadata?.sender_id === userState?.userInfo?.id && (
                  <View style={styles.redCircle} />
                )}
              </View>
            </View>
          </View>
          <View style={GlobalStyles.flexRow}>
            {index + 1 < items?.attributes?.related_chat_contexts.length && (
              <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
                <View style={styles.border} />
              </View>
            )}
            <View style={GlobalStyles.mb15} />
          </View>
        </TouchableOpacity>
      );
    });
  }
  return null;
};

export default ListItemChat;
