import React, {useRef, useState} from 'react';
import {Animated, Dimensions, Easing, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {IUserChatList} from '~Root/services/chat/types';
import {GlobalStyles, IMAGES} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {onChatOneOnOneRequest} from '~Root/services/chat/actions';
import {getCredential} from '~Root/services/pubnub/actions';
import {Avatar, HeaderChatBlue, Paragraph} from '~Root/components';
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
  });

  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  const scrollAnim = new Animated.Value(0);
  const searchRef = useRef(null);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onSearch = () => {
    Animated.timing(animation?.opacity, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation?.opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    });

    setAnimation({...animation, expanded: !animation?.expanded});
    !animation?.expanded && setTextSearch('');
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

  const opacity = animation.opacity.interpolate({
    inputRange: [0, 1],
    outputRange: animation?.expanded ? [0, 1] : [1, 0],
  });

  const buttonTranslationX = animation.width.interpolate({
    inputRange: animation?.expanded ? [45, width - 65] : [0, 45],
    outputRange: animation?.expanded ? [width - 65, 45] : [45, 0],
  });

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <HeaderChatBlue title={t('chat')} isRightButton={true} onRightPress={onToggleDrawer}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.container]}>
          <TouchableOpacity ref={searchRef} onPress={onSearch} disabled={animation?.expanded}>
            <Animated.View
              style={[
                GlobalStyles.ph10,
                GlobalStyles.ml10,
                GlobalStyles.flexRow,
                GlobalStyles.alignCenter,
                styles.iconSearchContainer,
                {
                  width: buttonTranslationX,
                },
              ]}>
              <FastImage source={IMAGES.iconSearchBlack} resizeMode='cover' style={styles.iconSearch} />
              <TextInput
                onChangeText={onChangeText}
                value={textSearch}
                style={[GlobalStyles.ml10, GlobalStyles.mr20, GlobalStyles.pv10, GlobalStyles.container]}
              />
              {animation?.expanded && (
                <Animated.View style={{opacity: opacity}}>
                  <TouchableOpacity onPress={onSearch}>
                    <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>
          </TouchableOpacity>
          {!animation?.expanded && (
            <Animated.FlatList
              // contentContainerStyle={GlobalStyles.mt30}
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
              // ListHeaderComponent={() => (
              //   <TouchableOpacity
              //     style={[GlobalStyles.p10, GlobalStyles.ml10, styles.iconSearchContainer]}
              //     onPress={onSearch}>
              //     <FastImage source={IMAGES.iconSearchBlack} resizeMode='cover' style={styles.iconSearch} />
              //   </TouchableOpacity>
              // )}
              renderItem={({item}: {item: IUserChatList}) => {
                return (
                  <TouchableOpacity
                    style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.ml10, styles.itemContainer]}
                    onPress={() => onChatOneOnOne(item?.id)}>
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
        <AskScreen tabLabel='Asks' navigation={navigation} route={route} />
        <PersonalScreen tabLabel='Personal' navigation={navigation} route={route} />
      </ScrollableTabView>
    </View>
  );
};

export default ChatScreen;
