import React, { useState } from 'react';
import {View, Animated, RefreshControl, ActivityIndicator, Touchable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {t} from 'i18next';
import FastImage from 'react-native-fast-image';

import {MainNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {HeaderChatBlue, ListItemsChat, Paragraph} from '~Root/components';
import styles from './styles';

import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import { IListMatches } from '~Root/services/chat/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatScreen = ({navigation}: Props) => {
  const chatState = useSelector((state: IGlobalState) => state.chatState);


  const scrollAnim = new Animated.Value(0);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onItemClick = () => {
    navigation.navigate(AppRoute.CHAT);
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
    </View>
  );
};

export default ChatScreen;
