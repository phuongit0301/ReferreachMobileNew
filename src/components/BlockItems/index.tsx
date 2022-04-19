import React, {useState} from 'react';
import {Animated, RefreshControl} from 'react-native';

import {ITrustNetwork} from '~Root/services/ask/types';
import {BASE_COLORS} from '~Root/config';
import {BlockItem} from '~Root/components';
import styles from './styles';

interface Props {
  data: any[];
  isVisible: boolean;
  onConfirm: (item: ITrustNetwork) => void;
  onPending: (item: ITrustNetwork) => void;
}

const BlockItems: React.FC<Props> = ({data, isVisible = false, onConfirm = () => {}, onPending = () => {}}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  // const [isLazyload, setLazyload] = useState(false);

  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onPageChanged = () => {
    //   setLazyload(true);
  };

  const onItemClick = (item: any) => {};

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
      key={'block'}
      keyExtractor={(item, index) => `block-${item.id}-${index}`}
      renderItem={({item}: {item: ITrustNetwork}) => (
        <BlockItem
          id={item?.id}
          first_name={item?.to_user_profile?.first_name}
          last_name={item?.to_user_profile?.last_name}
          title={item?.to_user_profile?.title}
          profile_photo={item?.to_user_profile?.avatar?.url}
          status={item?.status}
          phoneNumber={item?.to_user?.email}
          onPress={() => onItemClick(item)}
          showConfirm={isVisible}
          onConfirm={() => onConfirm(item)}
          onPending={() => onPending(item)}
        />
      )}
      onEndReached={onPageChanged}
      onEndReachedThreshold={0.5}
    />
  );
};

export default BlockItems;
