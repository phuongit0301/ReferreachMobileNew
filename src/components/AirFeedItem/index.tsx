/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

import {IIncluded} from '~Root/services/network/types';
import {GlobalStyles, IMAGES} from '~Root/config';
import {Avatar, Button, Paragraph} from '~Root/components';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {ASK_STATUS_ENUM} from '~Root/utils';

interface Props {
  item: IIncluded;
  onIntro?: (item: any) => void;
  onShare?: () => void;
}

const AirFeedItem: React.FC<Props> = ({item, onIntro = () => {}, onShare = () => {}}) => {
  const {t} = useTranslation();

  return (
    <View
      style={[
        GlobalStyles.container,
        GlobalStyles.flexColumn,
        GlobalStyles.mb15,
        GlobalStyles.p10,
        styles.itemContainer,
      ]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
        <Avatar
          userInfo={{
            ...item?.attributes?.avatar_metadata,
            first_name: item?.attributes?.first_name,
            last_name: item?.attributes?.last_name,
          }}
          styleAvatar={{...GlobalStyles.mr5, ...styles.avatar}}
          styleContainerGradient={{...GlobalStyles.alignCenter, ...styles.avatarContainer}}
        />
        <View style={[GlobalStyles.flexColumn]}>
          {item?.attributes?.first_name && item?.attributes?.last_name ? (
            <Paragraph
              p
              numberOfLines={1}
              ellipsizeMode='tail'
              textDarkGrayColor
              title={`${item?.attributes?.first_name} ${item?.attributes?.last_name}`}
              style={GlobalStyles.mt5}
            />
          ) : (
            <Paragraph
              p
              numberOfLines={1}
              ellipsizeMode='tail'
              textDarkGrayColor
              title={`${item?.attributes.phone ?? ''}`}
              style={GlobalStyles.mt5}
            />
          )}
          <Paragraph
            textDarkGrayColor
            numberOfLines={1}
            ellipsizeMode='tail'
            title={`${item?.attributes?.title ?? ''}`}
            style={[GlobalStyles.mt5, styles.textSmall]}
          />
        </View>
      </View>
      {item?.attributes?.pitch && (
        <Paragraph textDarkGrayColor title={item?.attributes?.pitch} style={GlobalStyles.mb10} />
      )}
      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.groupBtn]}>
        {item?.attributes?.status === ASK_STATUS_ENUM.EXPIRED || item?.attributes?.status === ASK_STATUS_ENUM.CLOSED ? (
          <>
            <TouchableOpacity
              style={[GlobalStyles.alignCenter, GlobalStyles.p5, GlobalStyles.mr5, styles.iconShareContainer]}>
              <FastImage source={IMAGES.iconShare} style={styles.iconShareInactive} />
            </TouchableOpacity>
            <Button
              title={t('intro')}
              p
              bold600
              textCenter
              containerStyle={{
                ...GlobalStyles.buttonContainerStyle,
                ...styles.buttonContainerInactiveStyle,
              }}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[GlobalStyles.alignCenter, GlobalStyles.p5, GlobalStyles.mr5, styles.iconShareContainer]}
              onPress={onShare}>
              <FastImage source={IMAGES.iconShare} style={styles.iconShare} />
            </TouchableOpacity>
            <Button
              title={t('intro')}
              p
              bold600
              textCenter
              containerStyle={{
                ...GlobalStyles.buttonContainerStyle,
                ...styles.buttonContainerStyle,
              }}
              onPress={onIntro}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default AirFeedItem;
