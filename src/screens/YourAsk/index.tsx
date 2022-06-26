/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, RefreshControl, TextInput, View, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {AskItem, Button, HeaderSmallTransparent, Loading, Paragraph} from '~Root/components';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {IAskInside, IPaginationAndSearch} from '~Root/services/ask/types';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {getAsk, setVisibleMenu} from '~Root/services/ask/actions';
import {calculateExpiredTime, dateToHours} from '~Root/utils';
import {DEEP_LINK_URL} from '~Root/private/api';
import {IGlobalState} from '~Root/types';
import styles from './styles';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const YourAskScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const scrollAnim = new Animated.Value(0);
  const inputEl = useRef(null);

  const dispatch = useDispatch();
  const askState = useSelector((state: IGlobalState) => state.askState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const [refreshing, setRefreshing] = useState(false);
  const [initPage, setInitPage] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initData();
    });
    return unsubscribe;
  }, [navigation]);

  const initData = () => {
    const params = {
      page: askState?.page,
      per: askState?.per,
    };
    dispatch(showLoading());
    dispatch(
      getAsk(params, () => {
        dispatch(hideLoading());
        setInitPage(true);

        if (userState?.userInfo?.in_app_status === IN_APP_STATUS_ENUM.ONBOARD_COMPLETED) {
          navigation.navigate(AppRoute.TIPS);
        }
      }),
    );
  };

  useEffect(() => {
    const params: IPaginationAndSearch = {
      page: askState?.page,
      per: askState?.per,
    };
    if (initPage) {
      params.keyword = textSearch;
      dispatch(
        getAsk(params, (response: any) => {
          console.log('search response====>', response);
        }),
      );
    }
  }, [textSearch]);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onInputChange = useCallback((text: string) => {
    setTextSearch(text);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    const params = {
      page: askState?.page,
      per: askState?.per,
    };
    dispatch(
      getAsk(params, () => {
        setRefreshing(false);
      }),
    );
  };

  const onMenu = (item: IAskInside | null, evt?: any) => {
    evt.persist();
    dispatch(
      setVisibleMenu({
        dataAskSelected: item,
        visibleMenu: {
          show: true,
          coordinate: {
            top: +evt.nativeEvent?.pageY + 15,
            left: evt.nativeEvent?.pageX - 200,
          },
        },
      }),
    );
  };

  const onMenuHide = () => {
    dispatch(
      setVisibleMenu({
        dataAskSelected: null,
        visibleMenu: {
          show: false,
          coordinate: {
            top: 0,
            left: 0,
          },
        },
      }),
    );
  };

  const onEdit = () => {
    onMenuHide();
    if (askState?.dataAskSelected?.id) {
      navigation.navigate(AppRoute.ASK_NAVIGATOR, {
        screen: AppRoute.ASK_EDIT,
        params: {id: askState?.dataAskSelected?.id},
      });
    }
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent
          title={t('your_ask')}
          isLogo={true}
          isRightButton={true}
          onRightPress={onToggleDrawer}
        />
        <View style={[GlobalStyles.container, GlobalStyles.ph15, styles.container]}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Search for asks'
              value={textSearch}
              style={styles.input}
              onChangeText={onInputChange}
            />
            <FastImage source={IMAGES.iconSearch} style={styles.iconSearch} />
          </View>
          <Animated.FlatList
            contentContainerStyle={[GlobalStyles.pb150]}
            style={GlobalStyles.mt15}
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
            data={askState?.data}
            key={'block'}
            keyExtractor={(item, index) => `your-ask-${index}`}
            renderItem={({item, index}: {item: any; index: number}) => (
              <AskItem item={item} key={`ask-item-${index}`} onMenu={onMenu} />
            )}
            ListEmptyComponent={() => (
              <View
                style={[
                  GlobalStyles.center,
                  GlobalStyles.mt15,
                  GlobalStyles.pv15,
                  GlobalStyles.ph20,
                  styles.cardContainer,
                ]}>
                <FastImage source={IMAGES.onboard1} resizeMode='cover' style={styles.cardImage} />
                <Paragraph h5 bold600 textWhite title={t('do_you_need')} style={GlobalStyles.mt10} />
                <Paragraph textCenter textWhite title={t('sharing_your_network')} style={GlobalStyles.mt10} />
                <Button
                  title={t('create_ask')}
                  h5
                  bold600
                  textCenter
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...GlobalStyles.mt15,
                    ...styles.buttonContainerStyle,
                  }}
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      {askState?.visibleMenu?.show && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMenuHide}
          style={[GlobalStyles.flexColumn, GlobalStyles.container, styles.bgBlur]}>
          <View
            style={[
              GlobalStyles.flexColumn,
              GlobalStyles.pv10,
              GlobalStyles.ph20,
              styles.menu,
              {...askState?.visibleMenu?.coordinate},
            ]}
            ref={inputEl}>
            {parseInt(`${calculateExpiredTime(askState?.dataAskSelected?.attributes?.created_at)}`, 10) > 0 ? (
              <TouchableOpacity
                style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}
                onPress={onEdit}>
                <View
                  style={[
                    GlobalStyles.justifyCenter,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mr5,
                    styles.iconEditAskContainer,
                  ]}>
                  <FastImage source={IMAGES.iconEditAsk} resizeMode='contain' style={styles.iconEditAsk} />
                </View>
                <Paragraph title={t('edit_this_ask')} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                <View
                  style={[
                    GlobalStyles.justifyCenter,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mr5,
                    styles.iconEditAskContainer,
                  ]}>
                  <FastImage source={IMAGES.iconEditAskGray} resizeMode='contain' style={styles.iconEditAsk} />
                </View>
                <Paragraph textDarkGrayColor title={t('edit_this_ask')} />
              </TouchableOpacity>
            )}
            <View style={[GlobalStyles.justifyCenter, styles.border]} />
            {+dateToHours(new Date(askState?.dataAskSelected?.attributes?.deadline)) > 0 && (
              <>
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                  <View
                    style={[
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                      GlobalStyles.mr5,
                      styles.iconExtendDeadlineContainer,
                    ]}>
                    <FastImage
                      source={IMAGES.iconExtendDeadline}
                      resizeMode='cover'
                      style={styles.iconExtendDeadline}
                    />
                  </View>
                  <Paragraph title={t('extend_deadline')} />
                </View>
                <View style={[styles.border]} />
              </>
            )}
            <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
              <View
                style={[
                  GlobalStyles.alignCenter,
                  GlobalStyles.justifyCenter,
                  GlobalStyles.mr5,
                  styles.iconEndAskContainer,
                ]}>
                <FastImage source={IMAGES.iconEndAsk} resizeMode='cover' style={styles.iconEndAsk} />
              </View>
              <Paragraph title={t('end_this_ask')} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default YourAskScreen;
