/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Trans} from 'react-i18next';

import {GlobalStyles, IMAGES} from '~Root/config';
import {Category} from '~Root/components';
import styles from './styles';
import Paragraph from '../Paragraph';
import {dateToHours} from '~Root/utils';

interface Props {
  item: any;
}

const AskItem: React.FC<Props> = ({item = {}}) => {
  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15, GlobalStyles.p15, styles.cardContainer]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
        <View style={GlobalStyles.container}>
          <Category
            styleTag={+dateToHours(item?.date) > 7 ? styles.styleTagPurple : styles.styleTag}
            itemKey={item?.id}
            name={`${dateToHours(item?.date)} hours left`}
            showButton={false}
            tagText={styles.tagText}
          />
        </View>
        <TouchableOpacity>
          <FastImage source={IMAGES.iconThreeDot} resizeMode='cover' style={styles.iconThreeDot} />
        </TouchableOpacity>
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.mt10]}>
        <Trans
          i18nKey='ask_content'
          values={{greeting: item?.greeting, role: item?.role, description: item?.description}}
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
          <Paragraph textDarkGrayColor title={moment(item?.date).format('YYYY-MM-DD')} />
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
          <FastImage source={IMAGES.iconGlobe} resizeMode='cover' style={[GlobalStyles.mr5, styles.iconGlobe]} />
          <Paragraph textDarkGrayColor title={item?.location} />
        </View>
      </View>
      {item?.criteria?.length > 0 && (
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mt20]}>
          <Paragraph h5 bold600 textDarkGrayColor title='Criteria' style={GlobalStyles.mb5} />
          {item?.criteria.map((item: string, index: number) => (
            <View key={`criteria-${index}`} style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mt5]}>
              <FastImage source={IMAGES.iconVerify} resizeMode='cover' style={[styles.iconVerify, GlobalStyles.mr5]} />
              <Paragraph title={item} />
            </View>
          ))}
        </View>
      )}
      {item?.files?.length > 0 && (
        <View style={[GlobalStyles.flexRow, GlobalStyles.mt10]}>
          {item?.files.map((item: any, index: number) =>
            item?.fileType === 'pdf' ? (
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
