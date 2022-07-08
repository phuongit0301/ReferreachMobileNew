import React, {useEffect, useState} from 'react';
import {View, Animated, ActivityIndicator, TouchableOpacity, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {usePubNub} from 'pubnub-react';
import {t} from 'i18next';

import {MainNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {GlobalStyles, IMAGES} from '~Root/config';
import {HeaderChatBlue, ListItemsChat, Paragraph} from '~Root/components';
import {IListMatches} from '~Root/services/chat/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import styles from './styles';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatScreen = ({navigation}: Props) => {
  const pubnub = usePubNub();

  const [channels] = useState(['Channel-m0587v8b7']);
  const [messages, addMessage] = useState<string[]>([]);
  const chatState = useSelector((state: IGlobalState) => state.chatState);

  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});
  }, [pubnub, channels]);

  const handleMessage = (event: any) => {
    const message = event.message;
    // eslint-disable-next-line no-prototype-builtins
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      addMessage(prev => [...prev, text]);
    }
  };

  const scrollAnim = new Animated.Value(0);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onItemClick = () => {
    navigation.navigate(AppRoute.CHAT);
  };

  const sendMessage = () => {
    const message = 'Hello World';
    pubnub.publish({channel: channels[0], message}).then(() => console.log('send message'));
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
            <TouchableOpacity style={[GlobalStyles.p10, GlobalStyles.ml10, styles.iconSearchContainer]}>
              <FastImage source={IMAGES.iconSearchBlack} resizeMode='cover' style={styles.iconSearch} />
            </TouchableOpacity>
          )}
          renderItem={({item}: {item: IListMatches}) => (
            <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.ml10, styles.itemContainer]}>
              <FastImage
                source={{
                  uri: item?.image,
                }}
                resizeMode='cover'
                onProgress={() => <ActivityIndicator />}
                style={[GlobalStyles.mr3, styles.avatar]}
              />
              <Paragraph textCenter numberOfLines={2} ellipsizeMode='tail' title={item?.name} style={styles.name} />
            </View>
          )}
          // onEndReached={onPageChanged}
          // onEndReachedThreshold={0.5}
        />
      </HeaderChatBlue>
      <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.pt30, styles.container]}>
        <ListItemsChat data={chatState?.peopleToAsks} onItemClick={onItemClick} />
      </View>
      <Button onPress={sendMessage} title='Send Message' />
    </View>
  );
};

export default ChatScreen;
