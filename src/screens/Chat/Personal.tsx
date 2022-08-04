import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Animated, RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Loading, Paragraph} from '~Root/components';
import ListItemChatPersonal from '~Root/components/ListItemChatPersonal';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {getChatPersonalRequest} from '~Root/services/chat/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {IGlobalState} from '~Root/types';
import styles from './styles';

interface Params {
  tabLabel?: string;
}

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const PersonalScreen: React.FC<Props & Params> = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollAnim = new Animated.Value(0);

  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showLoading());
      dispatch(
        getChatPersonalRequest({search_user: '123'}, () => {
          dispatch(hideLoading());
        }),
      );
    }, [navigation]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      getChatPersonalRequest({search_user: '123'}, () => {
        setRefreshing(false);
      }),
    );
  };

  const onItemClick = (item: any) => {
    navigation.navigate(AppRoute.CHAT_PERSONAL, {contextId: item?.id});
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.container, styles.container]}>
      <Animated.FlatList
        contentContainerStyle={styles.contentContainer}
        style={GlobalStyles.mt15}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            colors={[BASE_COLORS.primary]}
            tintColor={BASE_COLORS.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
        data={chatState?.dataChatPersonal?.data}
        key={'air-feed'}
        keyExtractor={(item, index) => `air-feed-item-${index}`}
        renderItem={({item, index}: {item: any; index: number}) => (
          <ListItemChatPersonal
            item={item}
            index={index}
            dataChatPersonal={chatState?.dataChatPersonal}
            onPress={onItemClick}
          />
        )}
        ListEmptyComponent={() => (
          <View
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.center,
              GlobalStyles.mt15,
              GlobalStyles.pv15,
              GlobalStyles.ph20,
            ]}>
            <Paragraph textCenter title='Start a personal chat with your friend in your Trust network' />
          </View>
        )}
      />
    </View>
  );
};

export default PersonalScreen;
