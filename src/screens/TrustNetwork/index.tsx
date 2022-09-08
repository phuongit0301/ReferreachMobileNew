import React, {useEffect, useRef, useState} from 'react';
import {Animated, RefreshControl, TextInput, View, TouchableOpacity, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
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
import {onChatOneOnOneRequest} from '~Root/services/chat/actions';
import {getCredential} from '~Root/services/pubnub/actions';
import AnimatedHeader from './AnimatedHeader';

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
  const offset = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const networkState = useSelector((state: IGlobalState) => state.networkState);
  const {dataInvite} = useSelector((state: IGlobalState) => state.registerState);

  const [refreshing, setRefreshing] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleModal, setVisibleModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });
  const [loading, setLoading] = useState(false);
  const [initPage, setInitPage] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [dataConfirm, setDataConfirm] = useState({
    visibleModal: false,
    item: null,
    itemIncluded: null,
  });
  const [visibleInvite, setVisibleInvite] = useState(false);
  const [userNumber, setUserNumber] = useState(100);

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
    setVisibleModal({
      ...visibleModal,
      modal1: !visibleModal.modal1,
    });
  };

  const onOk = () => {
    navigation.setParams({inviteCode: null});
    setVisibleInvite(false);
  };

  const onChatPersonal = (item: any) => {
    if (item?.relationships?.connected_user?.data?.id) {
      const payload = {
        member_id: item?.relationships?.connected_user?.data?.id,
      };

      setLoading(true);
      dispatch(
        onChatOneOnOneRequest(payload, (response: any) => {
          dispatch(
            getCredential(() => {
              setLoading(false);
              if (response.success) {
                navigation.navigate(AppRoute.CHAT_PERSONAL, {contextId: response?.data.id});
              }
            }),
          );
        }),
      );
    }
  };

  const onSetUserNumber = (num: number) => {
    setUserNumber(num);
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  const headerHeight = offset.interpolate({
    inputRange: [0, 180],
    outputRange: [180, 88],
    extrapolate: 'clamp',
  });

  return (
    <View style={[GlobalStyles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent title={t('your_trust_network')} isRightButton={true} onRightPress={onToggleDrawer} />
        <AnimatedHeader animatedValue={offset} onVisibleInviteModal={onVisibleInviteModal} />
        <Animated.View
          style={[GlobalStyles.container, GlobalStyles.ph15, styles.container, {paddingTop: headerHeight}]}>
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
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {useNativeDriver: false})}
            showsVerticalScrollIndicator={false}
            data={networkState?.data}
            key={'trust-network'}
            keyExtractor={(item, index) => `trust-network-item-${index}`}
            ListFooterComponent={() => {
              return <View style={styles.footerContainer} />;
            }}
            ListHeaderComponent={() => {
              return (
                <View style={[GlobalStyles.flexColumn]}>
                  <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
                    <Paragraph h5 bold title='Ongoing Mass Invites' style={GlobalStyles.mb10} />
                    <View style={[GlobalStyles.flexColumn, GlobalStyles.p15, styles.blockArea]}>
                      <Paragraph p title='There is no ongoing Mass Invites' style={GlobalStyles.mb15} />
                      <Button
                        title='Mass Invite via QR code'
                        h3
                        textCenter
                        containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonSignUpContainerStyle}}
                        textStyle={styles.h3BoldSignUpDefault}
                      />
                    </View>
                  </View>
                  <View style={GlobalStyles.flexColumn}>
                    <Paragraph h5 bold title='Your Trust Network' style={GlobalStyles.mb10} />
                    <View style={[GlobalStyles.flexColumn, GlobalStyles.p15, styles.blockArea1]}>
                      <View style={GlobalStyles.flexRow}>
                        <View style={[GlobalStyles.container, GlobalStyles.mr5, styles.inputContainer]}>
                          <FastImage source={IMAGES.iconSearchBlack} style={[styles.iconSearch, GlobalStyles.mr10]} />
                          <TextInput
                            placeholder='Search for contacts'
                            value={textSearch}
                            style={[styles.input]}
                            onChangeText={onInputChange}
                          />
                        </View>
                        <TouchableOpacity
                          style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.justifyEnd]}
                          onPress={() => setVisibleEdit(!visibleEdit)}>
                          {visibleEdit ? (
                            <>
                              <View style={styles.iconEditBgActive}>
                                <FastImage source={IMAGES.iconEdit} resizeMode='contain' style={styles.iconEdit} />
                              </View>
                            </>
                          ) : (
                            <>
                              <View style={styles.iconEditBg}>
                                <FastImage source={IMAGES.iconEdit} resizeMode='contain' style={styles.iconEdit} />
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            renderItem={({item, index}: {item: any; index: number}) => {
              const itemIncluded: IIncluded = networkState?.included[index];

              return (
                <View
                  style={[
                    GlobalStyles.flexRow,
                    GlobalStyles.p10,
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
        </Animated.View>
      </SafeAreaView>
      {visibleModal.modal1 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal1}
          onHideModal={onVisibleInviteModal}
          styleModal={styles.styleModal}>
          <View style={[GlobalStyles.mb15, styles.headerContainer]}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15]}>
              <View style={[GlobalStyles.flexRow]}>
                <Paragraph
                  textSteelBlue2Color
                  h5
                  bold600
                  textCenter
                  title='Individual Invite'
                  style={[GlobalStyles.mb15, GlobalStyles.container]}
                />
                <TouchableOpacity onPress={onVisibleInviteModal}>
                  <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
                </TouchableOpacity>
              </View>
              <Button
                title={t('add_from_phone')}
                p
                textCenter
                containerStyle={{
                  ...GlobalStyles.buttonContainerStyle,
                  ...GlobalStyles.mb20,
                  ...styles.buttonContainerStyle,
                }}
                textStyle={styles.h3BoldDefault}
                disabled={!isValid}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15, GlobalStyles.fullWidth]}>
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
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]}>
              <View style={GlobalStyles.flexRow}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.container]}>
                  <Paragraph title='Tag' style={[GlobalStyles.mr10, styles.labelStyle]} />
                  <Paragraph title='Optional*' style={styles.highlight} />
                </View>
                <FastImage source={IMAGES.iconQuestion} resizeMode='cover' style={styles.iconQuestion} />
              </View>
              <TextInput placeholder='eg. bff, supplier. client' style={[styles.inputStyle, GlobalStyles.ph10]} />
            </View>
            <Button
              title={t('send_invite')}
              h5
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
      {visibleModal.modal2 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal2}
          onHideModal={onVisibleInviteModal}
          styleModal={styles.styleModal2}>
          <View style={[GlobalStyles.mb15, styles.headerContainer]}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15]}>
              <View style={[GlobalStyles.flexRow]}>
                <Paragraph
                  textSteelBlue2Color
                  h5
                  bold600
                  textCenter
                  title='Individual Invite'
                  style={[GlobalStyles.mb15, GlobalStyles.container]}
                />
                <TouchableOpacity onPress={onVisibleInviteModal}>
                  <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
                </TouchableOpacity>
              </View>
              <Button
                title={t('add_from_phone')}
                p
                textCenter
                containerStyle={{
                  ...GlobalStyles.buttonContainerStyle,
                  ...GlobalStyles.mb20,
                  ...styles.buttonContainerStyle,
                }}
                textStyle={styles.h3BoldDefault}
                disabled={!isValid}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.ph15]}>
            <View style={GlobalStyles.container}>
              <Button
                title={t('done')}
                h5
                textCenter
                onPress={handleSubmit(onSend)}
                containerStyle={{
                  ...GlobalStyles.buttonContainerStyle,
                  ...GlobalStyles.mr10,
                  ...styles.buttonContainer2Style,
                }}
                textStyle={styles.h3BoldDefault2}
              />
            </View>
            <View style={GlobalStyles.container}>
              <Button
                title={t('invite_more')}
                h5
                textCenter
                onPress={handleSubmit(onSend)}
                containerStyle={{
                  ...GlobalStyles.buttonContainerStyle,
                  ...styles.buttonContainerStyle2,
                }}
                textStyle={styles.h3BoldDefault}
                disabled={!isValid}
              />
            </View>
          </View>
        </ModalDialogCommon>
      )}
      {visibleModal.modal3 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal3}
          onHideModal={onVisibleInviteModal}
          styleModal={styles.styleModal3}>
          <View style={[GlobalStyles.mb15, styles.headerContainer1]}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15]}>
              <View style={[GlobalStyles.flexRow]}>
                <Paragraph
                  textSteelBlue2Color
                  h5
                  bold600
                  textCenter
                  title='Mass Invite'
                  style={[GlobalStyles.mb15, GlobalStyles.container]}
                />
                <TouchableOpacity onPress={onVisibleInviteModal}>
                  <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
              <Paragraph h6 textSteelBlue2Color title='Limit by number of users' style={GlobalStyles.mb10} />
              <View style={GlobalStyles.flexRow}>
                <TouchableOpacity
                  onPress={() => onSetUserNumber(50)}
                  style={[GlobalStyles.mr10, userNumber === 50 ? styles.circleActive : styles.circle]}>
                  {userNumber === 50 ? (
                    <Paragraph textWhite title='50' />
                  ) : (
                    <Paragraph textSteelBlue2Color title='50' />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onSetUserNumber(100)}
                  style={userNumber === 100 ? styles.circleActive : styles.circle}>
                  {userNumber === 100 ? (
                    <Paragraph textWhite title='100' />
                  ) : (
                    <Paragraph textSteelBlue2Color title='100' />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]}>
              <View style={GlobalStyles.flexRow}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.container]}>
                  <Paragraph title='Tag' style={[GlobalStyles.mr10, styles.labelStyle]} />
                  <Paragraph title='Optional*' style={styles.highlight} />
                </View>
                <FastImage source={IMAGES.iconQuestion} resizeMode='cover' style={styles.iconQuestion} />
              </View>
              <View>
                <TextInput placeholder='eg. bff, supplier. client' style={[styles.inputStyle, GlobalStyles.ph10]} />
                <View style={styles.tagCount}>
                  <Paragraph textLavenderGrayColor p title='0 / 12' />
                </View>
              </View>
            </View>
            <Button
              title={t('generate_qr_code')}
              h5
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
