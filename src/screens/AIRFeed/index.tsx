import React, {useEffect, useState} from 'react';
import {
  Animated,
  RefreshControl,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Easing,
  Share,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {
  getFeedItemPagination,
  getFeedItemsList,
  getSuggestIntroductionsList,
  setFeedIntroductions,
  setFeedItemRead,
  setVisibleMenu,
} from '~Root/services/feed/actions';
import {AirFeedItem, Avatar, Button, HeaderSmallTransparent, Loading, Paragraph} from '~Root/components';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IDataSuggest, IFeedItemsState} from '~Root/services/feed/types';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import {DEEP_LINK_URL} from '~Root/private/api';
import styles from './styles';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const AirFeedScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const scrollAnim = new Animated.Value(0);

  const dispatch = useDispatch();
  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [animation, setAnimation] = useState({
    expanded: false,
    opacity: new Animated.Value(0),
    height: new Animated.Value(0),
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dispatch(
      getSuggestIntroductionsList(
        {
          networkPer: feedState.networkPer,
          networkPage: feedState.networkPage,
          keyword: textSearch,
        },
        () => {
          console.log(12323);
        },
      ),
    );
  }, [textSearch]);

  const initData = () => {
    dispatch(showLoading());
    dispatch(
      getFeedItemsList({page: 1, networkPer: feedState.networkPer, networkPage: feedState.networkPage}, () => {
        dispatch(hideLoading());
      }),
    );
  };

  const feedItemAttributes = feedState.dataFeed?.included?.length > 0 ? feedState.dataFeed?.included[0] : null;
  const feedItemData = feedState.dataFeed?.data?.length > 0 ? feedState.dataFeed?.data[0] : null;

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onInputChange = (text: string) => {
    setTextSearch(text);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const onToggle = () => {
    Animated.timing(animation?.height, {
      toValue: animation?.expanded ? 0 : 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation?.opacity, {
        toValue: animation?.expanded ? 0 : 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });

    setAnimation({...animation, expanded: !animation?.expanded});
  };

  const onPrev = () => {
    if (+feedState?.page > 1) {
      setLoading(true);
      dispatch(
        getFeedItemPagination(+feedState?.page - 1, () => {
          setLoading(false);
        }),
      );
    }
  };

  const onNext = (item: any) => {
    if (+feedState?.page < +feedState?.dataFeed?.meta?.total_pages) {
      setLoading(true);
      dispatch(
        getFeedItemPagination(+feedState?.page + 1, (response: IFeedItemsState['dataFeed']) => {
          if (response?.data?.length > 0) {
            dispatch(
              setFeedItemRead(+item?.id, () => {
                setLoading(false);
              }),
            );
          }
        }),
      );
    }
  };

  const visibleAnim = animation.opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const onMenu = (evt?: any) => {
    evt.persist();

    dispatch(
      setVisibleMenu({
        dataSelected: feedItemAttributes,
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
        dataSelected: null,
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

  const onShare = async () => {
    try {
      onMenuHide();
      await Share.share({
        title: feedState?.dataSelected?.attributes?.greeting ?? '',
        message: `${DEEP_LINK_URL}/a/${feedState?.dataSelected?.id}`,
      });
    } catch (error) {
      Alert.alert((error as any).message);
    }
  };

  const onShareButtonPress = async () => {
    try {
      await Share.share({
        title: feedItemAttributes?.attributes?.greeting ?? '',
        message: `${DEEP_LINK_URL}/a/${feedItemAttributes?.id}`,
      });
    } catch (error) {
      Alert.alert((error as any).message);
    }
  };

  const onProfile = () => {
    if (feedState?.dataFeed?.data?.length > 0) {
      navigation.navigate(AppRoute.MAIN_NAVIGATOR, {
        screen: AppRoute.PROFILE_OTHER,
        params: {
          id: feedState?.dataFeed?.data[0]?.attributes?.user?.id,
        },
      });
    }
  };

  const onIntro = (item: IFeedItemsState['dataNetwork']) => {
    dispatch(setFeedIntroductions(item));
    navigation.navigate(AppRoute.INDIVIDUAL_MESSAGE_MODAL);
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <KeyboardAwareScrollView>
          <HeaderSmallTransparent title={t('air_feed')} isRightButton={true} onRightPress={onToggleDrawer} />
          <View style={[GlobalStyles.container, styles.container]}>
            {feedState?.dataFeed?.data.length > 0 && (
              <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
                <LinearGradient
                  colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
                  style={[GlobalStyles.p15, GlobalStyles.pb60, GlobalStyles.flexColumn, styles.profileGradient]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                    <View style={[GlobalStyles.flexRow, GlobalStyles.mr10]}>
                      <Avatar
                        styleAvatar={GlobalStyles.avatar2}
                        userInfo={{
                          avatar_url: feedItemData?.attributes?.user?.avatar_metadata?.avatar_url,
                          avatar_lat: feedItemData?.attributes?.user?.avatar_metadata?.avatar_lat,
                          avatar_lng: feedItemData?.attributes?.user?.avatar_metadata?.avatar_lng,
                          first_name: feedItemData?.attributes?.user?.first_name,
                          last_name: feedItemData?.attributes?.user?.last_name,
                        }}
                        onProfile={onProfile}
                      />
                    </View>
                    <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
                      <Paragraph
                        textWhite
                        bold600
                        title={`${feedItemData?.attributes?.user?.first_name ?? ''} ${
                          feedItemData?.attributes?.user?.last_name ?? ''
                        }`}
                      />
                      {feedItemData?.attributes?.user?.title && (
                        <Paragraph textWhite title={`${feedItemData?.attributes?.user?.title}`} />
                      )}
                    </View>
                    <TouchableOpacity style={styles.iconThreeDotContainer} onPress={onMenu}>
                      <FastImage source={IMAGES.iconThreeDotWhite} resizeMode='cover' style={styles.iconThreeDot} />
                    </TouchableOpacity>
                  </View>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.mv15]}>
                    <Trans
                      i18nKey='air_feed_content'
                      values={{
                        greeting: feedItemAttributes?.attributes?.greeting,
                        role: feedItemAttributes?.attributes?.user_role,
                        demographic: feedItemAttributes?.attributes?.demographic,
                        businessRequirement: feedItemAttributes?.attributes?.business_requirement,
                        businessDetail: feedItemAttributes?.attributes?.business_detail,
                      }}
                      parent={Text}
                      components={{
                        normal: <Text style={styles.contentNormal} />,
                        highlight: <Text style={styles.contentBold} />,
                      }}
                    />
                  </View>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
                    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mr20]}>
                      <FastImage
                        source={IMAGES.iconCalendarWhite}
                        resizeMode='cover'
                        style={[GlobalStyles.mr10, styles.iconCalendar]}
                      />
                      <Paragraph
                        textWhite
                        title={moment(feedItemAttributes?.attributes?.deadline).format('MMM DD, YYYY')}
                      />
                    </View>
                    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styles.globeContainer]}>
                      <FastImage
                        source={IMAGES.iconGlobeWhite}
                        resizeMode='cover'
                        style={[GlobalStyles.mr10, styles.iconGlobe]}
                      />
                      <Paragraph
                        textWhite
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        title={feedItemAttributes?.attributes?.ask_location?.text}
                      />
                    </View>
                  </View>
                  <Animated.View
                    style={[
                      GlobalStyles.flexColumn,
                      {opacity: visibleAnim, display: animation?.expanded ? 'flex' : 'none'},
                    ]}>
                    {feedItemAttributes?.attributes?.criterium &&
                      feedItemAttributes?.attributes?.criterium?.length > 0 && (
                        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]}>
                          <Paragraph textWhite bold600 title='Criteria' style={GlobalStyles.mb10} />
                          {feedItemAttributes?.attributes?.criterium.map((item, index) => (
                            <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]} key={`feed-criterium-${index}`}>
                              <FastImage
                                source={IMAGES.iconCircleCheckWhite}
                                resizeMode='cover'
                                style={[GlobalStyles.mr10, styles.iconCircle]}
                              />
                              <Paragraph textWhite title={item?.text} />
                            </View>
                          ))}
                        </View>
                      )}
                    {feedItemAttributes?.attributes?.documents &&
                      feedItemAttributes?.attributes?.documents.length > 0 && (
                        <View style={[GlobalStyles.flexRow, GlobalStyles.mb15]}>
                          {feedItemAttributes?.attributes?.documents.map((item, index) =>
                            item?.content_type?.includes('pdf') ? (
                              <FastImage
                                source={IMAGES.iconPdf}
                                resizeMode='cover'
                                key={`air-feed-file-${index}`}
                                style={[GlobalStyles.mr10, styles.icon]}
                              />
                            ) : (
                              <FastImage
                                source={IMAGES.iconXls}
                                resizeMode='cover'
                                style={styles.icon}
                                key={`air-feed-file-${index}`}
                              />
                            ),
                          )}
                        </View>
                      )}
                  </Animated.View>
                  <View style={GlobalStyles.flexRow}>
                    {animation?.expanded ? (
                      <TouchableOpacity style={GlobalStyles.container} onPress={onToggle}>
                        <Paragraph textWhite bold600 title={`${t('read_less')}...`} style={styles.textUnderline} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={GlobalStyles.container} onPress={onToggle}>
                        <Paragraph textWhite bold600 title={`${t('read_more')}...`} style={styles.textUnderline} />
                      </TouchableOpacity>
                    )}
                    {feedItemAttributes?.attributes?.edited && <Paragraph textBrightGrayColor title='edited' />}
                  </View>
                  {loading && (
                    <View style={GlobalStyles.waitingContainer}>
                      <ActivityIndicator animating={true} size='large' color={`${BASE_COLORS.forestGreenColor}`} />
                    </View>
                  )}
                </LinearGradient>
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyCenter, styles.btnGroup]}>
                  <TouchableOpacity style={[GlobalStyles.mr20, styles.btnCircle]} onPress={onPrev} disabled={loading}>
                    <Paragraph
                      textCenter
                      textForestGreenColor
                      bold600
                      title={t('prev_ask').toUpperCase()}
                      style={styles.btnText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnCircle}
                    onPress={() => onNext(feedItemAttributes)}
                    disabled={loading}>
                    <Paragraph
                      textCenter
                      textForestGreenColor
                      bold600
                      title={t('next_ask').toUpperCase()}
                      style={styles.btnText2}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15]}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={t('search_for_contacts')}
                  value={textSearch}
                  style={styles.input}
                  onChangeText={onInputChange}
                  autoCapitalize='none'
                />
                <FastImage source={IMAGES.iconSearch} style={styles.iconSearch} />
              </View>
              <Animated.FlatList
                contentContainerStyle={styles.contentContainer}
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
                data={feedState?.dataNetwork?.data}
                key={'air-feed'}
                keyExtractor={(item, index) => `air-feed-item-${item?.id}-${index}`}
                renderItem={({item, index}: {item: IDataSuggest; index: number}) => (
                  <AirFeedItem
                    item={feedState?.dataNetwork.included[index]}
                    key={`ask-item-${index}`}
                    onIntro={() =>
                      onIntro({data: [item], included: [feedState?.dataNetwork.included[index]], meta: null})
                    }
                    onShare={onShareButtonPress}
                  />
                )}
                ListEmptyComponent={() => (
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      GlobalStyles.center,
                      GlobalStyles.mt15,
                      GlobalStyles.pv15,
                      GlobalStyles.ph10,
                      styles.cardContainer,
                    ]}>
                    <View style={GlobalStyles.container}>
                      <FastImage source={IMAGES.onboard2} resizeMode='cover' style={styles.cardImage} />
                    </View>
                    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
                      <Paragraph p bold600 textWhite title={t('scale_your_network')} style={GlobalStyles.mt10} />
                      <Paragraph
                        textWhite
                        title={t('inviting_more_friends')}
                        style={[GlobalStyles.mt10, styles.text]}
                      />
                      <Button
                        title={t('invite_friends')}
                        p
                        bold600
                        textCenter
                        containerStyle={{
                          ...GlobalStyles.buttonContainerStyle,
                          ...GlobalStyles.mt15,
                          ...styles.buttonContainerStyle,
                        }}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {feedState?.visibleMenu?.show && (
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
              {...feedState?.visibleMenu?.coordinate},
            ]}>
            <TouchableOpacity
              style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onPress={onShare}>
              <View
                style={[
                  GlobalStyles.justifyCenter,
                  GlobalStyles.justifyCenter,
                  GlobalStyles.mr5,
                  styles.iconEditAskContainer,
                ]}>
                <FastImage source={IMAGES.iconShareThis} resizeMode='contain' style={styles.iconEditAsk} />
              </View>
              <Paragraph title={t('share_this')} />
            </TouchableOpacity>
            <View style={[GlobalStyles.justifyCenter, styles.border]} />
            <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.pv8]}>
              <View
                style={[
                  GlobalStyles.alignCenter,
                  GlobalStyles.justifyCenter,
                  GlobalStyles.mr5,
                  styles.iconStartChatContainer,
                ]}>
                <FastImage source={IMAGES.iconStartChat} resizeMode='cover' style={styles.iconEndAsk} />
              </View>
              <Paragraph title={t('start_chat')} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AirFeedScreen;
