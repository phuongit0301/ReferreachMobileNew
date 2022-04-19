import React, {useState} from 'react';
import {Animated, RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {IAuthState} from '~Root/services/auth/types';
import {IMyAsk} from '~Root/services/ask/types';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {ListItem} from '~Root/components';
import {IGlobalState} from '~Root/types';

interface Props {
  data: any[];
  onItemClick?: (item: IMyAsk) => void;
}

const ListItems: React.FC<Props> = ({data, onItemClick}: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);

  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    if (authState?.isLoggedIn) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      // dispatch(
      //   userInfoRequest((response: any) => {
      //     if (response) {
      //       setRefreshing(false);
      //     }
      //   }),
      // );
    }
  };

  return (
    <Animated.FlatList
      contentContainerStyle={styles.listContainer}
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
      key={'listItem'}
      keyExtractor={(item, index) => `listItem-${item.id ?? index}-${index}`}
      ItemSeparatorComponent={() => <View style={styles.borderBottom} />}
      renderItem={({item}: {item: IMyAsk}) => (
        <ListItem
          {...item}
          onPress={() => onItemClick?.(item)}
          tagStyleContainer={GlobalStyles.askTagStyleContainer}
          tagStyle={GlobalStyles.askTagStyle}
        />
      )}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ListItems;
