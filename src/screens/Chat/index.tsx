import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';
import Modal from 'react-native-modal';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {IUserChatList} from '~Root/services/chat/types';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {getUserChatListRequested, onChatOneOnOneRequest, setUserChatList} from '~Root/services/chat/actions';
import {getCredential} from '~Root/services/pubnub/actions';
import {Avatar, HeaderChatBlue, KeyboardShift, LoadingSecondary, Paragraph} from '~Root/components';
import {IGlobalState} from '~Root/types';
import TabBar from './TabBar';
import AskScreen from './Asks';
import PersonalScreen from './Personal';
import styles from './styles';

const {width} = Dimensions.get('window');

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState({
    expanded: false,
    opacity: new Animated.Value(0),
    width: new Animated.Value(0),
    visibleModal: false,
  });
  const offset = useSharedValue(45);
  const opacity = useSharedValue(0);

  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [user, setUser] = useState(null);

  const scrollAnim = new Animated.Value(0);
  const searchRef = useRef(null);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: offset.value,
    };
  }, [offset]);

  const animatedOpacityStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity]);

  useEffect(() => {
    if (animation?.visibleModal) {
      if (textSearch) {
        dispatch(
          getUserChatListRequested(textSearch, () => {
            setLoading(false);
          }),
        );
      } else {
        dispatch(setUserChatList());
      }
    }
  }, [textSearch, animation?.visibleModal]);

  const onSearch = () => {
    offset.value = width - 30;
    opacity.value = 1;
    setAnimation({...animation, visibleModal: true, expanded: true});
  };

  const onClose = () => {
    offset.value = 45;
    opacity.value = 0;
    setAnimation({...animation, visibleModal: false, expanded: false});
    setTextSearch('');
    setUser(null);
  };

  const onSearchPress = (item: any) => {
    setUser(item);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    setTextSearch(`${item?.attributes?.first_name} ${item?.attributes?.last_name}`);
    offset.value = width - 30;
    opacity.value = 1;
    setAnimation({...animation, visibleModal: false, expanded: true});
  };

  const onChatOneOnOne = (userId: string) => {
    if (userId) {
      const payload = {
        member_id: userId,
      };

      setLoading(true);
      dispatch(
        onChatOneOnOneRequest(payload, (response: any) => {
          dispatch(
            getCredential(() => {
              setLoading(false);
              if (response.success) {
                navigation.navigate(AppRoute.CHAT_PERSONAL, {contextId: response?.data.id});
              }
            }),
          );
        }),
      );
    }
  };

  const onChangeText = (text: string) => {
    setTextSearch(text);
  };

  return (
    <KeyboardShift>
      <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
        <HeaderChatBlue
          title={t('chat')}
          isRightButton={true}
          onRightPress={onToggleDrawer}
          styleContainer={animation?.visibleModal ? styles.styleContainer : styles.container}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.container, styles.headerContainer]}>
            <TouchableOpacity ref={searchRef} onPress={onSearch} disabled={animation?.expanded}>
              <Animated.View
                style={[
                  user && animation?.expanded && GlobalStyles.ph2,
                  GlobalStyles.flexRow,
                  GlobalStyles.alignCenter,
                  styles.iconSearchContainer,
                  animatedStyles,
                ]}>
                {!animation?.expanded && (
                  <View
                    style={[
                      GlobalStyles.pv10,
                      GlobalStyles.container,
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                    ]}>
                    <FastImage source={IMAGES.iconSearchBlack} resizeMode='cover' style={styles.iconSearch} />
                  </View>
                )}
                {user && animation?.expanded && (
                  <Avatar
                    styleAvatar={{...GlobalStyles.mr3, ...styles.avatar}}
                    styleContainerGradient={{...GlobalStyles.mr3, ...styles.avatar}}
                    textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                    userInfo={{
                      avatar_url: user?.attributes?.avatar_metadata?.avatar_url,
                      avatar_lat: user?.attributes?.avatar_metadata?.avatar_lat,
                      avatar_lng: user?.attributes?.avatar_metadata?.avatar_lng,
                      first_name: user?.attributes?.first_name,
                      last_name: user?.attributes?.last_name,
                    }}
                  />
                )}
                {animation?.expanded && (
                  <TextInput
                    onChangeText={onChangeText}
                    value={textSearch}
                    style={[
                      GlobalStyles.ml10,
                      GlobalStyles.pv5,
                      GlobalStyles.container,
                      Platform.OS === 'ios' && GlobalStyles.pv10,
                    ]}
                    placeholder='Search user'
                    placeholderTextColor={BASE_COLORS.darkGray}
                  />
                )}
                {animation?.expanded && (
                  <Animated.View style={[GlobalStyles.mr10]}>
                    <TouchableOpacity onPress={onClose}>
                      <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </Animated.View>
            </TouchableOpacity>
            {!animation?.expanded && (
              <Animated.FlatList
                style={GlobalStyles.container}
                contentContainerStyle={[GlobalStyles.pl5, GlobalStyles.pr30]}
                scrollEventThrottle={1}
                horizontal
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
                showsHorizontalScrollIndicator={false}
                data={chatState?.listMatches}
                key={'chat-matched-list'}
                keyExtractor={(item, index) => `chat-matched-${item.id}-${index}`}
                renderItem={({item}: {item: IUserChatList}) => {
                  return (
                    <TouchableOpacity
                      style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.ml10, styles.itemContainer]}
                      onPress={() => onSearchPress(item)}>
                      <Avatar
                        styleAvatar={{...GlobalStyles.mr3, ...styles.avatar}}
                        styleContainerGradient={{...GlobalStyles.mr3, ...styles.avatar}}
                        textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                        userInfo={{
                          avatar_url: item?.attributes?.avatar_metadata?.avatar_url,
                          avatar_lat: item?.attributes?.avatar_metadata?.avatar_lat,
                          avatar_lng: item?.attributes?.avatar_metadata?.avatar_lng,
                          first_name: item?.attributes?.first_name,
                          last_name: item?.attributes?.last_name,
                        }}
                      />
                      <Paragraph
                        textCenter
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        title={`${item?.attributes?.first_name} ${item?.attributes?.last_name}`}
                        style={styles.name}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </HeaderChatBlue>
        <ScrollableTabView initialPage={0} renderTabBar={() => <TabBar />}>
          <AskScreen
            tabLabel='Asks'
            navigation={navigation}
            route={route}
            textSearch={user ? user?.id : null}
            visibleModal={animation?.visibleModal}
          />
          <PersonalScreen
            tabLabel='Personal'
            navigation={navigation}
            route={route}
            textSearch={user ? user?.id : null}
            visibleModal={animation?.visibleModal}
          />
        </ScrollableTabView>
        {loading ? (
          <LoadingSecondary />
        ) : (
          <Modal
            isVisible={animation.visibleModal}
            style={styles.modal}
            hasBackdrop={false}
            coverScreen={false}
            avoidKeyboard={true}>
            <View style={styles.modalContent}>
              <Animated.FlatList
                scrollEventThrottle={1}
                horizontal={false}
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
                showsHorizontalScrollIndicator={false}
                data={chatState?.listMatchesSearch}
                key={'chat-matched-list-1'}
                keyExtractor={(item, index) => `chat-matched-1-${item.id}-${index}`}
                ItemSeparatorComponent={() => <View style={styles.border} />}
                ListEmptyComponent={() =>
                  textSearch ? (
                    <View
                      style={[GlobalStyles.container, GlobalStyles.ph30, GlobalStyles.alignCenter, GlobalStyles.mt15]}>
                      <Paragraph textCenter p title='There are no Users that matches your search.' />
                    </View>
                  ) : null
                }
                renderItem={({item}: {item: IUserChatList}) => {
                  return (
                    <TouchableOpacity
                      style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv10, GlobalStyles.ph20]}
                      onPress={() => onSearchPress(item)}>
                      <Avatar
                        styleAvatar={{...GlobalStyles.mr10, ...styles.avatar1}}
                        styleContainerGradient={{...GlobalStyles.mr10, ...styles.avatar1}}
                        textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                        userInfo={{
                          avatar_url: item?.attributes?.avatar_metadata?.avatar_url,
                          avatar_lat: item?.attributes?.avatar_metadata?.avatar_lat,
                          avatar_lng: item?.attributes?.avatar_metadata?.avatar_lng,
                          first_name: item?.attributes?.first_name,
                          last_name: item?.attributes?.last_name,
                        }}
                      />
                      <View style={GlobalStyles.flexColumn}>
                        <Paragraph
                          textCenter
                          bold700
                          title={`${item?.attributes?.first_name} ${item?.attributes?.last_name}`}
                          style={GlobalStyles.mb5}
                        />
                        <Paragraph textDarkGrayColor title={`Just now`} />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Modal>
        )}
      </View>
    </KeyboardShift>
  );
};

export default ChatScreen;
