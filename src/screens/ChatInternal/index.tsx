import React, {useLayoutEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import ChatConsumerScreen from './ChatConsumer';
import {IGlobalState} from '~Root/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatInternalScreen: React.FC<Props> = ({route, navigation}) => {
  const pubnubState = useSelector((state: IGlobalState) => state.pubnubState);

  const pubnub = new PubNub({
    subscribeKey: pubnubState?.data?.subscribe_key,
    publishKey: pubnubState?.data?.publish_key,
    uuid: pubnubState?.data?.uuid,
    authKey: pubnubState?.data?.token,
  });

  useLayoutEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  }, [navigation, route]);

  return (
    <PubNubProvider client={pubnub}>
      <ChatConsumerScreen route={route} navigation={navigation} />
    </PubNubProvider>
  );
};

export default ChatInternalScreen;
