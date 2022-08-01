/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Trans} from 'react-i18next';
import {useSelector} from 'react-redux';

import {IDataChatFeed} from '~Root/services/chat/types';
import {Avatar, ListItemChat, ListItemChatHeader, Paragraph} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

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
  const userState = useSelector((state: IGlobalState) => state.userState);

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
      // renderSectionHeader={({section}) => {
      //   if (section.included?.length === 0 || section.data?.length === 0) {
      //     return null;
      //   }
      //   const index = [dataFeed].indexOf(section);

      //   const dataUser = section.included[0];
      //   const dataAsk = section.data[0];
      //   const name =
      //     +dataUser?.id !== +userState?.userInfo?.id
      //       ? `${dataUser?.attributes?.first_name} ${dataUser?.attributes?.last_name}`
      //       : 'You';

      //   return (
      //     <TouchableOpacity
      //       style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb5, GlobalStyles.ml10]}>
      //       <Avatar
      //         styleAvatar={{...GlobalStyles.mr10, ...styles.avatar}}
      //         styleContainerGradient={{...GlobalStyles.mr10, ...styles.avatar}}
      //         textStyle={{...GlobalStyles.h5, ...GlobalStyles.textBoldNormal}}
      //         userInfo={{
      //           avatar_url: dataUser?.attributes.avatar_metadata?.avatar_url,
      //           avatar_lat: dataUser?.attributes.avatar_metadata?.avatar_lat,
      //           avatar_lng: dataUser?.attributes.avatar_metadata?.avatar_lng,
      //           first_name: dataUser?.attributes.first_name,
      //           last_name: dataUser?.attributes.last_name,
      //         }}
      //       />
      //       <View style={GlobalStyles.flexRow}>
      //         <View style={[GlobalStyles.flexRow, GlobalStyles.mr5, styles.titleWidth]}>
      //           <Trans
      //             i18nKey='chat_title'
      //             parent={Text}
      //             values={{
      //               name: name,
      //               demographic: dataAsk?.attributes?.demographic,
      //               businessRequirement: dataAsk?.attributes?.business_requirement,
      //             }}
      //             components={{
      //               bold: <Text style={[GlobalStyles.bold700]} />,
      //               normal: <Text style={[GlobalStyles.bold600, styles.textNormal]} />,
      //               highlight: <Text style={[GlobalStyles.bold700, styles.textHighlight]} />,
      //             }}
      //           />
      //         </View>
      //         {dataAsk?.attributes?.pinned ? (
      //           <TouchableOpacity onPress={() => onUnPin(dataAsk?.id, index)}>
      //             <FastImage source={IMAGES.iconPinActive} resizeMode='cover' style={styles.iconPin} />
      //           </TouchableOpacity>
      //         ) : (
      //           <TouchableOpacity onPress={() => onPin(dataAsk?.id, index)}>
      //             <FastImage source={IMAGES.iconPin} resizeMode='cover' style={styles.iconPin} />
      //           </TouchableOpacity>
      //         )}
      //       </View>
      //     </TouchableOpacity>
      //   );
      // }}
    />
  );
};

export default ListItemsChat;
