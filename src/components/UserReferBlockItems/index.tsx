import React, {useState} from 'react';
import {Animated, RefreshControl} from 'react-native';

import {BASE_COLORS} from '~Root/config';
import {IFeedInfoState} from '~Root/services/feed/types';
import {UserReferBlockItem} from '~Root/components';
import styles from './styles';

interface Props {
  data: IFeedInfoState[] | null;
  onProfile: (item: IFeedInfoState) => void;
}

const UserReferBlockItems: React.FC<Props> = ({data, onProfile = () => {}}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  // const [isLazyload, setLazyload] = useState(false);

  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onPageChanged = () => {
    //   setLazyload(true);
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
      key={'user-refer-block'}
      keyExtractor={(item, index) => `user-refer-block-${index}`}
      renderItem={({item}: {item: IFeedInfoState}) => (
        <UserReferBlockItem
          id={item?.id}
          first_name={item?.to_user?.user_profile?.first_name}
          last_name={item?.to_user?.user_profile?.last_name}
          profile_photo={item?.to_user?.user_profile?.avatar?.url}
          status={item?.status}
          onPress={() => onProfile(item)}
        />
      )}
      // ListFooterComponent={<ActivityIndicator color={BASE_COLORS.primary} />}
      onEndReached={onPageChanged}
      onEndReachedThreshold={0.5}
    />
  );
};

export default UserReferBlockItems;
