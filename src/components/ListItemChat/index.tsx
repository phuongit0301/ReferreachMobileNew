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
      let asker = null;
      let introducee = null;
      let introducer = null;
      let isIntroducer = false;
      let isAsker = false;
      let isIntroducee = false;

      if (item?.members.length > 0) {
        for (const role of item.members) {
          if (item?.current_user_role === 'introducer') {
            if (+role.id === +userState?.userInfo?.id) {
              introducer = role;
              isIntroducer = true;
            } else {
              asker = role;
              introducee = role;
            }
          }

          if (item?.current_user_role === 'asker') {
            if (+role.id === +userState?.userInfo?.id) {
              asker = role;
              isAsker = true;
            } else {
              introducer = role;
              if (item?.introductions?.length > 0) {
                introducee = item?.introductions[0]?.introducee;
              } else {
                introducee = role;
              }
            }
          }

          if (item?.current_user_role === 'introducee') {
            if (+role.id === +userState?.userInfo?.id) {
              introducee = role;
              isIntroducee = true;
            } else {
              introducer = role;
            }
          }
        }
      }

      if (item?.chat_box_type === CHAT_BOX_TYPE_ENUM.RESPONDED) {
        return (
          <TouchableOpacity
            key={`chat-item-${item?.id}-${index}`}
            style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}
            onPress={() => onPress({contextId: item?.id, introducerId: introducer?.id})}>
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
                          avatar_url: introducer?.avatar_metadata?.avatar_url,
                          avatar_lat: introducer?.avatar_metadata?.avatar_lat,
                          avatar_lng: introducer?.avatar_metadata?.avatar_lng,
                          first_name: introducer?.first_name,
                          last_name: introducer?.last_name,
                        }}
                      />
                      <FastImage
                        source={IMAGES.iconProtect}
                        resizeMode='cover'
                        style={introducer?.avatar_metadata?.avatar_url ? styles.iconProtect1 : styles.iconProtect2}
                      />
                    </View>
                    {introducee && (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignEnd, GlobalStyles.ml5]}>
                        <View style={[styles.borderCurve, GlobalStyles.mr2]} />
                        <View style={[GlobalStyles.flexRow, styles.avatarGroup]}>
                          <Avatar
                            styleAvatar={{...GlobalStyles.mb5, ...styles.avatarSmall}}
                            styleContainerGradient={{...GlobalStyles.mb5, ...styles.avatarSmall}}
                            textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                            userInfo={{
                              avatar_url: introducee?.avatar_metadata?.avatar_url,
                              avatar_lat: introducee?.avatar_metadata?.avatar_lat,
                              avatar_lng: introducee?.avatar_metadata?.avatar_lng,
                              first_name: introducee?.first_name,
                              last_name: introducee?.last_name,
                            }}
                          />
                          {item?.members.length > 2 && (
                            <View style={[GlobalStyles.alignCenter, GlobalStyles.justifyCenter, styles.avatarCount]}>
                              <Paragraph h6 textWhite bold700 title={item?.members.length} />
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
                    <View style={[GlobalStyles.flexRow, GlobalStyles.pr30, GlobalStyles.mb3, styles.headerContainer]}>
                      <Paragraph bold600 h6 title={`${isIntroducer ? 'You' : introducer?.full_name} `} />
                      <Paragraph bold600 h6 textSteelBlue2Color title={t('introduced')} />
                      {introducee?.full_name ? (
                        <Paragraph bold600 h6 title={` ${isIntroducee ? 'You' : introducee?.full_name}`} />
                      ) : (
                        <Paragraph
                          bold600
                          h6
                          title={` ${isIntroducee ? 'You' : `${introducee?.first_name} ${introducee?.last_name}`}`}
                        />
                      )}
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
                    title={moment(item?.created_at).format('DD-MM-YYYY HH:mmA')}
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
          onPress={() => onPress({contextId: item?.id, introducerId: introducer?.id})}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
              <View style={styles.border} />
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.p10, styles.contain]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart, GlobalStyles.mb10]}>
                <View style={[GlobalStyles.alignEnd, introducee?.avatar_metadata?.avatar_url && GlobalStyles.mr5]}>
                  <Avatar
                    styleAvatar={{...GlobalStyles.mb5, ...styles.avatar}}
                    styleContainerGradient={{...GlobalStyles.mb5, ...styles.avatar}}
                    textStyle={{...GlobalStyles.h5, ...GlobalStyles.textBoldNormal}}
                    userInfo={{
                      avatar_url: introducee?.avatar_metadata?.avatar_url,
                      avatar_lat: introducee?.avatar_metadata?.avatar_lat,
                      avatar_lng: introducee?.avatar_metadata?.avatar_lng,
                      first_name: introducee?.first_name,
                      last_name: introducee?.last_name,
                    }}
                  />
                  <FastImage
                    source={IMAGES.iconProtect}
                    resizeMode='cover'
                    style={introducee?.avatar_metadata?.avatar_url ? styles.iconProtect : styles.iconProtect2}
                  />
                </View>
                <View style={[GlobalStyles.flexColumn, styles.contentContainer]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.pr30, GlobalStyles.mb3, styles.headerContainer]}>
                    <Paragraph h6 textBlack title={`${introducee?.full_name} `} style={styles.textBold} />
                    <Paragraph h6 textSteelBlue2Color title={t('responded')} style={styles.textBold} />
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
                <Paragraph h6 bold400 textDarkGrayColor title={moment(item?.created_at).format('DD-MM-YYYY HH:mmA')} />
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
