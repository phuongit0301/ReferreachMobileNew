import React, {useEffect, useState} from 'react';
import {Animated, RefreshControl, TextInput, View, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {getNetworkConnectList, removeNetworkConnect} from '~Root/services/network/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {
  Avatar,
  Button,
  HeaderSmallTransparent,
  InputValidateControl,
  Loading,
  LoadingSecondary,
  ModalDialogCommon,
  Paragraph,
} from '~Root/components';
import {IActionRemoveNetworkConnectionSuccess, IIncluded} from '~Root/services/network/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES, INVITE_CONTACT_FIELDS, INVITE_CONTACT_KEYS} from '~Root/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import { inviteUserContact } from '~Root/services/contact/actions';
import { IActionInviteUserContactSuccess } from '~Root/services/contact/types';
import { IPaginationAndSearch } from '~Root/services/ask/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email('Invalid email format'),
});

const AirFeedScreen = ({navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const scrollAnim = new Animated.Value(0);

  const dispatch = useDispatch();
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const networkState = useSelector((state: IGlobalState) => state.networkState);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleInviteModal, setVisibleInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initPage, setInitPage] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    initData();
  }, [navigation]);

  const initData = () => {
    dispatch(showLoading());
    dispatch(
      getNetworkConnectList('', () => {
        setInitPage(true);
        dispatch(hideLoading());
      }),
    );
  };

  useEffect(() => {
    if (initPage) {
      dispatch(
        getNetworkConnectList(textSearch, (response: any) => {
          console.log('search response====>', response);
        }),
      );
    }
  }, [textSearch]);

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

  const onRemove = (id: string) => {
    setLoading(true);
    dispatch(
      removeNetworkConnect(id, (response: IActionRemoveNetworkConnectionSuccess['payload']) => {
        console.log('return data=======>', response);
        if (response.success) {
          dispatch(
            getNetworkConnectList('', () => {
              setLoading(false);
            }),
          );
        } else {
          setLoading(false);
        }
      }),
    );
  };

  const onSend: SubmitHandler<any> = (credentials: any) => {
    dispatch(showLoading());
    dispatch(
      inviteUserContact([credentials], (response: IActionInviteUserContactSuccess['payload']) => {
        dispatch(hideLoading());
        onVisibleInviteModal();
      }),
    );
  };

  const onSubmitEditing = () => {
    setFocus(INVITE_CONTACT_KEYS.email);
  };

  const onVisibleInviteModal = () => {
    setVisibleInviteModal(!visibleInviteModal);
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent title={t('your_trust_network')} isRightButton={true} onRightPress={onToggleDrawer} />
        <View style={[GlobalStyles.container, GlobalStyles.ph15, styles.container]}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Search for contacts'
              value={textSearch}
              style={styles.input}
              onChangeText={onInputChange}
            />
            <FastImage source={IMAGES.iconSearch} style={styles.iconSearch} />
          </View>
          <TouchableOpacity
            style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.justifyEnd, GlobalStyles.mv15]}
            onPress={() => setVisibleEdit(!visibleEdit)}>
            {visibleEdit ? (
              <>
                <Paragraph p textForestGreenColor title={t('cancel_edit')} style={GlobalStyles.mr5} />
                <View style={styles.iconEditBgActive}>
                  <FastImage source={IMAGES.iconEdit} resizeMode='contain' style={styles.iconEdit} />
                </View>
              </>
            ) : (
              <>
                <Paragraph p textDarkGrayColor title={t('edit')} style={GlobalStyles.mr5} />
                <View style={styles.iconEditBg}>
                  <FastImage source={IMAGES.iconEdit} resizeMode='contain' style={styles.iconEdit} />
                </View>
              </>
            )}
          </TouchableOpacity>
          <Animated.FlatList
            contentContainerStyle={[GlobalStyles.pb150]}
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
            data={networkState?.data}
            key={'trust-network'}
            keyExtractor={(item, index) => `trust-network-item-${index}`}
            renderItem={({item, index}: {item: any; index: number}) => {
              const itemIncluded: IIncluded = networkState?.included[index];

              return (
                <View
                  style={[
                    GlobalStyles.flexRow,
                    GlobalStyles.p10,
                    GlobalStyles.mb15,
                    GlobalStyles.alignCenter,
                    GlobalStyles.flexWrap,
                    styles.itemContainer,
                  ]}>
                  <Avatar
                    userInfo={{
                      ...itemIncluded?.attributes?.avatar_metadata,
                      first_name: itemIncluded?.attributes?.first_name,
                      last_name: itemIncluded?.attributes?.last_name,
                    }}
                    styleAvatar={{...GlobalStyles.mr5, ...styles.avatar}}
                    styleContainerGradient={{...GlobalStyles.alignCenter, ...styles.avatarContainer}}
                  />
                  <View style={[GlobalStyles.flexColumn, styles.nameContainer]}>
                    {itemIncluded?.attributes?.first_name && itemIncluded?.attributes?.last_name ? (
                      <Paragraph
                        p
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        textDarkGrayColor
                        title={`${itemIncluded?.attributes?.first_name} ${itemIncluded?.attributes?.last_name}`}
                      />
                    ) : (
                      <Paragraph
                        p
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        textDarkGrayColor
                        title={`${itemIncluded?.attributes.phone ?? ''}`}
                      />
                    )}
                    <Paragraph
                      textDarkGrayColor
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      title={`${itemIncluded?.attributes?.title}`}
                      style={styles.textSmall}
                    />
                  </View>
                  <View style={[styles.btnContainer]}>
                    {visibleEdit ? (
                      <TouchableOpacity
                        style={[GlobalStyles.ph10, GlobalStyles.pv5]}
                        onPress={() => onRemove(item?.id)}>
                        <FastImage source={IMAGES.iconDelete} resizeMode='contain' style={styles.iconMessage} />
                      </TouchableOpacity>
                    ) : !itemIncluded?.attributes?.status ? (
                      <TouchableOpacity style={[GlobalStyles.ph10, GlobalStyles.pv5, styles.iconMessageContainer]}>
                        <FastImage source={IMAGES.iconMessage} resizeMode='contain' style={styles.iconMessage} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={[GlobalStyles.ph10, GlobalStyles.pv5, styles.btnText]}>
                        <Paragraph textWhite title='Pending' />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          style={[GlobalStyles.pv5, GlobalStyles.ph15, styles.btnBottom]}
          onPress={onVisibleInviteModal}>
          <Paragraph h1 textWhite title='+' />
        </TouchableOpacity>
      </SafeAreaView>
      {visibleInviteModal && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleInviteModal}
          onHideModal={onVisibleInviteModal}
          styleModal={styles.styleModal}>
          <Paragraph textBlack bold600 textLeft title='Send an invite to your friend!' style={GlobalStyles.mb15} />
          <View style={[GlobalStyles.flexColumn, GlobalStyles.fullWidth]}>
            <InputValidateControl
              label={t('name')}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              selectionColor={BASE_COLORS.blackColor}
              placeholderTextColor={BASE_COLORS.blackColor}
              errors={errors}
              textErrorStyle={GlobalStyles.mt5}
              control={control}
              name={INVITE_CONTACT_FIELDS.name}
              register={register}
              onSubmitEditing={onSubmitEditing}
            />
            <InputValidateControl
              label={t('email')}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              selectionColor={BASE_COLORS.blackColor}
              placeholderTextColor={BASE_COLORS.blackColor}
              errors={errors}
              textErrorStyle={GlobalStyles.mt5}
              control={control}
              name={INVITE_CONTACT_FIELDS.email}
              register={register}
              autoFocus={true}
              keyboardType='email-address'
            />
            <Button
              title={t('send_invite')}
              h4
              textCenter
              onPress={handleSubmit(onSend)}
              containerStyle={{
                ...GlobalStyles.buttonContainerStyle,
                ...GlobalStyles.mb20,
                ...styles.buttonContainerStyle,
              }}
              textStyle={styles.h3BoldDefault}
              disabled={!isValid}
            />
          </View>
        </ModalDialogCommon>
      )}
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default AirFeedScreen;
