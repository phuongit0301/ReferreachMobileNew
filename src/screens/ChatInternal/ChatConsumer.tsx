/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useEffect, useState} from 'react';
import {Animated, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Trans, useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CompositeScreenProps} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {usePubNub} from 'pubnub-react';
import {HistoryMessage} from 'pubnub';
import moment from 'moment';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {
  getChatAskContextRequest,
  onUpdateChatContextRequest,
  resetDataChat,
  setVisibleMenu,
} from '~Root/services/chat/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {Paragraph, HeaderChatContextBlue, Loading, ChatItem, LoadingSecondary, Avatar} from '~Root/components';
import {adjust, ASK_STATUS_ENUM, convertLocalToUTC, dateWithMonthsDelay} from '~Root/utils';
import {IActionOnUpdateExtendDeadlineSuccess} from '~Root/services/ask/types';
import {onExtendDeadlineRequest} from '~Root/services/ask/actions';
import {setPubnubMessage} from '~Root/services/pubnub/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import Header from './Header';
import styles from './styles';
import Footer from './Footer';
import HeaderMessage from './HeaderMessage';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatConsumerScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const scrollAnim = new Animated.Value(0);
  const scrollRef = React.useRef(null);
  const offsetKeyboard = Platform.select({
    ios: 10,
    android: 0,
  });

  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const pubnubState = useSelector((state: IGlobalState) => state.pubnubState);

  const [messages, addMessage] = useState<HistoryMessage[]>([]);
  const [chatText, setChatText] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const {isIntroducer, introducer, introducee, ask, asker, data, showKudos} = chatState?.dataChat;

  useEffect(() => {
    if ((route.params as any)?.contextId) {
      dispatch(showLoading());
      dispatch(
        getChatAskContextRequest(route.params?.contextId, () => {
          dispatch(hideLoading());
        }),
      );
    }

    return () => {
      setChatText('');
      setLoadingMessage(true);
    };
  }, [route]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollToEnd({animated: true});
    }
  }, [scrollRef]);

  useEffect(() => {
    if (pubnub && chatState?.dataChat?.data?.attributes?.chat_uuid) {
      const promises = [];
      setLoadingMessage(true);
      if (pubnubState?.dataMessage && pubnubState?.dataMessage?.length > 0) {
        for (const item of pubnubState?.dataMessage) {
          promises.push(
            pubnub
              .publish({
                channel: chatState?.dataChat?.data?.attributes?.chat_uuid,
                message: {
                  ...item,
                  createdAt: new Date(),
                },
              })
              .then(() => console.log('insert pubnub done'))
              .catch(error => console.log(JSON.stringify(error))),
          );
        }
      }
      Promise.all(promises)
        .then(() => {
          dispatch(setPubnubMessage(null));
          pubnub.history(
            {
              channel: chatState?.dataChat?.data?.attributes?.chat_uuid,
              count: 100, // 100 is the default
              includeMeta: true,
            },
            (status, response) => {
              setLoadingMessage(false);
              if (response?.messages?.length > 0) {
                addMessage(response?.messages);
              }
            },
          );
        })
        .catch(error => console.log('error===>', error));
    }
  }, [chatState?.dataChat?.data?.attributes?.chat_uuid]);

  useEffect(() => {
    if (pubnub && chatState?.dataChat?.data?.attributes?.chat_uuid) {
      // using the `setMessages` function.
      const listener = {
        message: (envelope: any) => {
          addMessage((msgs: any) => [
            ...msgs,
            {
              entry: {
                id: envelope?.message?.id ?? new Date().getTime(),
                ...envelope?.message,
                createdAt: envelope?.message?.createdAt,
              },
              timetoken: envelope.timetoken,
            },
          ]);
        },
      };

      pubnub.addListener(listener);
      pubnub.subscribe({channels: [chatState?.dataChat?.data?.attributes?.chat_uuid]});

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
        addMessage([]);
      };
    }
  }, [pubnub, chatState?.dataChat?.data?.attributes?.chat_uuid]);

  const onFocus = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollToEnd({animated: true});
    }
  };

  const sendMessage = useCallback(() => {
    if (pubnub && chatText.trim() !== '') {
      if (chatState?.dataChat?.data?.attributes?.chat_box_type === 'asker_introducer') {
        pubnub
          .publish({
            channel: chatState?.dataChat?.data?.attributes?.chat_uuid,
            message: {
              text: chatText,
              askerId: +chatState?.dataChat?.asker?.id,
              userReceive:
                +chatState?.dataChat?.asker?.id === +userState?.userInfo?.id
                  ? +chatState?.dataChat?.introducer?.id
                  : +chatState?.dataChat?.asker?.id,
              introducerId: +chatState?.dataChat?.introducer?.id,
              senderId: userState?.userInfo?.id,
              createdAt: new Date(),
            },
          })
          .then(() => {
            setChatText('');
            const payload = {
              contextId: route.params?.contextId as string,
              lastMessage: {
                last_message_metadata: {
                  message: chatText,
                  sender_id: userState?.userInfo?.id,
                  read_by_user_id: userState?.userInfo?.id,
                },
              },
            };
            dispatch(
              onUpdateChatContextRequest(payload, () => {
                setChatText('');
              }),
            );
          })
          .catch(error => {
            setChatText('');
            console.log(JSON.stringify(error));
          });
      } else {
        pubnub
          .publish({
            channel: chatState?.dataChat?.data?.attributes?.chat_uuid,
            message: {
              text: chatText,
              introduceeId: +chatState?.dataChat?.introducee?.id,
              userReceive:
                +chatState?.dataChat?.introducee?.id === +userState?.userInfo?.id
                  ? +chatState?.dataChat?.introducer?.id
                  : +chatState?.dataChat?.introducee?.id,
              introducerId: +chatState?.dataChat?.introducer?.id,
              senderId: +userState?.userInfo?.id,
              createdAt: new Date(),
            },
          })
          .then(() => {
            setChatText('');
            const payload = {
              contextId: route.params?.contextId as string,
              lastMessage: {
                last_message_metadata: {
                  message: chatText,
                  sender_id: userState?.userInfo?.id,
                  read_by_user_id: userState?.userInfo?.id,
                },
              },
            };
            dispatch(
              onUpdateChatContextRequest(payload, () => {
                setChatText('');
              }),
            );
          })
          .catch(error => {
            setChatText('');
            console.log(JSON.stringify(error));
          });
      }
    }
  }, [chatState?.dataChat?.data?.attributes?.chat_uuid, chatText]);

  const onChangeText = (text: string) => {
    setChatText(text);
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onBack = () => {
    dispatch(resetDataChat());
    navigation.navigate(AppRoute.CHAT_NAVIGATOR);
  };

  const onMenu = (item: any, evt?: any) => {
    evt.persist();

    dispatch(
      setVisibleMenu({
        visibleMenu: {
          show: true,
          coordinate: {
            top: +evt.nativeEvent?.pageY + 15,
            left: evt.nativeEvent?.pageX - 210,
          },
        },
      }),
    );
  };

  const onMenuHide = () => {
    dispatch(
      setVisibleMenu({
        visibleMenu: {
          show: false,
          coordinate: {
            top: 0,
            left: 0,
          },
        },
      }),
    );
  };

  const onExtendDeadline = () => {
    onMenuHide();
    setVisibleDatePicker(true);
  };

  const onShowDatePicker = () => {
    setVisibleDatePicker(!visibleDatePicker);
  };

  const onChangeDatePicker = (date: Date) => {
    let currentDate = date || new Date();
    currentDate = dateWithMonthsDelay(currentDate, 0);

    if (currentDate && chatState?.dataChat?.data?.relationships?.ask?.data?.id) {
      onShowDatePicker();
      setLoading(true);
      dispatch(
        onExtendDeadlineRequest(
          {
            askId: chatState?.dataChat?.data?.relationships?.ask?.data?.id,
            deadline: convertLocalToUTC(currentDate),
          },
          (response: IActionOnUpdateExtendDeadlineSuccess['payload']) => {
            Toast.show({
              position: 'bottom',
              type: response.success ? 'success' : 'error',
              text1: response.success ? 'Successfully' : response.message,
              visibilityTime: 3000,
              autoHide: true,
            });
            dispatch(
              getChatAskContextRequest(route.params?.contextId, () => {
                setLoading(false);
              }),
            );
          },
        ),
      );
    }
  };

  const handleSubmit = () => {
    sendMessage();
  };

  const onEndAsk = () => {
    onMenuHide();
    navigation.navigate(AppRoute.CHAT_KUDOS, {askId: ask?.id});
  };

  if (loadingState.loading && loadingMessage) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <FastImage source={IMAGES.chatBg} style={GlobalStyles.bgContainer} resizeMode='stretch' />
      <SafeAreaView style={GlobalStyles.container} edges={['bottom']}>
        <View style={styles.headerContainer}>
          <HeaderChatContextBlue
            isBackButton={true}
            onBack={onBack}
            title={t('chat')}
            isRightButton={true}
            onRightPress={onToggleDrawer}
          />
        </View>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={offsetKeyboard}>
          <View style={GlobalStyles.container}>
            <View style={[GlobalStyles.mh15, styles.wrapper]}>
              <View style={[GlobalStyles.flexColumn, styles.userInfoContainer]}>
                <Header chatContext={ask} />
                <View
                  style={[
                    GlobalStyles.ph10,
                    GlobalStyles.alignCenter,
                    GlobalStyles.flexRow,
                    GlobalStyles.mb10,
                    styles.headerIntroduced,
                  ]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignEnd, GlobalStyles.mr5]}>
                    <Avatar
                      styleAvatar={GlobalStyles.avatar3}
                      styleContainerGradient={GlobalStyles.avatar3}
                      userInfo={{
                        avatar_url: introducer?.attributes?.avatar_metadata?.avatar_url,
                        avatar_lat: introducer?.attributes?.avatar_metadata?.avatar_lat,
                        avatar_lng: introducer?.attributes?.avatar_metadata?.avatar_lng,
                        first_name: introducer?.attributes?.first_name,
                        last_name: introducer?.attributes?.last_name,
                      }}
                    />
                    <FastImage source={IMAGES.iconProtect} resizeMode='cover' style={styles.iconProtect} />
                  </View>
                  {data?.attributes?.chat_box_type === 'asker_introducer' ? (
                    <>
                      <View style={[GlobalStyles.mt10, GlobalStyles.container, GlobalStyles.mr5]}>
                        <Trans
                          i18nKey='chat_introduced'
                          parent={Text}
                          values={{
                            name1: `${
                              isIntroducer
                                ? 'You'
                                : `${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`
                            }`,
                            name2: `${asker?.attributes?.first_name} ${asker?.attributes?.last_name}`,
                          }}
                          components={{
                            normal: <Text style={[styles.textBold]} />,
                            highlight: <Text style={[styles.textBlue]} />,
                          }}
                        />
                      </View>
                      <Avatar
                        styleAvatar={{...GlobalStyles.mt10, ...GlobalStyles.avatar4}}
                        styleContainerGradient={{...GlobalStyles.mt10, ...GlobalStyles.avatar4}}
                        textStyle={GlobalStyles.p}
                        userInfo={{
                          avatar_url: asker?.attributes?.avatar_metadata?.avatar_url,
                          avatar_lat: asker?.attributes?.avatar_metadata?.avatar_lat,
                          avatar_lng: asker?.attributes?.avatar_metadata?.avatar_lng,
                          first_name: asker?.attributes?.first_name,
                          last_name: asker?.attributes?.last_name,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <View style={[GlobalStyles.mt10, GlobalStyles.container, GlobalStyles.mr5]}>
                        <Trans
                          i18nKey='chat_introduced'
                          parent={Text}
                          values={{
                            name1: `${
                              isIntroducer
                                ? 'You'
                                : `${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`
                            }`,
                            name2: `${introducee?.attributes?.first_name} ${introducee?.attributes?.last_name}`,
                          }}
                          components={{
                            normal: <Text style={[styles.textBold]} />,
                            highlight: <Text style={[styles.textBlue]} />,
                          }}
                        />
                      </View>
                      <Avatar
                        styleAvatar={{...GlobalStyles.mt10, ...GlobalStyles.avatar4}}
                        styleContainerGradient={{...GlobalStyles.mt10, ...GlobalStyles.avatar4}}
                        textStyle={GlobalStyles.p}
                        userInfo={{
                          avatar_url: introducee?.attributes?.avatar_metadata?.avatar_url,
                          avatar_lat: introducee?.attributes?.avatar_metadata?.avatar_lat,
                          avatar_lng: introducee?.attributes?.avatar_metadata?.avatar_lng,
                          first_name: introducee?.attributes?.first_name,
                          last_name: introducee?.attributes?.last_name,
                        }}
                      />
                    </>
                  )}
                </View>
                <View style={[styles.contentContainer]}>
                  <ChatItem item={ask} onMenu={onMenu} />
                </View>
              </View>
            </View>
            <View style={[GlobalStyles.ph15, GlobalStyles.pt15, GlobalStyles.container]}>
              <Animated.FlatList
                horizontal={false}
                style={[GlobalStyles.container]}
                ref={scrollRef}
                contentContainerStyle={[
                  GlobalStyles.justifyEnd,
                  GlobalStyles.scrollViewFullScreen,
                  Platform.OS === 'android' && GlobalStyles.pt100,
                ]}
                contentInset={{top: adjust(150), left: 0, bottom: 0, right: 0}}
                nestedScrollEnabled={true}
                scrollEventThrottle={1}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({animated: true})}
                onLayout={() => scrollRef?.current?.scrollToEnd({animated: true})}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          y: scrollAnim,
                        },
                      },
                    },
                  ],
                  {useNativeDriver: true},
                )}
                showsVerticalScrollIndicator={false}
                data={messages}
                key={'tags'}
                keyExtractor={(item, index) => `message-${index}`}
                renderItem={({item}: {item: HistoryMessage}) => {
                  if (+item?.entry?.senderId === +userState?.userInfo?.id) {
                    return (
                      <View style={[GlobalStyles.p10, GlobalStyles.mb10, styles.chatBgSecond]}>
                        <Paragraph title={item?.entry?.text} />
                        {item?.entry?.createdAt && (
                          <View style={[GlobalStyles.alignEnd, GlobalStyles.mt10]}>
                            <Paragraph
                              textJetColor
                              title={moment(item?.entry?.createdAt).format('HH:mm a')}
                              style={styles.txtTime}
                            />
                          </View>
                        )}
                      </View>
                    );
                  }
                  if (data?.attributes?.chat_box_type === 'asker_introducer') {
                    return (
                      <View style={[GlobalStyles.p10, GlobalStyles.mb10, styles.chatBg]}>
                        <View
                          style={[GlobalStyles.flexRow, GlobalStyles.mb5, GlobalStyles.flexWrap, styles.headerName]}>
                          {+item?.entry?.senderId === +asker?.id ? (
                            <Paragraph
                              textJetColor
                              bold600
                              numberOfLines={1}
                              ellipsizeMode='tail'
                              title={`${asker?.attributes?.first_name} ${asker?.attributes?.last_name}`}
                              style={[GlobalStyles.mr5, styles.fontSmall]}
                            />
                          ) : (
                            <Paragraph
                              textJetColor
                              bold600
                              numberOfLines={1}
                              ellipsizeMode='tail'
                              title={`${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`}
                              style={[GlobalStyles.mr5, styles.fontSmall]}
                            />
                          )}
                          <FastImage
                            source={IMAGES.iconDoubleArrow}
                            style={[GlobalStyles.mr5, styles.iconDoubleArrow]}
                          />
                          <HeaderMessage {...chatState?.dataChat} message={item} />
                        </View>
                        <Paragraph title={item?.entry?.text} />
                        {item?.entry?.createdAt && (
                          <View style={[GlobalStyles.alignEnd, GlobalStyles.mt10]}>
                            <Paragraph
                              textJetColor
                              title={moment(item?.entry?.createdAt).format('HH:mm a')}
                              style={styles.txtTime}
                            />
                          </View>
                        )}
                      </View>
                    );
                  }

                  return (
                    <View style={[GlobalStyles.p10, GlobalStyles.mb10, styles.chatBg]}>
                      <View style={[GlobalStyles.flexRow, GlobalStyles.mb5, styles.headerName]}>
                        <Paragraph
                          textJetColor
                          bold600
                          numberOfLines={1}
                          ellipsizeMode='tail'
                          title={`${
                            isIntroducer
                              ? 'You'
                              : `${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`
                          }`}
                          style={[GlobalStyles.mr5, styles.fontSmall]}
                        />
                        <FastImage source={IMAGES.iconDoubleArrow} style={[GlobalStyles.mr5, styles.iconDoubleArrow]} />
                        <HeaderMessage {...chatState?.dataChat} message={item} />
                      </View>
                      <Paragraph title={item?.entry?.text} />
                      {item?.entry?.createdAt && (
                        <View style={[GlobalStyles.alignEnd, GlobalStyles.mt10]}>
                          <Paragraph
                            textJetColor
                            title={moment(item?.entry?.createdAt).format('HH:mm a')}
                            style={styles.txtTime}
                          />
                        </View>
                      )}
                    </View>
                  );
                }}
                onEndReachedThreshold={0.5}
              />
              {showKudos && (
                <View
                  style={[
                    GlobalStyles.flexRow,
                    GlobalStyles.p5,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mb15,
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
                      GlobalStyles.alignCenter,
                      GlobalStyles.container,
                      GlobalStyles.flexWrap,
                    ]}>
                    <Trans
                      i18nKey='kudos_message'
                      parent={Text}
                      values={{
                        name: `${asker?.attributes?.first_name} ${asker?.attributes?.last_name}`,
                      }}
                      components={{
                        bold: <Text style={[GlobalStyles.p, styles.kudosTextBold]} />,
                        normal: <Text style={[GlobalStyles.p, styles.kudosTextNormal]} />,
                      }}
                    />
                  </View>
                </View>
              )}
              <Footer chatContext={ask} />
            </View>
            <View style={[GlobalStyles.p15, GlobalStyles.flexRow]}>
              <TouchableOpacity
                style={[
                  GlobalStyles.mr10,
                  GlobalStyles.alignCenter,
                  GlobalStyles.justifyCenter,
                  styles.iconPlusContainer,
                ]}
                onPress={sendMessage}>
                <FastImage source={IMAGES.iconPlus} resizeMode='contain' style={styles.iconPlus} />
              </TouchableOpacity>
              <TextInput
                style={[GlobalStyles.container, GlobalStyles.ph10, GlobalStyles.pv8, styles.input]}
                onChangeText={onChangeText}
                onSubmitEditing={handleSubmit}
                value={chatText}
                onFocus={onFocus}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        {chatState?.visibleMenu?.show && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMenuHide}
            style={[GlobalStyles.flexColumn, GlobalStyles.container, styles.bgBlur]}>
            <View
              style={[
                GlobalStyles.flexColumn,
                GlobalStyles.pv10,
                GlobalStyles.ph20,
                styles.menu,
                {...chatState?.visibleMenu?.coordinate},
              ]}>
              <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                <View
                  style={[
                    GlobalStyles.justifyCenter,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mr5,
                    styles.iconChatWithContainer,
                  ]}>
                  <FastImage source={IMAGES.iconChatWith} resizeMode='contain' style={styles.iconChatWith} />
                </View>
                <Paragraph title={t('chat_with_responder')} />
              </TouchableOpacity>
              <View style={[GlobalStyles.justifyCenter, styles.border]} />
              {+chatState?.dataChat?.ask?.attributes?.deadline_change_count < 2 &&
              +chatState?.dataChat?.ask?.relationships?.user?.data?.id === +userState?.userInfo?.id &&
              (chatState?.dataChat?.ask?.attributes?.status === ASK_STATUS_ENUM.EXPIRED ||
                chatState?.dataChat?.ask?.attributes?.status === ASK_STATUS_ENUM.PUBLISHED) ? (
                <TouchableOpacity
                  style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}
                  onPress={onExtendDeadline}>
                  <View
                    style={[
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                      GlobalStyles.mr5,
                      styles.iconExtendDeadlineContainer,
                    ]}>
                    <FastImage
                      source={IMAGES.iconExtendDeadline}
                      resizeMode='cover'
                      style={styles.iconExtendDeadline}
                    />
                  </View>
                  <Paragraph title={t('extend_deadline')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                  <View
                    style={[
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                      GlobalStyles.mr5,
                      styles.iconExtendDeadlineContainer,
                    ]}>
                    <FastImage
                      source={IMAGES.iconExtendDeadlineGray}
                      resizeMode='cover'
                      style={styles.iconExtendDeadline}
                    />
                  </View>
                  <Paragraph textDarkGrayColor title={t('extend_deadline')} />
                </TouchableOpacity>
              )}
              <View style={[GlobalStyles.justifyCenter, styles.border]} />
              <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                <View
                  style={[
                    GlobalStyles.alignCenter,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mr5,
                    styles.iconArchiveContainer,
                  ]}>
                  <FastImage source={IMAGES.iconArchive} resizeMode='cover' style={styles.iconArchive} />
                </View>
                <Paragraph title={t('archive_this_ask')} />
              </TouchableOpacity>
              <View style={[GlobalStyles.justifyCenter, styles.border]} />
              {chatState?.dataChat?.ask?.attributes?.status === ASK_STATUS_ENUM.PUBLISHED &&
              +chatState?.dataChat?.ask?.relationships?.user?.data?.id === +userState?.userInfo?.id ? (
                <TouchableOpacity
                  style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}
                  onPress={onEndAsk}>
                  <View
                    style={[
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                      GlobalStyles.mr5,
                      styles.iconEndAskContainer,
                    ]}>
                    <FastImage source={IMAGES.iconEndAsk} resizeMode='cover' style={styles.iconEndAsk} />
                  </View>
                  <Paragraph title={t('end_this_ask')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                  <View
                    style={[
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                      GlobalStyles.mr5,
                      styles.iconEndAskContainer,
                    ]}>
                    <FastImage source={IMAGES.iconEndAskGray} resizeMode='cover' style={styles.iconEndAsk} />
                  </View>
                  <Paragraph textDarkGrayColor title={t('end_this_ask')} />
                </TouchableOpacity>
              )}
              <View style={[GlobalStyles.justifyCenter, styles.border]} />
              <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                <View
                  style={[
                    GlobalStyles.alignCenter,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mr5,
                    styles.iconEndAskContainer,
                  ]}>
                  <FastImage source={IMAGES.iconEndAsk} resizeMode='cover' style={styles.iconEndAsk} />
                </View>
                <Paragraph title={t('report')} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        <DateTimePickerModal
          key={`template-date`}
          isVisible={visibleDatePicker}
          mode='datetime'
          onConfirm={(date: Date) => onChangeDatePicker(date)}
          onCancel={onShowDatePicker}
        />
      </SafeAreaView>
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default ChatConsumerScreen;
