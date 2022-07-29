import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';

import {ChatNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {PubNubContextProvider} from '~Root/hooks/usePubnubHook';
import {AppRoute} from '~Root/navigation/AppRoute';
import ChatConsumerScreen from './ChatConsumer';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const ChatPersonalScreen: React.FC<Props> = ({route, navigation}) => {
  return (
    <PubNubContextProvider>
      <ChatConsumerScreen route={route} navigation={navigation} />
    </PubNubContextProvider>
  );
};

export default ChatPersonalScreen;
