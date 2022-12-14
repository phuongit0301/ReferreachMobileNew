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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {AirFeedItem, Avatar, Button, HeaderSmallTransparent, Loading, Paragraph} from '~Root/components';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {getAskDetails} from '~Root/services/askDetails/actions';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const AskDetailsScreen = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const scrollAnim = new Animated.Value(0);

  const dispatch = useDispatch();
  const askDetailState = useSelector((state: IGlobalState) => state.askDetailState);
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
    initData();
  }, [navigation]);

  const initData = () => {
    console.log('details=============>');
    if (!route?.params?.id) {
      navigation.goBack();
      return;
    }
    dispatch(showLoading());
    dispatch(
      getAskDetails((route?.params as any)?.id, () => {
        dispatch(hideLoading());
      }),
    );
  };

  const onToggleDrawer = () => {
    navigation.goBack();
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

  const visibleAnim = animation.opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const askDetailAttributes =
    askDetailState.dataDetails?.included?.length > 0 ? askDetailState.dataDetails?.included[0] : null;
  const askDetails = askDetailState.dataDetails?.data ?? null;

  if (loadingState?.loading || !askDetails) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent
          title={''}
          isRightButton={true}
          onRightPress={onToggleDrawer}
          iconRightUrl={IMAGES.iconCloseBlueTransparent}
          iconRightContainerStyle={GlobalStyles.justifyCenter}
          iconRightStyle={styles.iconRightStyle}
        />
        <View style={[GlobalStyles.container, styles.container]}>
          <View style={[GlobalStyles.flexColumn]}>
            <LinearGradient
              colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
              style={[GlobalStyles.p15, GlobalStyles.pb40, GlobalStyles.flexColumn, styles.profileGradient]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mr10]}>
                  <Avatar
                    styleAvatar={GlobalStyles.avatar2}
                    userInfo={{
                      avatar_url: askDetailAttributes?.attributes?.avatar_metadata?.avatar_url,
                      avatar_lat: askDetailAttributes?.attributes?.avatar_metadata?.avatar_lat,
                      avatar_lng: askDetailAttributes?.attributes?.avatar_metadata?.avatar_lng,
                      first_name: askDetailAttributes?.attributes?.first_name,
                      last_name: askDetailAttributes?.attributes?.last_name,
                    }}
                  />
                </View>
                <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
                  <Paragraph
                    textWhite
                    bold600
                    title={`${askDetailAttributes?.attributes?.first_name ?? ''} ${
                      askDetailAttributes?.attributes?.last_name ?? ''
                    }`}
                  />
                  {askDetailAttributes?.attributes?.title && (
                    <Paragraph textWhite title={`${askDetailAttributes?.attributes?.title}`} />
                  )}
                </View>
                <TouchableOpacity style={styles.iconThreeDotContainer}>
                  <FastImage source={IMAGES.iconThreeDotWhite} resizeMode='cover' style={styles.iconThreeDot} />
                </TouchableOpacity>
              </View>
              <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.mv15]}>
                <Trans
                  i18nKey='air_feed_content'
                  values={{
                    greeting: askDetails?.attributes?.greeting,
                    demographic: askDetails?.attributes?.demographic,
                    role: askDetails?.attributes?.business_requirement,
                    description: askDetails?.attributes?.additional_detail,
                    businessDetail: askDetails?.attributes?.business_detail,
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
                  <Paragraph textWhite title={moment(askDetails?.attributes?.deadline).format('MMM DD, YYYY')} />
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
                    title={askDetails?.attributes?.ask_location?.text}
                  />
                </View>
              </View>
              <Animated.View
                style={[
                  GlobalStyles.flexColumn,
                  {opacity: visibleAnim, display: animation?.expanded ? 'flex' : 'none'},
                ]}>
                {askDetails?.attributes?.criterium && askDetails?.attributes?.criterium?.length > 0 && (
                  <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]}>
                    <Paragraph textWhite bold600 title='Criteria' style={GlobalStyles.mb10} />
                    {askDetails?.attributes?.criterium.map((item, index) => (
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
                {askDetails?.attributes?.documents && askDetails?.attributes?.documents.length > 0 && (
                  <View style={[GlobalStyles.flexRow, GlobalStyles.mb15]}>
                    {askDetails?.attributes?.documents.map((item, index) =>
                      item?.content_type?.includes('pdf') ? (
                        <FastImage
                          source={IMAGES.iconPdf}
                          resizeMode='cover'
                          style={[GlobalStyles.mr10, styles.icon]}
                        />
                      ) : (
                        <FastImage source={IMAGES.iconXls} resizeMode='cover' style={styles.icon} />
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
                {askDetails?.attributes?.edited && <Paragraph textBrightGrayColor title='edited' />}
              </View>
              {loading && (
                <View style={GlobalStyles.waitingContainer}>
                  <ActivityIndicator animating={true} size='large' color={`${BASE_COLORS.forestGreenColor}`} />
                </View>
              )}
            </LinearGradient>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15]}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={t('search_for_contacts')}
                value={textSearch}
                style={styles.input}
                onChangeText={onInputChange}
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
              data={askDetailState?.dataNetwork?.data}
              key={'air-feed'}
              keyExtractor={(item, index) => `air-feed-item-${index}`}
              renderItem={({item, index}: {item: any; index: number}) => (
                <AirFeedItem item={askDetailState?.dataNetwork.included[index]} key={`ask-item-${index}`} />
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
                    <Paragraph textWhite title={t('inviting_more_friends')} style={[GlobalStyles.mt10, styles.text]} />
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
      </SafeAreaView>
    </View>
  );
};

export default AskDetailsScreen;
