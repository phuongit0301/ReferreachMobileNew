import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {
  Button,
  Paragraph,
  Category,
  Loading,
  HeaderSmallTransparent,
  AvatarGradient,
  LoadingSecondary,
} from '~Root/components';
import {IUserState} from '~Root/services/user/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {getPublicProfile} from '~Root/services/feed/actions';
import {IFeedItemsState, IIndustry} from '~Root/services/feed/types';
import {ILoadingState} from '~Root/services/loading/types';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IActionRemoveNetworkConnectionSuccess} from '~Root/services/network/types';
import {removeNetworkConnect} from '~Root/services/network/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {inviteUserContact} from '~Root/services/contact/actions';
import {uppercaseFirstLetterOfEachWordInASentance} from '~Root/utils/functions';

// type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileOtherScreen = ({navigation, route}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const feedState: IFeedItemsState = useSelector((state: IGlobalState) => state.feedState);
  const loadingState: ILoadingState = useSelector((state: IGlobalState) => state.loadingState);
  const [loading, setLoading] = useState(false);
  const {dataUser} = feedState;

  useEffect(() => {
    if (!route?.params?.id) {
      navigation.goBack();
      return;
    }
    dispatch(showLoading());
    dispatch(
      getPublicProfile(route?.params?.id, (response: any) => {
        dispatch(hideLoading());
      }),
    );
  }, [route?.params?.id]);

  const onBack = () => {
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation?.toggleDrawer();
  };

  const renderCategory = (items: IIndustry[]) => {
    const itemsRender = [];
    for (const item of items) {
      const tag = dataUser?.included.find(x => x?.id === item?.id);
      itemsRender.push(
        <Category
          styleTag={styles.styleTag}
          key={`public-industries-${tag?.id}`}
          itemKey={`${tag?.id}`}
          name={tag?.attributes?.name}
          showButton={false}
        />,
      );
    }

    return itemsRender;
  };

  const onProfile = () => {
    // navigation.navigate();
  };

  const onRemoveTrustNetwork = () => {
    setLoading(true);
    dispatch(
      removeNetworkConnect(
        dataUser?.meta?.network_connection_id,
        (response: IActionRemoveNetworkConnectionSuccess['payload']) => {
          setLoading(false);
          if (response.success) {
            navigation.navigate(AppRoute.TRUST_NETWORK);
          }
        },
      ),
    );
  };

  const onAddTrustNetwork = () => {
    const items = {
      email: 'user2@gmail.com',
      name: dataUser?.data?.attributes?.full_name,
      phone: '',
    };
    setLoading(true);
    dispatch(
      inviteUserContact([items], (response: IActionRemoveNetworkConnectionSuccess['payload']) => {
        setLoading(false);
        if (response.success) {
          navigation.navigate(AppRoute.AIR_FEED);
        }
      }),
    );
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container]} key={'profile-complete'}>
      <View style={[GlobalStyles.container, styles.container]}>
        <SafeAreaView style={GlobalStyles.container} edges={['top', 'bottom', 'right', 'left']}>
          <HeaderSmallTransparent
            title={t('user_profile', {
              name: uppercaseFirstLetterOfEachWordInASentance(dataUser?.data?.attributes?.first_name ?? ''),
            })}
            isBackButton={true}
            onBack={onBack}
            isRightButton={true}
            onRightPress={onToggleDrawer}
          />
          <View style={GlobalStyles.bgWhite}>
            <LinearGradient
              colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
              style={[GlobalStyles.center, GlobalStyles.pv20, styles.profileGradient]}>
              <View style={GlobalStyles.flexRow}>
                <TouchableOpacity onPress={onProfile}>
                  {dataUser?.data?.attributes?.avatar_metadata?.avatar_url ? (
                    <FastImage
                      source={{
                        uri: dataUser?.data?.attributes?.avatar_metadata?.avatar_url,
                      }}
                      resizeMode='cover'
                      onProgress={() => <ActivityIndicator />}
                      style={[GlobalStyles.avatar]}>
                      <View
                        style={{
                          transform: [
                            {translateX: +dataUser?.data?.attributes?.avatar_metadata?.avatar_lat ?? 0},
                            {translateY: +dataUser?.data?.attributes?.avatar_metadata?.avatar_lng ?? 0},
                          ],
                        }}
                      />
                    </FastImage>
                  ) : (
                    <AvatarGradient
                      title={`${dataUser?.data?.attributes?.first_name?.charAt(
                        0,
                      )}${dataUser?.data?.attributes?.last_name?.charAt(0)}`}
                      color1={BASE_COLORS.oxleyColor}
                      color2={BASE_COLORS.oxleyColor}
                      stylesContainer={GlobalStyles.mb15}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <ScrollView
            style={GlobalStyles.scrollViewWhiteNoMargin}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
              <View style={[GlobalStyles.container, GlobalStyles.mb15]}>
                {dataUser?.meta?.network_connection_id ? (
                  <Button
                    title={t('remove_trust_network')}
                    onPress={onRemoveTrustNetwork}
                    h5
                    textCenter
                    containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                    textStyle={styles.h3BoldDefault}
                    disabled={
                      userState?.userInfo?.self_industries.length === 0 ||
                      userState?.userInfo?.partner_industries.length === 0 ||
                      userState?.userInfo?.sell_industries.length === 0
                    }
                  />
                ) : (
                  <Button
                    title={t('invite_trust_network')}
                    onPress={onAddTrustNetwork}
                    h5
                    textCenter
                    containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                    textStyle={styles.h3BoldDefault}
                    disabled={
                      userState?.userInfo?.self_industries.length === 0 ||
                      userState?.userInfo?.partner_industries.length === 0 ||
                      userState?.userInfo?.sell_industries.length === 0
                    }
                  />
                )}
                <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb10]}>
                  <Paragraph
                    textSteelBlueColor
                    h5
                    bold600
                    title={`${dataUser?.data?.attributes?.first_name} ${dataUser?.data?.attributes?.last_name}`}
                    style={[GlobalStyles.container]}
                  />
                </View>
                <Paragraph
                  textSteelBlueColor
                  bold600
                  title={`${dataUser?.data?.attributes?.title ?? ''}`}
                  style={[GlobalStyles.alignCenter, GlobalStyles.container, GlobalStyles.mb10]}
                />
                <Paragraph
                  textBlack
                  title={`${dataUser?.data?.attributes?.pitch ?? ''}`}
                  style={[GlobalStyles.alignCenter, GlobalStyles.container]}
                />
                <View>
                  <View style={[GlobalStyles.mt15, GlobalStyles.flexColumn]}>
                    <Paragraph h5 style={[styles.labelStyle]} title={`${t('your_industry')}*`} />
                    <View style={[GlobalStyles.flexRow, styles.tagContainer]}>
                      {dataUser?.data?.relationships?.self_industries?.data &&
                        dataUser?.data?.relationships?.self_industries?.data.length > 0 &&
                        renderCategory(dataUser?.data?.relationships?.self_industries?.data)}
                    </View>
                  </View>
                  <View style={[GlobalStyles.mt15, GlobalStyles.flexColumn]}>
                    <Paragraph h5 style={[styles.labelStyle]} title={`${t('you_sell_to')}*`} />
                    <View style={[GlobalStyles.flexRow, styles.tagContainer]}>
                      {dataUser?.data?.relationships?.sell_industries?.data &&
                        dataUser?.data?.relationships?.sell_industries?.data.length > 0 &&
                        renderCategory(dataUser?.data?.relationships?.sell_industries?.data)}
                    </View>
                  </View>
                  <View style={[GlobalStyles.mt15, GlobalStyles.flexColumn]}>
                    <Paragraph h5 style={[styles.labelStyle]} title={`${t('your_partners')}*`} />
                    <View style={[GlobalStyles.flexRow, styles.tagContainer]}>
                      {dataUser?.data?.relationships?.partner_industries?.data &&
                        dataUser?.data?.relationships?.partner_industries?.data.length > 0 &&
                        renderCategory(dataUser?.data?.relationships?.partner_industries?.data)}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default ProfileOtherScreen;
