/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Trans, useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CompositeScreenProps} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {usePubNub} from 'pubnub-react';
import {HistoryMessage} from 'pubnub';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {getChatAskContextRequest, onUpdateChatContextRequest, setVisibleMenu} from '~Root/services/chat/actions';
import {IIncluded} from '~Root/services/chat/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {Paragraph, HeaderChatContextBlue, Loading, ChatItem, LoadingSecondary, Avatar} from '~Root/components';
import {calculateExpiredTime, dateFormat3, dateWithMonthsDelay} from '~Root/utils';
import {AppRoute} from '~Root/navigation/AppRoute';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {IActionOnUpdateExtendDeadlineSuccess} from '~Root/services/ask/types';
import {onExtendDeadlineRequest} from '~Root/services/ask/actions';
import Toast from 'react-native-toast-message';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatConsumerScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const scrollAnim = new Animated.Value(0);

  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const userState = useSelector((state: IGlobalState) => state.userState);

  const [channels, setChannels] = useState<any>();
  const [messages, addMessage] = useState<HistoryMessage[]>([]);
  const [chatText, setChatText] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((route.params as any)?.contextId) {
      dispatch(showLoading());
      dispatch(
        getChatAskContextRequest(route.params?.contextId, () => {
          dispatch(hideLoading());
        }),
      );
    }
  }, [route]);

  useEffect(() => {
    if (pubnub && chatState?.dataChat?.data?.attributes?.chat_uuid) {
      pubnub.history(
        {
          channel: chatState?.dataChat?.data?.attributes?.chat_uuid,
          count: 100, // 100 is the default
          includeMeta: true,
        },
        (status, response) => {
          if (response?.messages?.length > 0) {
            addMessage(response?.messages);
          }
        },
      );
      setChannels([chatState?.dataChat?.data?.attributes?.chat_uuid]);
    }
  }, [pubnub, chatState?.dataChat]);

  useEffect(() => {
    if (pubnub && channels) {
      // using the `setMessages` function.
      const listener = {
        message: (envelope: any) => {
          addMessage((msgs: any) => [
            ...msgs,
            {
              entry: {
                id: envelope?.message?.id ?? new Date().getTime(),
                userId: envelope?.message?.userId,
                text: envelope?.message?.text,
                fullName1:
                  envelope?.message?.fullName1 ??
                  `${userState?.userInfo?.first_name} ${userState?.userInfo?.last_name}`,
                fullName2: '',
                createdAt: envelope?.message?.createdAt,
              },
              timetoken: envelope.timetoken,
            },
          ]);
        },
      };

      pubnub.addListener(listener);
      pubnub.subscribe({channels});

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
        addMessage([]);
        setChannels('');
        setChatText('');
      };
    }
  }, [pubnub, channels]);

  const sendMessage = useCallback(() => {
    pubnub
      .publish({channel: channels[0], message: {text: chatText, userId: userState?.userInfo?.id}})
      .then(() => {
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
  }, [channels, chatText]);

  const onChangeText = (text: string) => {
    setChatText(text);
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onBack = () => {
    navigation.goBack();
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
            deadline: dateFormat3(currentDate),
          },
          (response: IActionOnUpdateExtendDeadlineSuccess['payload']) => {
            setLoading(false);

            Toast.show({
              position: 'bottom',
              type: response.success ? 'success' : 'error',
              text1: response.success ? 'Successfully' : response.message,
              visibilityTime: 3000,
              autoHide: true,
            });
          },
        ),
      );
    }
  };

  const handleSubmit = () => {
    if (chatText.trim() !== '') {
      sendMessage();
    }
  };

  if (loadingState.loading) {
    return <Loading />;
  }

  let introducer: IIncluded | null = null;
  let introducee: IIncluded | null = null;
  let dataChatContext: any | null = null;

  if (chatState?.dataChat?.data?.relationships?.members && chatState?.dataChat?.included.length > 0) {
    introducer = chatState?.dataChat?.included[0];
  }

  if (chatState?.dataChat?.data?.relationships?.members && chatState?.dataChat?.included.length > 1) {
    introducee = chatState?.dataChat?.included[1];
  }

  if (chatState?.dataChat?.data?.relationships?.chat_contextable && chatState?.dataChat?.included.length > 2) {
    dataChatContext = chatState?.dataChat?.included[2];
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <FastImage source={IMAGES.chatBg} style={GlobalStyles.bgContainer} resizeMode='contain' />
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
        <View style={GlobalStyles.container}>
          <View style={[GlobalStyles.mh15, styles.wrapper]}>
            <View style={[GlobalStyles.flexColumn, styles.userInfoContainer]}>
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
                <View style={[GlobalStyles.mt10, GlobalStyles.container, GlobalStyles.mr5]}>
                  <Trans
                    i18nKey='chat_introduced'
                    parent={Text}
                    values={{
                      name1: `${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`,
                      name2: `${introducee?.attributes?.first_name} ${introducee?.attributes?.last_name}`,
                    }}
                    components={{
                      normal: <Text style={[styles.textNormal]} />,
                      highlight: <Text style={[styles.textBlue]} />,
                    }}
                  />
                </View>
                <FastImage
                  source={{uri: introducee?.attributes?.avatar_metadata?.avatar_url}}
                  resizeMode='cover'
                  style={[GlobalStyles.mt10, GlobalStyles.avatar4]}
                />
              </View>
              <View style={[styles.contentContainer]}>
                <ChatItem item={dataChatContext} onMenu={onMenu} />
              </View>
            </View>
          </View>
          <View style={[GlobalStyles.p15, GlobalStyles.container]}>
            <Animated.FlatList
              horizontal={false}
              style={GlobalStyles.container}
              contentContainerStyle={[GlobalStyles.justifyEnd, GlobalStyles.scrollViewFullScreen]}
              nestedScrollEnabled={true}
              scrollEventThrottle={1}
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
                if (item?.entry?.userId === userState?.userInfo?.id) {
                  return (
                    <View style={[GlobalStyles.p10, GlobalStyles.mb10, GlobalStyles.alignSelfStart, styles.chatBg]}>
                      <View style={[GlobalStyles.flexRow, GlobalStyles.mb5, styles.headerName]}>
                        <Paragraph
                          textDarkGrayColor
                          bold600
                          numberOfLines={1}
                          ellipsizeMode='tail'
                          title={`${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`}
                          style={[GlobalStyles.mr5, styles.fontSmall]}
                        />
                        <FastImage source={IMAGES.iconDoubleArrow} style={[GlobalStyles.mr5, styles.iconDoubleArrow]} />
                        <Paragraph
                          textDarkGrayColor
                          bold600
                          numberOfLines={1}
                          ellipsizeMode='tail'
                          title={`${introducee?.attributes?.first_name} ${introducee?.attributes?.last_name}`}
                          style={styles.fontSmall}
                        />
                      </View>
                      <Paragraph title={item?.entry?.text} />
                    </View>
                  );
                }
                return (
                  <View style={[GlobalStyles.p10, GlobalStyles.mb10, styles.chatBgSecond]}>
                    <Paragraph title={item?.entry?.text} />
                  </View>
                );
              }}
              onEndReachedThreshold={0.5}
            />
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
            />
          </View>
        </View>
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
              {parseInt(`${calculateExpiredTime(dataChatContext?.attributes?.created_at)}`, 10) > 0 ? (
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
              {parseInt(`${calculateExpiredTime(dataChatContext?.attributes?.created_at)}`, 10) > 0 ? (
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
