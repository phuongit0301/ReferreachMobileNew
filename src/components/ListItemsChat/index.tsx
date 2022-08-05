/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, FlatList} from 'react-native';

import {IDataChatFeed} from '~Root/services/chat/types';
import {ListItemChat, ListItemChatHeader, Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';

interface Props {
  dataFeed: IDataChatFeed;
  onItemClick?: (item: any) => void;
  onPin?: (askId: string, index: number) => void;
  onUnPin?: (askId: string, index: number) => void;
}

const ListItemsChat: React.FC<Props> = ({
  dataFeed,
  onItemClick = () => {},
  onPin = () => {},
  onUnPin = () => {},
}: Props) => {
  return (
    <FlatList
      data={dataFeed.data}
      keyExtractor={(item, index) => `list-item-${new Date().getTime()}-${index}`}
      renderItem={({item, index}) => {
        const dataIncluded = dataFeed.included[index];
        return (
          <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]}>
            <ListItemChatHeader
              dataAsk={item}
              dataUser={dataIncluded}
              index={index}
              onPress={onItemClick}
              onPin={onPin}
              onUnPin={onUnPin}
            />
            <ListItemChat items={item} isAsker={false} dataUser={dataIncluded} index={index} onPress={onItemClick} />
          </View>
        );
      }}
      ListEmptyComponent={() => (
        <View
          style={[GlobalStyles.flexRow, GlobalStyles.center, GlobalStyles.mt15, GlobalStyles.pv15, GlobalStyles.ph10]}>
          <Paragraph textCenter title='Start an intro with your friend in your Air Feed' />
        </View>
      )}
    />
  );
};

export default ListItemsChat;
