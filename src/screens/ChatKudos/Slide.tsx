/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {t} from 'i18next';

import {Avatar, Paragraph, UserCard} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';

import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppRoute} from '~Root/navigation/AppRoute';
import {ChatNavigatorParamsList} from '~Root/navigation/config';
import {IActionOnSendKudosSuccess, IData} from '~Root/services/ask/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {onSendKudosRequest} from '~Root/services/ask/actions';
import Rate from './Rate';
import styles, {sliderWidth, itemWidth} from './styles';

type PropsNav = NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT_KUDOS>;

interface Props {
  data: IData[];
  askId?: string;
}

const tags = [
  {id: 1, name: 'Utilities'},
  {id: 2, name: 'Cyber Securities'},
];

const Slide: React.FC<PropsNav & Props> = ({navigation, route, data = [], askId}) => {
  const [sliderActive, setSliderActive] = useState(1);
  const [currentRate, setRate] = useState(0);
  const dispatch = useDispatch();

  const onRate = useCallback((index: number) => {
    setRate(index);
  }, []);

  const onSend = (item: IData) => {
    if (askId) {
      const payload = {
        askId,
        params: {
          rating: currentRate,
          responder_id: item?.introducee?.id,
        },
      };

      dispatch(showLoading());
      dispatch(
        onSendKudosRequest(payload, (response: IActionOnSendKudosSuccess['payload']) => {
          dispatch(hideLoading());
          if (response.success) {
            navigation.navigate(AppRoute.CHAT_KUDOS_SUCCESS);
          } else {
            Toast.show({
              position: 'bottom',
              type: 'error',
              text1: response?.message ?? t('not_found'),
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        }),
      );
    }
  };

  const renderItem = ({item, index}: {item: IData; index: number}) => {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        key={`card-kudos-${item?.id}-${index}`}
        style={[GlobalStyles.container, GlobalStyles.scrollViewFullScreen, GlobalStyles.mb30]}>
        <View style={[GlobalStyles.alignCenter, GlobalStyles.flexColumn]}>
          <View style={[GlobalStyles.pt15, GlobalStyles.mb10, styles.slideInnerContainer]}>
            <View style={[GlobalStyles.alignCenter, GlobalStyles.ph15, GlobalStyles.container]}>
              <View style={styles.shadow} />
              <View style={[GlobalStyles.mb5, GlobalStyles.alignEnd, GlobalStyles.flexRow, styles.imageContainer]}>
                <Avatar
                  styleAvatar={styles.image}
                  styleContainerGradient={styles.image}
                  userInfo={{
                    avatar_url: item?.introducee?.attributes?.avatar_metadata?.avatar_url,
                    avatar_lat: item?.introducee?.attributes?.avatar_metadata?.avatar_lat,
                    avatar_lng: item?.introducee?.attributes?.avatar_metadata?.avatar_lng,
                    first_name: item?.introducee?.attributes?.first_name,
                    last_name: item?.introducee?.attributes?.last_name,
                  }}
                />
                <FastImage source={IMAGES.iconProtect17x20} resizeMode='cover' style={styles.iconProtect} />
              </View>
              <Paragraph
                h5
                title={`${item?.introducee?.attributes?.first_name} ${item?.introducee?.attributes?.last_name}`}
                style={[GlobalStyles.mb5, styles.name]}
              />
              <Paragraph h6 title={item?.introducee?.attributes?.title} style={[GlobalStyles.mb10, styles.position]} />
              <UserCard
                data={tags}
                title={`Endorse ${item?.introducee?.attributes?.first_name}'s industry domains`}
                titleStyle={styles.titleStyle}
                styleHeaderContainer={GlobalStyles.alignCenter}
                onPress={() => {}}
                containerStyle={styles.buttonContainer}
                textStyle={styles.buttonTextStyle}
                styleContainer={{...GlobalStyles.pt5, ...styles.cardItemContainer}}
                showIconSubTitle={true}
                iconSubName='globe'
                showTooltip={false}
                showSubTitle={false}
                showButton={false}
                showRequired={false}
                onTooltipPress={() => {}}
                tooltipTitle={t('your_industry')}
                tooltipDescription={t('your_industry_description')}
                styleTag={styles.styleTag}
                tagText={styles.tagText}
                showNoData={!tags?.length}
                noDataMessage='No industry domain defined'
                noDataStyle={{...GlobalStyles.textCenter, ...styles.noDataStyle}}
                noDataStyleContainer={{
                  ...GlobalStyles.alignCenter,
                  ...GlobalStyles.justifyCenter,
                  ...GlobalStyles.container,
                  ...GlobalStyles.ph40,
                }}
              />
              <Paragraph
                textCenter
                h6
                textJetColor
                title='Please rate this response to your Ask'
                style={[GlobalStyles.mb5, styles.text]}
              />
              <View
                style={[
                  GlobalStyles.flexRow,
                  GlobalStyles.ph10,
                  GlobalStyles.pv5,
                  GlobalStyles.mb5,
                  styles.rateContainer,
                ]}>
                <Rate onRate={onRate} currentRate={currentRate} />
              </View>
              <Paragraph
                textDarkGrayColor
                title={`*${t('rating_private')}`}
                style={[GlobalStyles.mb10, styles.text1]}
              />
            </View>
            <View style={[styles.userListContainer]}>
              <Paragraph
                h6
                bold500
                title={item?.introducers?.length > 1 ? t('introducers') : t('introducer')}
                style={[GlobalStyles.ph10, GlobalStyles.pv5]}
              />
              <ScrollView style={[GlobalStyles.container]} horizontal showsHorizontalScrollIndicator={false}>
                {item?.introducers.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={`chat-kudos-${item.id}-${index}`}
                      style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter, GlobalStyles.ml10]}>
                      <Avatar
                        styleAvatar={{...GlobalStyles.mr3, ...GlobalStyles.mb5, ...styles.avatar}}
                        styleContainerGradient={{...GlobalStyles.mr3, ...GlobalStyles.mb5, ...styles.avatar}}
                        textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                        userInfo={{
                          avatar_url: item?.attributes?.avatar_metadata?.avatar_url,
                          avatar_lat: item?.attributes?.avatar_metadata?.avatar_lat,
                          avatar_lng: item?.attributes?.avatar_metadata?.avatar_lng,
                          first_name: item?.attributes?.first_name,
                          last_name: item?.attributes?.last_name,
                        }}
                      />
                      <View style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter]}>
                        <Paragraph title={item?.attributes?.first_name} style={styles.text3} />
                        <Paragraph title={item?.attributes?.last_name} style={styles.text3} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity style={[GlobalStyles.p5]} onPress={() => onSend(item)}>
            <View style={[GlobalStyles.p10, styles.btn]}>
              <Paragraph h5 bold600 textWhite textCenter title={t('send_kudos')} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={true}
      firstItem={sliderActive}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      loop={true}
      loopClonesPerSide={2}
      autoplay={false}
      onSnapToItem={index => setSliderActive(index)}
    />
  );
};

export default Slide;
