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
import {ListItemsChat, Loading, LoadingSecondary} from '~Root/components';
import {IActionOnPinSuccess, IActionOnUnPinSuccess} from '~Root/services/chat/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import Toast from 'react-native-toast-message';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

interface Params {
  tabLabel?: string;
}

const AskScreen = ({navigation}: Props & Params) => {
  const dispatch = useDispatch();

  const chatState = useSelector((state: IGlobalState) => state.chatState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(showLoading());
      dispatch(
        getChatFeedRequest(() => {
          dispatch(hideLoading());
        }),
      );
    });
    return unsubscribe;
  }, [navigation]);

  const onItemClick = (item: any) => {
    navigation.navigate(AppRoute.CHAT_INTERNAL, {contextId: item?.id});
  };

  const onPin = (askId: string, index: number) => {
    setLoading(true);
    dispatch(
      onPinRequest({askId, index}, (response: IActionOnPinSuccess['payload']) => {
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
  };

  const onUnPin = (askId: string, index: number) => {
    setLoading(true);
    dispatch(
      onUnPinRequest({askId, index}, (response: IActionOnUnPinSuccess['payload']) => {
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
