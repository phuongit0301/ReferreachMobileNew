/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Trans} from 'react-i18next';
import {t} from 'i18next';

import {IAskInside, ICriteriumDataState} from '~Root/services/ask/types';
import {GlobalStyles, IMAGES} from '~Root/config';
import {Category, Paragraph} from '~Root/components';
import {ASK_STATUS_ENUM, calculateExpiredTime, dateToDays, dateToHours} from '~Root/utils';
import styles from './styles';

interface Props {
  item: IAskInside;
  onMenu: (item: IAskInside, event: any) => void;
}

const AskItem: React.FC<Props> = ({item, onMenu = () => {}}) => {
  const time = parseInt(`${calculateExpiredTime(item?.attributes.created_at)}`, 10);
  const hours = +dateToHours(new Date(item?.attributes?.deadline));

  let strLeft = t('time_to_left', {time: hours});

  let styleTag = styles.styleTag;

  if (item?.attributes?.status === ASK_STATUS_ENUM.PUBLISHED || item?.attributes?.status === ASK_STATUS_ENUM.SUCCEED) {
    if (+hours > 24) {
      strLeft = t('day_to_left', {time: dateToDays(new Date(item?.attributes?.deadline))});
    }

    if (
      moment(item?.attributes?.deadline).format('MM-DD-YYYY HH:mm:ss') >= moment().format('MM-DD-YYYY HH:mm:ss') &&
      +hours < 24
    ) {
      strLeft = t('time_to_left', {time: hours});
    }
    if (time > 0) {
      styleTag = styles.styleTagPurple;
    }
  } else if (item?.attributes?.status === ASK_STATUS_ENUM.EXPIRED) {
    strLeft = t('ask_expired');
    styleTag = styles.styleTagCarminePink;
  } else if (item?.attributes?.status === ASK_STATUS_ENUM.EXPIRED) {
    strLeft = t('ask_end');
    styleTag = styles.styleTagForestGreen;
  } else {
    if (moment(item?.attributes?.deadline).format('MM-DD-YYYY HH:mm:ss') >= moment().format('MM-DD-YYYY HH:mm:ss')) {
      strLeft = t('time_to_left', {time: hours});
    }
  }

  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15, GlobalStyles.p15, styles.cardContainer]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
        <View style={GlobalStyles.container}>
          {item?.attributes?.deadline && (
            <Category
              styleTag={styleTag}
              itemKey={item?.id}
              name={`${strLeft}`}
              showButton={false}
              tagText={styles.tagText}
            />
          )}
        </View>
        <TouchableOpacity onPressIn={event => onMenu(item, event)} style={styles.iconThreeDotContainer}>
          <FastImage source={IMAGES.iconThreeDot} resizeMode='cover' style={styles.iconThreeDot} />
        </TouchableOpacity>
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.mt10]}>
        <Trans
          i18nKey='ask_content'
          values={{
            greeting: item?.attributes?.greeting,
            role: item?.attributes?.demographic,
            description: item?.attributes?.business_requirement,
            businessDetail: item?.attributes?.business_detail,
          }}
          parent={Text}
          components={{
            normal: <Text style={GlobalStyles.textDarkGray} />,
            highlight: <Text style={GlobalStyles.textSteelBlue2} />,
          }}
        />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mt20]}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mr20]}>
          <FastImage source={IMAGES.iconCalendar} resizeMode='cover' style={[GlobalStyles.mr5, styles.iconCalendar]} />
          <Paragraph textDarkGrayColor title={moment(item?.attributes?.deadline).format('YYYY-MM-DD')} />
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.globeContainer]}>
          <FastImage source={IMAGES.iconGlobe} resizeMode='cover' style={[GlobalStyles.mr5, styles.iconGlobe]} />
          <Paragraph
            textDarkGrayColor
            numberOfLines={1}
            ellipsizeMode={'tail'}
            title={item?.relationships?.ask_location?.data?.text}
          />
        </View>
      </View>
      {item?.relationships?.criterium?.data && item?.relationships?.criterium?.data?.length > 0 && (
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mt20]}>
          <Paragraph h5 bold600 textDarkGrayColor title='Criteria' style={GlobalStyles.mb5} />
          {item?.relationships?.criterium?.data?.map((item: ICriteriumDataState, index: number) => (
            <View key={`criteria-${index}`} style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mt5]}>
              <FastImage source={IMAGES.iconVerify} resizeMode='cover' style={[styles.iconVerify, GlobalStyles.mr5]} />
              <Paragraph title={item?.text} />
            </View>
          ))}
        </View>
      )}
      {item?.relationships?.documents?.data && item?.relationships?.documents?.data?.length > 0 && (
        <View style={[GlobalStyles.flexRow, GlobalStyles.mt10]}>
          {item?.relationships?.documents?.data?.map((item: any, index: number) =>
            item?.content_type?.includes('pdf') ? (
              <FastImage
                key={`file-${index}`}
                source={IMAGES.iconPdf}
                resizeMode='cover'
                style={[styles.icon35x35, index > 0 && GlobalStyles.ml10]}
              />
            ) : (
              <FastImage
                key={`file-${index}`}
                source={IMAGES.iconXls}
                resizeMode='cover'
                style={[styles.icon35x35, index > 0 && GlobalStyles.ml10]}
              />
            ),
          )}
        </View>
      )}
    </View>
  );
};

export default AskItem;
