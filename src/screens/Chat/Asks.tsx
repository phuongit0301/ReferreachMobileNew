import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {GlobalStyles} from '~Root/config';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {getChatFeedRequest, onPinRequest, onUnPinRequest} from '~Root/services/chat/actions';
import {ListItemsChat, Loading, LoadingSecondary, Paragraph} from '~Root/components';
import {
  IActionOnPinSuccess,
  IActionOnUnPinSuccess,
  IPaginationAndSearch,
  PinnableTypeEnum,
} from '~Root/services/chat/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import Toast from 'react-native-toast-message';
import {getCredential} from '~Root/services/pubnub/actions';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

interface Params {
  tabLabel?: string;
  textSearch?: string;
  visibleModal?: boolean;
}

const AskScreen = ({navigation, textSearch, visibleModal = false}: Props & Params) => {
  const dispatch = useDispatch();

  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!visibleModal) {
      fetchData();
    }
  }, [textSearch, visibleModal]);

  const fetchData = () => {
    const params: IPaginationAndSearch = {
      page: chatState?.page,
      per: chatState?.per,
    };

    if (textSearch) {
      params.search_user_id = textSearch;
    }

    dispatch(showLoading());
    dispatch(
      getChatFeedRequest(params, () => {
        dispatch(hideLoading());
      }),
    );
  };

  const onItemClick = (item: any) => {
    console.log(item);
    dispatch(
      getCredential(() => {
        navigation.navigate(AppRoute.CHAT_INTERNAL, {
          contextId: item?.contextId,
          introducerId: item?.introducerId,
          askerId: item?.askerId,
        });
      }),
    );
  };

  const onPin = (id: string, index: number) => {
    setLoading(true);
    dispatch(
      onPinRequest(
        {pinnable_id: id, pinnable_type: PinnableTypeEnum.ASK, index},
        (response: IActionOnPinSuccess['payload']) => {
          const params: IPaginationAndSearch = {
            page: chatState?.page,
            per: chatState?.per,
          };
          if (textSearch) {
            params.search_user_id = textSearch;
          }
          dispatch(
            getChatFeedRequest(params, () => {
              setLoading(false);
              Toast.show({
                position: 'bottom',
                type: response.success ? 'success' : 'error',
                text1: response.success ? 'Successfully' : response.message,
                visibilityTime: 3000,
                autoHide: true,
              });
            }),
          );
        },
      ),
    );
  };

  const onUnPin = (id: string, index: number) => {
    setLoading(true);
    dispatch(
      onUnPinRequest(
        {pinnable_id: id, pinnable_type: PinnableTypeEnum.ASK, index},
        (response: IActionOnUnPinSuccess['payload']) => {
          const params: IPaginationAndSearch = {
            page: chatState?.page,
            per: chatState?.per,
          };
          if (textSearch) {
            params.search_user_id = textSearch;
          }
          dispatch(
            getChatFeedRequest(params, () => {
              setLoading(false);
              Toast.show({
                position: 'bottom',
                type: response.success ? 'success' : 'error',
                text1: response.success ? 'Successfully' : response.message,
                visibilityTime: 3000,
                autoHide: true,
              });
            }),
          );
        },
      ),
    );
  };

  if (loadingState.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.pt30, styles.container]}>
        <ListItemsChat dataFeed={chatState?.dataFeed} onItemClick={onItemClick} onPin={onPin} onUnPin={onUnPin} />
      </View>
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default AskScreen;
