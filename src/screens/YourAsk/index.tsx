/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, RefreshControl, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {AskItem, Button, HeaderSmallTransparent, Loading, LoadingSecondary, Paragraph} from '~Root/components';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {IActionOnUpdateExtendDeadlineSuccess, IAskInside, IPaginationAndSearch} from '~Root/services/ask/types';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {getAsk, onExtendDeadlineRequest, setVisibleMenu} from '~Root/services/ask/actions';
import {ASK_STATUS_ENUM, convertLocalToUTC, dateWithMonthsDelay} from '~Root/utils';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { DotIndicator } from 'react-native-indicators';

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
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingLazy, setLoadingLazy] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initData();
    });
    return unsubscribe;
  }, [navigation, userState?.userInfo?.in_app_status]);

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

  const onPageChanged = () => {
    if (+askState?.isSkipPagination) {
      return false;
    }

    setLoadingLazy(true);
    const params: IPaginationAndSearch = {
      page: askState?.page ? +askState?.page + 1 : 1,
      per: askState?.per,
    };

    if (textSearch) {
      params.keyword = textSearch;
    }
    dispatch(
      getAsk(params, (response: any) => {
        setLoadingLazy(false);
        console.log('search response====>', response);
      }),
    );
  };

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

  const onEndAsk = () => {
    if (askState?.dataAskSelected?.id) {
      setLoading(true);
      // dispatch(
      //   onEndAskRequest(askState?.dataAskSelected?.id, (response: IActionOnEndAskSuccess['payload']) => {
      //     setLoading(false);
      //     Toast.show({
      //       position: 'bottom',
      //       type: response.success ? 'success' : 'error',
      //       text1: response.success ? 'Successfully' : response.message,
      //       visibilityTime: 3000,
      //       autoHide: true,
      //     });
      //     setTimeout(() => {
      //       initData();
      //     }, 3005);
      //   }),
      // );
      onMenuHide();
      navigation.navigate(AppRoute.CHAT_KUDOS, {askId: askState?.dataAskSelected?.id});
    }
  };

  const onExtendDeadline = () => {
    dispatch(
      setVisibleMenu({
        visibleMenu: {
          show: false,
          coordinate: {
            top: 0,
            left: 0,
          },
        },
      }),
    );
    setVisibleDatePicker(true);
  };

  const onShowDatePicker = () => {
    dispatch(
      setVisibleMenu({
        dataAskSelected: null,
      }),
    );
    setVisibleDatePicker(!visibleDatePicker);
  };

  const onHideDatePicker = () => {
    setVisibleDatePicker(false);
    dispatch(
      setVisibleMenu({
        dataAskSelected: null,
      }),
    );
  };

  const onChangeDatePicker = (date: Date) => {
    setLoading(true);
    let currentDate = date || new Date();
    if (moment(currentDate).format('MM-DD-YYYY HH:mm:ss') < moment().format('MM-DD-YYYY HH:mm:ss')) {
      onHideDatePicker();
      setLoading(false);
      Alert.alert("You can't select date last");
      return;
    }
    currentDate = dateWithMonthsDelay(currentDate, 0);
    if (currentDate && askState?.dataAskSelected?.id) {
      setVisibleDatePicker(false);
      dispatch(
        onExtendDeadlineRequest(
          {
            askId: askState?.dataAskSelected?.id,
            deadline: convertLocalToUTC(currentDate),
          },
          (response: IActionOnUpdateExtendDeadlineSuccess['payload']) => {
            setLoading(false);
            Toast.show({
              position: 'bottom',
              type: response.success ? 'success' : 'error',
              text1: response.success ? 'Successfully' : response.message,
              visibilityTime: 3000,
              autoHide: true,
            });
            dispatch(
              setVisibleMenu({
                dataAskSelected: null,
              }),
            );
            setTimeout(() => {
              initData();
            }, 3005);
          },
        ),
      );
    }
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

  const renderFooter = () => {
    if (loadingLazy) {
      return (
        <View style={[GlobalStyles.alignCenter]}>
          <DotIndicator animating={true} color={`${BASE_COLORS.steelBlue2Color}`} count={3} size={12} />
        </View>
      );
    }
    return null;
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
                  onPress={() => navigation.navigate(AppRoute.ASK_NAVIGATOR)}
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
            onEndReached={onPageChanged}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
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
            {askState?.dataAskSelected?.attributes?.status === ASK_STATUS_ENUM.PUBLISHED ? (
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
            {+askState?.dataAskSelected?.attributes?.deadline_change_count < 2 &&
            (askState?.dataAskSelected?.attributes?.status === ASK_STATUS_ENUM.EXPIRED ||
              askState?.dataAskSelected?.attributes?.status === ASK_STATUS_ENUM.PUBLISHED) ? (
              <TouchableOpacity onPress={onExtendDeadline}>
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
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                  <View
                    style={[
                      GlobalStyles.alignCenter,
                      GlobalStyles.justifyCenter,
                      GlobalStyles.mr5,
                      styles.iconExtendDeadlineContainer,
                    ]}>
                    <FastImage
                      source={IMAGES.iconExtendDeadlineGray}
                      resizeMode='cover'
                      style={styles.iconExtendDeadline}
                    />
                  </View>
                  <Paragraph textDarkGrayColor title={t('extend_deadline')} />
                </View>
                <View style={[styles.border]} />
              </TouchableOpacity>
            )}
            {askState?.dataAskSelected?.attributes?.status === ASK_STATUS_ENUM.PUBLISHED ? (
              <TouchableOpacity
                style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}
                onPress={onEndAsk}>
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
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
                <View
                  style={[
                    GlobalStyles.alignCenter,
                    GlobalStyles.justifyCenter,
                    GlobalStyles.mr5,
                    styles.iconEndAskContainer,
                  ]}>
                  <FastImage source={IMAGES.iconEndAskGray} resizeMode='cover' style={styles.iconEndAsk} />
                </View>
                <Paragraph textDarkGrayColor title={t('end_this_ask')} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}
      {visibleDatePicker && (
        <DateTimePickerModal
          key={`your-ask-date`}
          isVisible={visibleDatePicker}
          mode='datetime'
          onConfirm={(date: Date) => onChangeDatePicker(date)}
          onCancel={onHideDatePicker}
          date={
            askState?.dataAskSelected?.attributes?.deadline
              ? new Date(askState?.dataAskSelected?.attributes?.deadline)
              : new Date()
          }
        />
      )}
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default YourAskScreen;
