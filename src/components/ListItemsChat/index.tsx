import React, {useState} from 'react';
import {Animated, RefreshControl, View, SectionList, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

import {IAuthState} from '~Root/services/auth/types';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {ListItemChat, Paragraph} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {IPeopleToAsk} from '~Root/services/chat/types';
import FastImage from 'react-native-fast-image';

interface Props {
  data: any[];
  onItemClick?: (item: IPeopleToAsk) => void;
}

const ListItemsChat: React.FC<Props> = ({data, onItemClick}: Props) => {
  const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => `list-item-${index}`}
      renderItem={({item, index, section}) => {
        return <ListItemChat items={item} isAsker={!!section?.asker} data={section?.data} index={index} />;
      }}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({section}) => {
        if (!section?.asker) {
          return null;
        }
        return (
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb5, GlobalStyles.ml15]}>
            <FastImage
              source={{
                uri: section?.asker?.avatar_url,
              }}
              resizeMode='cover'
              onProgress={() => <ActivityIndicator />}
              style={[GlobalStyles.mr10, styles.avatar]}
            />
            <View style={GlobalStyles.flexRow}>
              <Paragraph bold600 title='You ' />
              <Paragraph title={`${section?.asker?.demographic} `} />
              <Paragraph title={section?.asker?.business_requirement} />
            </View>
          </View>
        );
      }}
    />
  );
};

export default ListItemsChat;
