/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {t} from 'i18next';
import moment from 'moment';

import {IIncluded, IUserChatList} from '~Root/services/chat/types';
import {Avatar, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {ASK_STATUS_ENUM, CHAT_BOX_TYPE_ENUM} from '~Root/utils';
import {useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {Trans} from 'react-i18next';

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
      let opacity = styles.opacity;
      let message = '';

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
      if (items?.attributes?.status === ASK_STATUS_ENUM.EXPIRED) {
        opacity = GlobalStyles.opacity5;
        message = t('ask_has_ended');
      } else if (items?.attributes?.status === ASK_STATUS_ENUM.CLOSED) {
        opacity = GlobalStyles.opacity5;
        message = t('ask_has_expired');
      }

      if (item?.chat_box_type === CHAT_BOX_TYPE_ENUM.RESPONDED) {
        let showKudos = false;
        if (item?.introductions?.length > 0) {
          showKudos = item?.introductions.some((x: any) => x.kudos);
        }

        return (
          <TouchableOpacity
            key={`chat-item-${item?.id}-${index}`}
            style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}
            onPress={() => onPress({contextId: item?.id, introducerId: introducer?.id})}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
              <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
                <View style={styles.border} />
                {index + 1 === items.attributes?.related_chat_contexts?.length && message !== '' && <View style={styles.circle} />}
              </View>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.fullWidth]}>
                <View style={[GlobalStyles.flexColumn, styles.contain]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart, GlobalStyles.p10, GlobalStyles.mb20]}>
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
                        <Paragraph
                          bold600
                          h6
                          title={`${isIntroducer ? 'You' : introducer?.full_name} `}
                          style={opacity}
                        />
                        <Paragraph bold600 h6 textSteelBlue2Color title={t('introduced')} style={opacity} />
                        {introducee?.full_name ? (
                          <Paragraph
                            bold600
                            h6
                            title={` ${isIntroducee ? 'You' : introducee?.full_name}`}
                            style={opacity}
                          />
                        ) : (
                          <Paragraph
                            bold600
                            h6
                            title={` ${isIntroducee ? 'You' : `${introducee?.first_name} ${introducee?.last_name}`}`}
                            style={opacity}
                          />
                        )}
                      </View>
                      <Paragraph
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        p
                        textDarkGrayColor
                        title={item?.last_message_metadata?.message}
                        style={[GlobalStyles.mb10, styles.introduction, opacity]}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      GlobalStyles.justifyBetween,
                      GlobalStyles.pl10,
                      GlobalStyles.pr60,
                      GlobalStyles.mb15,
                    ]}>
                    <Paragraph
                      h6
                      bold400
                      textDarkGrayColor
                      title={moment(item?.created_at).format('DD-MM-YYYY HH:mmA')}
                      style={opacity}
                    />
                    {+userState?.userInfo?.id !== item?.last_message_metadata?.read_by_user_id && (
                      <View style={styles.redCircle} />
                    )}
                  </View>
                  {showKudos && (
                    <View
                      style={[
                        GlobalStyles.flexRow,
                        GlobalStyles.p5,
                        GlobalStyles.justifyStart,
                        GlobalStyles.alignCenter,
                        GlobalStyles.flexWrap,
                        styles.bgKudos,
                      ]}>
                      <FastImage
                        source={IMAGES.iconHand}
                        resizeMode='contain'
                        style={[GlobalStyles.mr5, styles.iconHand]}
                      />
                      <View
                        style={[
                          GlobalStyles.flexRow,
                          GlobalStyles.alignStart,
                          GlobalStyles.flexWrap,
                          styles.kudosMessageContainer,
                        ]}>
                        <Trans
                          i18nKey='kudos_message'
                          parent={Text}
                          values={{
                            name: `${dataUser?.attributes?.first_name} ${dataUser?.attributes?.last_name}`,
                          }}
                          components={{
                            bold: <Text style={[GlobalStyles.p, styles.kudosTextBold]} />,
                            normal: <Text style={[GlobalStyles.p, styles.kudosTextNormal]} />,
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
                {index + 1 === items.attributes?.related_chat_contexts?.length && message !== '' && (
                  <Paragraph
                    h6
                    textDarkGrayColor
                    bold600
                    title={message}
                    style={[GlobalStyles.mt20, GlobalStyles.ml15]}
                  />
                )}
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

      const showKudos = item?.chat_contextable?.introduction?.kudos;

      return (
        <TouchableOpacity
          key={`chat-item-${item?.id}-${index}`}
          style={[GlobalStyles.flexColumn, GlobalStyles.alignStart, style]}
          onPress={() => onPress({contextId: item?.id, introducerId: introducer?.id})}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.alignCenter, styles.borderContainer]}>
              <View style={styles.border} />
              {index + 1 === items.attributes?.related_chat_contexts?.length && message !== '' && <View style={styles.circle} />}
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.fullWidth]}>
              <View style={[GlobalStyles.flexColumn, styles.contain]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignStart, GlobalStyles.p10, GlobalStyles.mb10]}>
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
                      <Paragraph h6 textBlack title={`${introducee?.full_name} `} style={[styles.textBold, opacity]} />
                      <Paragraph h6 textSteelBlue2Color title={t('responded')} style={[styles.textBold, opacity]} />
                    </View>
                    <Paragraph
                      numberOfLines={2}
                      ellipsizeMode='tail'
                      p
                      textDarkGrayColor
                      title={item?.last_message_metadata?.message}
                      style={[GlobalStyles.mb10, styles.introduction, opacity]}
                    />
                  </View>
                </View>
                <View
                  style={[
                    GlobalStyles.flexRow,
                    GlobalStyles.justifyBetween,
                    GlobalStyles.pl10,
                    GlobalStyles.pr60,
                    GlobalStyles.mb15,
                  ]}>
                  <Paragraph
                    h6
                    bold400
                    textDarkGrayColor
                    title={moment(item?.created_at).format('DD-MM-YYYY HH:mmA')}
                    style={opacity}
                  />
                  {+userState?.userInfo?.id !== item?.last_message_metadata?.read_by_user_id && (
                    <View style={styles.redCircle} />
                  )}
                </View>
                {showKudos && (
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      GlobalStyles.p5,
                      GlobalStyles.justifyStart,
                      GlobalStyles.alignCenter,
                      GlobalStyles.flexWrap,
                      styles.bgKudos,
                    ]}>
                    <FastImage
                      source={IMAGES.iconHand}
                      resizeMode='contain'
                      style={[GlobalStyles.mr5, styles.iconHand]}
                    />
                    <View
                      style={[
                        GlobalStyles.flexRow,
                        GlobalStyles.alignStart,
                        GlobalStyles.flexWrap,
                        styles.kudosMessageContainer,
                      ]}>
                      <Trans
                        i18nKey='kudos_message'
                        parent={Text}
                        values={{
                          name: `${dataUser?.attributes?.first_name} ${dataUser?.attributes?.last_name}`,
                        }}
                        components={{
                          bold: <Text style={[GlobalStyles.p, styles.kudosTextBold]} />,
                          normal: <Text style={[GlobalStyles.p, styles.kudosTextNormal]} />,
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
              {index + 1 === items.attributes?.related_chat_contexts?.length && message !== '' && (
                <Paragraph
                  h6
                  textDarkGrayColor
                  bold600
                  title={message}
                  style={[GlobalStyles.mt20, GlobalStyles.ml15]}
                />
              )}
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
