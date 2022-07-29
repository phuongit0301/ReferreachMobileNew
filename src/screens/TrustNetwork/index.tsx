import React, {useEffect, useState} from 'react';
import {Animated, RefreshControl, TextInput, View, TouchableOpacity, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {getNetworkConnectList, removeNetworkConnect} from '~Root/services/network/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {
  Avatar,
  Button,
  ButtonSecond,
  HeaderSmallTransparent,
  InputValidateControl,
  Link,
  Loading,
  LoadingSecondary,
  ModalDialogCommon,
  Paragraph,
} from '~Root/components';
import {IActionRemoveNetworkConnectionSuccess, IIncluded} from '~Root/services/network/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES, INVITE_CONTACT_FIELDS, INVITE_CONTACT_KEYS} from '~Root/config';
import {inviteUserContact} from '~Root/services/contact/actions';
import {IActionInviteUserContactSuccess} from '~Root/services/contact/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {invitationRequest} from '~Root/services/register/actions';
import {IActionInvitationSuccess} from '~Root/services/register/types';
import {TRUST_NETWORK_STATUS_ENUM} from '~Root/utils';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email('Invalid email format'),
});

const AirFeedScreen = ({route, navigation}: Props) => {
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
  const {dataInvite} = useSelector((state: IGlobalState) => state.registerState);

  const [refreshing, setRefreshing] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleInviteModal, setVisibleInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initPage, setInitPage] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [dataConfirm, setDataConfirm] = useState({
    visibleModal: false,
    item: null,
    itemIncluded: null,
  });
  const [visibleInvite, setVisibleInvite] = useState(false);

  useEffect(() => {
    initData((route?.params as any)?.inviteCode);
  }, [route, navigation]);

  const initData = (inviteCode = null) => {
    dispatch(showLoading());
    dispatch(
      getNetworkConnectList('', () => {
        setInitPage(true);
        if (inviteCode) {
          dispatch(
            invitationRequest(inviteCode, (response: IActionInvitationSuccess['payload']) => {
              if (response.success) {
                setVisibleInvite(true);
              } else {
                Toast.show({
                  position: 'bottom',
                  type: 'error',
                  text1: (response?.message as any)?.detail ?? t('invitation_not_found'),
                  visibilityTime: 2000,
                  autoHide: true,
                });
              }
              dispatch(hideLoading());
            }),
          );
        } else {
          dispatch(hideLoading());
        }
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
    if (initPage) {
      dispatch(
        getNetworkConnectList(textSearch, (response: any) => {
          setRefreshing(false);
        }),
      );
    }
  };

  const onShowConfirm = (item: any, itemIncluded: any) => {
    setDataConfirm({
      visibleModal: true,
      item,
      itemIncluded,
    });
  };

  const onHideConfirm = () => {
    setDataConfirm({
      visibleModal: false,
      item: null,
      itemIncluded: null,
    });
  };

  const onRemove = () => {
    if (!dataConfirm?.item) {
      return null;
    }

    setLoading(true);
    dispatch(
      removeNetworkConnect(
        (dataConfirm?.item as any)?.id,
        (response: IActionRemoveNetworkConnectionSuccess['payload']) => {
          if (response.success) {
            dispatch(
              getNetworkConnectList('', () => {
                onHideConfirm();
                setLoading(false);
              }),
            );
          } else {
            setLoading(false);
          }
        },
      ),
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

  const onOk = () => {
    navigation.setParams({inviteCode: null});
    setVisibleInvite(false);
  };

  const onChatPersonal = (item: any) => {
    // navigation.navigate(AppRoute.CHAT_PERSONAL, {contextId: item?.id});
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
                      title={`${itemIncluded?.attributes?.title ?? ''}`}
                      style={styles.textSmall}
                    />
                  </View>
                  <View style={[styles.btnContainer]}>
                    {visibleEdit ? (
                      <TouchableOpacity
                        style={[GlobalStyles.ph10, GlobalStyles.pv5]}
                        onPress={() => onShowConfirm(item, itemIncluded)}>
                        <FastImage source={IMAGES.iconDelete} resizeMode='contain' style={styles.iconMessage} />
                      </TouchableOpacity>
                    ) : item?.attributes?.status === TRUST_NETWORK_STATUS_ENUM.ACCEPTED ? (
                      <TouchableOpacity
                        style={[GlobalStyles.ph10, GlobalStyles.pv5, styles.iconMessageContainer]}
                        onPress={() => onChatPersonal(item)}>
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
              autoFocus={true}
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
      {dataConfirm?.visibleModal && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={true}
          onHideModal={onHideConfirm}
          styleModal={styles.styleModalRemove}>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter]}>
            <FastImage source={IMAGES.iconErrorGray} style={[GlobalStyles.mb15, GlobalStyles.iconErrors]} />
            <Trans
              i18nKey='trust_network_warning'
              parent={Text}
              values={{
                name: `${dataConfirm?.itemIncluded?.attributes?.first_name} ${dataConfirm?.itemIncluded?.attributes?.last_name}`,
              }}
              components={{
                normal: <Text style={[styles.textNormal, GlobalStyles.textCenter]} />,
                bold: <Text style={[styles.textBold, GlobalStyles.textCenter]} />,
              }}
              style={GlobalStyles.mb15}
            />
            <View
              style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.justifyBetween, styles.groupButton]}>
              <Link
                h5
                textGray3Color
                textDecoration
                title={t('cancel')}
                onPress={onHideConfirm}
                style={GlobalStyles.ph15}
              />

              <View style={GlobalStyles.container}>
                <Button
                  title={t('remove')}
                  h4
                  textCenter
                  onPress={onRemove}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...styles.buttonConfirmContainerStyle,
                  }}
                  textStyle={styles.h3BoldDefault}
                />
              </View>
            </View>
          </View>
        </ModalDialogCommon>
      )}
      {visibleInvite && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={true}
          onHideModal={onHideConfirm}
          styleModal={styles.styleModal}>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.alignCenter]}>
            <View style={GlobalStyles.alignCenter}>
              <Paragraph h5 textCenter bold600 title={t('accepted_invite')} style={GlobalStyles.mb15} />
              {dataInvite?.included &&
                dataInvite?.included?.length > 0 &&
                dataInvite?.included[0]?.attributes?.avatar_metadata && (
                  <Avatar
                    userInfo={{
                      ...dataInvite?.included[0]?.attributes?.avatar_metadata,
                      first_name: dataInvite?.included[0]?.attributes?.first_name,
                      last_name: dataInvite?.included[0]?.attributes?.last_name,
                    }}
                    styleAvatar={{...GlobalStyles.mr5, ...GlobalStyles.avatar}}
                    styleContainerGradient={{...GlobalStyles.alignCenter, ...GlobalStyles.mb10, ...GlobalStyles.avatar}}
                  />
                )}
              {dataInvite?.included && dataInvite?.included?.length > 0 && (
                <Paragraph
                  h4
                  bold
                  textSteelBlueColor
                  title={`${dataInvite?.included[0]?.attributes?.first_name ?? ''} ${
                    dataInvite?.included[0]?.attributes?.last_name ?? ''
                  }`}
                  style={GlobalStyles.mb20}
                />
              )}
              <ButtonSecond
                title={t('ok')}
                buttonContainerStyle={styles.btnDone}
                titleStyle={styles.titleStyle}
                onPress={onOk}
                showIcon={false}
              />
            </View>
          </View>
        </ModalDialogCommon>
      )}
      {loading && <LoadingSecondary />}
    </View>
  );
};

export default AirFeedScreen;
