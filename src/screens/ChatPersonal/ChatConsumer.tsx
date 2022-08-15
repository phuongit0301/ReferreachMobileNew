/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Dimensions, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CompositeScreenProps} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {usePubNub} from 'pubnub-react';
import {HistoryMessage} from 'pubnub';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {getChatContextRequest, onUpdateChatContextRequest} from '~Root/services/chat/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {Paragraph, HeaderChatContextBlue, Loading, LoadingSecondary} from '~Root/components';
import {AppRoute} from '~Root/navigation/AppRoute';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import moment from 'moment';
import { adjust } from '~Root/utils';

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
    android: 40,
  });

  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const userState = useSelector((state: IGlobalState) => state.userState);

  const [channels, setChannels] = useState<any>();
  const [messages, addMessage] = useState<HistoryMessage[]>([]);
  const [chatText, setChatText] = useState('');
  const [loading] = useState(false);
  const [messageLoading, setMesageLoading] = useState(true);

  useEffect(() => {
    if ((route.params as any)?.contextId) {
      dispatch(showLoading());
      dispatch(
        getChatContextRequest(route.params?.contextId, () => {
          dispatch(hideLoading());
        }),
      );
    }
  }, [route]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollToEnd({animated: true});
    }
  }, [scrollRef]);

  useEffect(() => {
    if (pubnub && chatState?.dataChatPersonalSelected?.data?.attributes?.chat_uuid) {
      pubnub.history(
        {
          channel: chatState?.dataChatPersonalSelected?.data?.attributes?.chat_uuid,
          count: 100, // 100 is the default
          includeMeta: true,
        },
        (status, response) => {
          setMesageLoading(false);
          if (response?.messages?.length > 0) {
            addMessage(response?.messages);
          }
        },
      );
      setChannels([chatState?.dataChatPersonalSelected?.data?.attributes?.chat_uuid]);
    }
  }, [pubnub, chatState?.dataChatPersonalSelected]);

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
                fullName2:
                  envelope?.message?.fullName2 ??
                  `${chatState?.dataChatPersonalSelected?.userReceive?.attributes?.first_name} ${chatState?.dataChatPersonalSelected?.userReceive?.attributes?.last_name}`,
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

  const onFocus = () => {
    if (scrollRef.current) {
      scrollRef.current?.scrollToEnd({animated: true});
    }
  };

  const sendMessage = useCallback(() => {
    if (channels && channels?.length > 0 && chatText?.trim() !== '') {
      pubnub
        .publish({
          channel: channels[0],
          message: {
            text: chatText,
            userId: userState?.userInfo?.id,
            fullName1: `${userState?.userInfo?.first_name} ${userState?.userInfo?.last_name}`,
            fullName2: `${chatState?.dataChatPersonalSelected?.userReceive?.attributes?.first_name} ${chatState?.dataChatPersonalSelected?.userReceive?.attributes?.last_name}`,
            createdAt: new Date(),
          },
          storeInHistory: true,
        })
        .then(() => {
          setChatText('');
          const payload = {
            contextId: chatState?.dataChatPersonalSelected?.data?.id,
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

  const handleSubmit = () => {
    sendMessage();
  };

  if (loadingState.loading || messageLoading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <FastImage source={IMAGES.chatBg} style={GlobalStyles.bgContainer} resizeMode='stretch' />
      <SafeAreaView style={GlobalStyles.container} edges={['bottom']}>
        <View style={[styles.headerContainer]}>
          <HeaderChatContextBlue
            isBackButton={true}
            onBack={onBack}
            title={t('chat')}
            isRightButton={true}
            onRightPress={onToggleDrawer}
            containerHeaderStyle={{...GlobalStyles.alignCenter, ...GlobalStyles.mt0}}
          />
        </View>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <View style={GlobalStyles.container}>
            <View style={[GlobalStyles.ph15, GlobalStyles.container]}>
              <Animated.FlatList
                style={GlobalStyles.container}
                ref={scrollRef}
                contentContainerStyle={[GlobalStyles.justifyEnd, GlobalStyles.scrollViewFullScreen]}
                contentInset={{top: adjust(30), left: 0, bottom: 0, right: 0}}
                scrollEnabled={true}
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
                key={'message-personal'}
                keyExtractor={(item, index) => `message-personal-${index}`}
                renderItem={({item}: {item: HistoryMessage}) => {
                  if (item?.entry?.userId !== userState?.userInfo?.id) {
                    return (
                      <View style={[GlobalStyles.p10, GlobalStyles.mb10, styles.chatBg]}>
                        {item.entry?.fullName1 && (
                          <View style={[GlobalStyles.flexRow, GlobalStyles.mb5, styles.headerName]}>
                            <Paragraph
                              textDarkGrayColor
                              bold600
                              numberOfLines={1}
                              ellipsizeMode='tail'
                              title={item.entry?.fullName1}
                              style={[GlobalStyles.mr5, styles.fontSmall]}
                            />
                          </View>
                        )}
                        <Paragraph title={item?.entry?.text} style={styles.chatContentArea} />
                        {item?.entry?.createdAt && (
                          <View style={[GlobalStyles.mt10]}>
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
                    <View style={[GlobalStyles.p10, GlobalStyles.mb10, styles.chatBgSecond]}>
                      <Paragraph textJetColor title={item?.entry?.text} style={styles.chatContentArea} />
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
            </View>
            <View style={[GlobalStyles.alignCenter, GlobalStyles.p15, GlobalStyles.flexRow]}>
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
      </SafeAreaView>
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default ChatConsumerScreen;
