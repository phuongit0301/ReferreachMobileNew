import React, {useState} from 'react';
import {Animated, RefreshControl, View} from 'react-native';
import {useSelector} from 'react-redux';

import {IAuthState} from '~Root/services/auth/types';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {ListItemChat} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {IPeopleToAsk} from '~Root/services/chat/types';

interface Props {
  data: any[];
  onItemClick?: (item: IPeopleToAsk) => void;
}

const ListItemsChat: React.FC<Props> = ({data, onItemClick}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);

  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    if (authState?.isLoggedIn) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  };

  return (
    <Animated.FlatList
      contentContainerStyle={styles.listContainer}
      style={GlobalStyles.container}
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
      data={data}
      key={'listItemChat'}
      keyExtractor={(item, index) => `listItemChat-${item?.id ?? index}-${index}`}
      ItemSeparatorComponent={() => <View style={styles.borderBottom} />}
      renderItem={({item}: {item: IPeopleToAsk}) => (
        <ListItemChat {...item} onPress={() => onItemClick?.(item)} tagStyle={styles.tagStyle} />
      )}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ListItemsChat;
