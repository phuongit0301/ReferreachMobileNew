import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps, useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Animated, RefreshControl, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {Loading, LoadingSecondary, Paragraph} from '~Root/components';
import ListItemChatPersonal from '~Root/components/ListItemChatPersonal';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {getChatPersonalRequest, onPinRequest, onUnPinRequest} from '~Root/services/chat/actions';
import {PinnableTypeEnum, IActionOnPinSuccess, IActionOnUnPinSuccess} from '~Root/services/chat/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {IGlobalState} from '~Root/types';
import styles from './styles';

interface Params {
  tabLabel?: string;
  textSearch?: string;
  visibleModal: boolean;
}

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const PersonalScreen: React.FC<Props & Params> = ({navigation, textSearch, visibleModal = false}) => {
  const dispatch = useDispatch();
  const scrollAnim = new Animated.Value(0);

  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showLoading());
      dispatch(
        getChatPersonalRequest(
          {search_user_id: textSearch, personalPer: chatState?.personalPer, personalPage: chatState?.personalPage},
          () => {
            dispatch(hideLoading());
          },
        ),
      );
    }, [navigation, textSearch]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      getChatPersonalRequest(
        {search_user_id: textSearch, personalPer: chatState?.personalPer, personalPage: chatState?.personalPage},
        () => {
          setRefreshing(false);
        },
      ),
    );
  };

  const onItemClick = (item: any) => {
    navigation.navigate(AppRoute.CHAT_PERSONAL, {contextId: item?.id});
  };

  const onPin = (id: string, index: number) => {
    setLoading(true);
    dispatch(
      onPinRequest(
        {pinnable_id: id, pinnable_type: PinnableTypeEnum.CHAT_CONTEXT, index},
        (response: IActionOnPinSuccess['payload']) => {
          dispatch(
            getChatPersonalRequest(
              {search_user_id: textSearch, personalPer: chatState?.personalPer, personalPage: chatState?.personalPage},
              () => {
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
        },
      ),
    );
  };

  const onUnPin = (id: string, index: number) => {
    setLoading(true);
    dispatch(
      onUnPinRequest(
        {pinnable_id: id, pinnable_type: PinnableTypeEnum.CHAT_CONTEXT, index},
        (response: IActionOnUnPinSuccess['payload']) => {
          dispatch(
            getChatPersonalRequest(
              {search_user_id: textSearch, personalPer: chatState?.personalPer, personalPage: chatState?.personalPage},
              () => {
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
        },
      ),
    );
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
            onPin={onPin}
            onUnPin={onUnPin}
            userState={userState}
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
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default PersonalScreen;
