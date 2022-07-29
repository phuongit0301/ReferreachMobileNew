/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Trans} from 'react-i18next';
import {useSelector} from 'react-redux';

import {IDataChatFeed, IIncluded, IUserChatList} from '~Root/services/chat/types';
import {Avatar, ListItemChat} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

interface Props {
  dataUser: IUserChatList;
  dataAsk: IIncluded;
  index: number;
  onItemClick?: (item: any) => void;
  onPin?: (askId: string, index: number) => void;
  onUnPin?: (askId: string, index: number) => void;
}

const ListItemChatHeader: React.FC<Props> = ({
  dataUser,
  dataAsk,
  index,
  onItemClick = () => {},
  onPin = () => {},
  onUnPin = () => {},
}: Props) => {
  const userState = useSelector((state: IGlobalState) => state.userState);

  const name =
    +dataUser?.id !== +userState?.userInfo?.id
      ? `${dataUser?.attributes?.first_name} ${dataUser?.attributes?.last_name}`
      : 'You';

  return (
    <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb5, GlobalStyles.ml10]}>
      <Avatar
        styleAvatar={{...GlobalStyles.mr10, ...styles.avatar}}
        styleContainerGradient={{...GlobalStyles.mr10, ...styles.avatar}}
        textStyle={{...GlobalStyles.h5, ...GlobalStyles.textBoldNormal}}
        userInfo={{
          avatar_url: dataUser?.attributes.avatar_metadata?.avatar_url,
          avatar_lat: dataUser?.attributes.avatar_metadata?.avatar_lat,
          avatar_lng: dataUser?.attributes.avatar_metadata?.avatar_lng,
          first_name: dataUser?.attributes.first_name,
          last_name: dataUser?.attributes.last_name,
        }}
      />
      <View style={GlobalStyles.flexRow}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.mr5, styles.titleWidth]}>
          <Trans
            i18nKey='chat_title'
            parent={Text}
            values={{
              name: name,
              demographic: dataAsk?.attributes?.demographic,
              businessRequirement: dataAsk?.attributes?.business_requirement,
            }}
            components={{
              bold: <Text style={[GlobalStyles.bold700]} />,
              normal: <Text style={[GlobalStyles.bold600, styles.textNormal]} />,
              highlight: <Text style={[GlobalStyles.bold700, styles.textHighlight]} />,
            }}
          />
        </View>
        {dataAsk?.attributes?.pinned ? (
          <TouchableOpacity onPress={() => onUnPin(dataAsk?.id, index)}>
            <FastImage source={IMAGES.iconPinActive} resizeMode='cover' style={styles.iconPin} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onPin(dataAsk?.id, index)}>
            <FastImage source={IMAGES.iconPin} resizeMode='cover' style={styles.iconPin} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItemChatHeader;
