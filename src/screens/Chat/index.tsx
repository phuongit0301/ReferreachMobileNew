import React, {useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
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

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const scrollAnim = new Animated.Value(0);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onSearch = () => {
    navigation.navigate(AppRoute.CHAT_KUDOS);
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

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <HeaderChatBlue title={t('chat')} isRightButton={true} onRightPress={onToggleDrawer}>
        <Animated.FlatList
          contentContainerStyle={GlobalStyles.mt30}
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
          ListHeaderComponent={() => (
            <TouchableOpacity
              style={[GlobalStyles.p10, GlobalStyles.ml10, styles.iconSearchContainer]}
              onPress={onSearch}>
              <FastImage source={IMAGES.iconSearchBlack} resizeMode='cover' style={styles.iconSearch} />
            </TouchableOpacity>
          )}
          renderItem={({item}: {item: IUserChatList}) => (
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
          )}
        />
      </HeaderChatBlue>
      <ScrollableTabView initialPage={0} renderTabBar={() => <TabBar />}>
        <AskScreen tabLabel='Asks' navigation={navigation} route={route} />
        <PersonalScreen tabLabel='Personal' navigation={navigation} route={route} />
      </ScrollableTabView>
    </View>
  );
};

export default ChatScreen;
