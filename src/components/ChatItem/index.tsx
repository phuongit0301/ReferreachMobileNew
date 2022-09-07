/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Trans} from 'react-i18next';

import {ICriteriumDataState} from '~Root/services/ask/types';
import {GlobalStyles, IMAGES} from '~Root/config';
import {Paragraph} from '~Root/components';
import styles from './styles';
import {IIncluded} from '~Root/services/chat/types';

interface Props {
  item: IIncluded;
  onMenu: (item: IIncluded, event: any) => void;
}

const ChatItem: React.FC<Props> = ({item, onMenu = () => {}}) => {
  const [animation, setAnimation] = useState({
    expanded: false,
    opacity: new Animated.Value(0),
    height: new Animated.Value(0),
  });

  const onToggle = () => {
    Animated.timing(animation?.height, {
      toValue: animation?.expanded ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation?.opacity, {
        toValue: animation?.expanded ? 0 : 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });

    setAnimation({...animation, expanded: !animation?.expanded});
  };

  const visibleAnim = animation.opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.p15, styles.cardContainer]}>
      <View style={GlobalStyles.flexColumn}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
          <View style={[GlobalStyles.mr10, styles.description]}>
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
                normal: <Text style={styles.textNormal} />,
                highlight: <Text style={styles.textHighlight} />,
              }}
            />
          </View>

          <TouchableOpacity
            onPressIn={event => onMenu(item, event)}
            style={[GlobalStyles.mt5, styles.iconThreeDotContainer]}>
            <FastImage source={IMAGES.iconThreeDot} resizeMode='cover' style={styles.iconThreeDot} />
          </TouchableOpacity>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mt20]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mr20]}>
            <FastImage
              source={IMAGES.iconCalendar}
              resizeMode='cover'
              style={[GlobalStyles.mr5, styles.iconCalendar]}
            />
            <Paragraph
              textDarkGrayColor
              title={moment(item?.attributes?.deadline).format('MMM DD, YYYY')}
              style={styles.textNormal}
            />
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.globeContainer]}>
            <FastImage source={IMAGES.iconGlobe} resizeMode='cover' style={[GlobalStyles.mr5, styles.iconGlobe]} />
            <Paragraph
              textDarkGrayColor
              numberOfLines={1}
              ellipsizeMode={'tail'}
              title={item?.attributes?.ask_location?.text}
              style={styles.textNormal}
            />
          </View>
        </View>
      </View>
      <Animated.View
        style={[GlobalStyles.flexColumn, {opacity: visibleAnim, display: animation?.expanded ? 'flex' : 'none'}]}>
        {item?.attributes?.criterium && item?.attributes?.criterium.length > 0 && (
          <View style={[GlobalStyles.flexColumn, GlobalStyles.mt20]}>
            <Paragraph h5 bold600 textDarkGrayColor title='Criteria' style={GlobalStyles.mb5} />
            {item?.attributes?.criterium.map((item: ICriteriumDataState, index: number) => (
              <View
                key={`criteria-${index}`}
                style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mt5]}>
                <FastImage
                  source={IMAGES.iconVerify}
                  resizeMode='cover'
                  style={[styles.iconVerify, GlobalStyles.mr5]}
                />
                <Paragraph title={item?.text} />
              </View>
            ))}
          </View>
        )}
        <Paragraph textDarkGrayColor title={item?.attributes?.additional_detail} style={GlobalStyles.mt10} />
        {item?.attributes?.documents && item?.attributes?.documents.length > 0 && (
          <View style={[GlobalStyles.flexRow, GlobalStyles.mt10]}>
            {item?.attributes?.documents.map((item: any, index: number) =>
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
      </Animated.View>
      <TouchableOpacity
        style={[GlobalStyles.alignCenter, GlobalStyles.fullWidth, styles.lineBorderContainer]}
        onPress={onToggle}>
        <View style={[GlobalStyles.mt20, styles.lineBorder]} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatItem;
