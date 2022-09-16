import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  RefreshControl,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Toast from 'react-native-toast-message';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {
  createMassInvitationRequest,
  getMassInvitationListRequest,
  getNetworkConnectList,
  removeNetworkConnect,
  setMassInvitation,
} from '~Root/services/network/actions';
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
import {IActionRemoveNetworkConnectionSuccess, IIncluded, IMassInvitationListTags} from '~Root/services/network/types';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles, IMAGES, INVITE_CONTACT_FIELDS, INVITE_CONTACT_KEYS} from '~Root/config';
import {inviteUserContact} from '~Root/services/contact/actions';
import {IActionInviteUserContactSuccess} from '~Root/services/contact/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {invitationRejectRequest, invitationRequest, setDataInvitation} from '~Root/services/register/actions';
import {IActionInvitationSuccess} from '~Root/services/register/types';
import {adjust, TRUST_NETWORK_STATUS_ENUM} from '~Root/utils';
import {onChatOneOnOneRequest} from '~Root/services/chat/actions';
import {getCredential} from '~Root/services/pubnub/actions';
import AnimatedHeader from './AnimatedHeader';
import {DEEP_LINK_URL} from '~Root/private/api';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email('Invalid email format'),
});

const {width: deviceWidth} = Dimensions.get('screen');

const AirFeedScreen = ({route, navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
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
    modal4: false,
    modal5: false,
    modal6: false, // modal invite details
    modal7: false, // modal accept or deny
    modal8: false, // modal invite error
  });
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [initPage, setInitPage] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [textInviteCode, setTextInviteCode] = useState('');
  const [tag, setTag] = useState('');
  const [dataConfirm, setDataConfirm] = useState({
    visibleModal: false,
    item: null,
    itemIncluded: null,
  });
  const [visibleInvite, setVisibleInvite] = useState(false);
  const [userNumber, setUserNumber] = useState(100);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      initData((route?.params as any)?.inviteCode);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [route, navigation]);

  const initData = (inviteCode = null) => {
    dispatch(showLoading());
    dispatch(
      getNetworkConnectList('', () => {
        setInitPage(true);
        if (inviteCode) {
          dispatch(
            invitationRequest(inviteCode, (response: IActionInvitationSuccess['payload']) => {
              dispatch(
                getMassInvitationListRequest(() => {
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
            }),
          );
        } else {
          dispatch(
            getMassInvitationListRequest(() => {
              dispatch(hideLoading());
            }),
          );
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
        setValue('name', '');
        setValue('email', '');
        dispatch(hideLoading());
        setVisibleModal({
          ...visibleModal,
          modal1: false,
          modal2: true,
        });
      }),
    );
  };

  const onInviteMore = () => {
    setVisibleModal({
      ...visibleModal,
      modal1: true,
      modal2: false,
    });
  };

  const onDone = () => {
    setVisibleModal({
      ...visibleModal,
      modal1: false,
    });
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

  const onVisibleJoinModal = () => {
    setVisibleModal({
      ...visibleModal,
      modal5: !visibleModal.modal5,
    });
  };

  const onHideJoinModal = () => {
    setVisibleModal({
      ...visibleModal,
      modal5: false,
    });
  };

  const onVisibleMassModal = () => {
    setVisibleModal({
      ...visibleModal,
      modal3: !visibleModal.modal3,
    });
  };

  const onCreateMassQrModal = () => {
    const payload: any = {
      amount: userNumber,
    };

    if (tag !== '') {
      payload.tag_list = tag;
    }

    dispatch(
      createMassInvitationRequest(payload, (response: IActionInvitationSuccess['payload']) => {
        if (response.success) {
          setVisibleModal({
            ...visibleModal,
            modal3: false,
            modal4: true,
          });
        } else {
          Toast.show({
            position: 'bottom',
            type: 'error',
            text1: response?.message,
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      }),
    );
  };

  const onShowMassQrModal = (item: any) => {
    dispatch(setMassInvitation({data: item}));
    setVisibleModal({
      ...visibleModal,
      modal3: false,
      modal4: true,
    });
  };

  const onHideMassQrModal = () => {
    setVisibleModal({
      ...visibleModal,
      modal4: false,
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

  const onShare = async () => {
    try {
      if (!networkState.dataMassInvitation?.attributes?.code) {
        return false;
      }
      
      await Share.share({
        title: `Mass Invite QR`,
        message: `${DEEP_LINK_URL}/i/${networkState.dataMassInvitation?.attributes?.code}`,
      });
    } catch (error) {
      Alert.alert((error as any).message);
    }
  };

  const copyToClipboard = (code: string) => {
    Clipboard.setString(code);
  };

  const joinArrayToString = (arr: IMassInvitationListTags[]) => {
    const items = arr.map((x: IMassInvitationListTags) => x.name);
    return items.join('", "');
  };

  const onAccept = () => {
    setVisibleModal({
      ...visibleModal,
      modal7: true,
    });
  };

  const onModalOk = () => {
    dispatch(setDataInvitation(null));
    setVisibleModal({
      ...visibleModal,
      modal6: false,
      modal7: false,
    });
  };

  const onReject = () => {
    if (textInviteCode) {
      dispatch(showLoading());
      dispatch(
        invitationRejectRequest(textInviteCode, (response: any) => {
          dispatch(hideLoading());
          Toast.show({
            position: 'bottom',
            type: 'success',
            text1: t('invitation_rejected'),
            visibilityTime: 1200,
            autoHide: true,
          });
          setTimeout(() => {
            setVisibleModal({
              ...visibleModal,
              modal6: false,
              modal7: false,
            });
          }, 1250);
        }),
      );
    }
  };

  const handleInvite = () => {
    if (textInviteCode !== '') {
      setModalLoading(true);
      dispatch(
        invitationRequest(textInviteCode, async (response: any) => {
          setModalLoading(false);
          if (response.success) {
            if (response?.data?.data?.attributes?.status === 'unused') {
              setVisibleModal({
                ...visibleModal,
                modal5: false,
                modal6: true,
              });
            }
          } else {
            setVisibleModal({
              ...visibleModal,
              modal5: false,
              modal8: true,
            });
          }
        }),
      );
    }
  };

  const onVisibleErrorModal = () => {
    setVisibleModal({
      ...visibleModal,
      modal6: false,
      modal8: false,
    });
  };

  const onAddFromPhone = () => {
    setVisibleModal({
      ...visibleModal,
      modal1: false,
      modal2: false,
    });
    navigation.navigate(AppRoute.LIST_CONTACT, {isBack: true});
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
        <AnimatedHeader
          animatedValue={offset}
          onVisibleInviteModal={onVisibleInviteModal}
          onVisibleJoinModal={onVisibleJoinModal}
        />
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
                <>
                  <View style={[GlobalStyles.flexColumn]}>
                    {networkState?.listMassInvitation?.data?.length > 0 ? (
                      <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
                        <Paragraph p bold title='Ongoing Mass Invites' style={GlobalStyles.mb10} />
                        <View style={[GlobalStyles.flexColumn, GlobalStyles.pv15, styles.blockArea]}>
                          <View
                            style={[
                              GlobalStyles.flexRow,
                              GlobalStyles.justifyBetween,
                              GlobalStyles.itemCenter,
                              GlobalStyles.mb10,
                              GlobalStyles.ph15,
                            ]}>
                            <View style={GlobalStyles.container}>
                              <View style={[GlobalStyles.pv5, GlobalStyles.ph15, styles.massInviteNumber]}>
                                <Paragraph
                                  h5
                                  textWhite
                                  title={`10 / ${networkState?.listMassInvitation?.data[0].attributes?.amount} Left`}
                                />
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() => onShowMassQrModal(networkState?.listMassInvitation?.data[0])}>
                              <QRCode
                                value={networkState?.listMassInvitation?.data[0]?.attributes?.code}
                                size={adjust(20)}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={[
                              GlobalStyles.fullWidth,
                              GlobalStyles.flexRow,
                              GlobalStyles.itemCenter,
                              GlobalStyles.ph15,
                              GlobalStyles.mb10,
                              GlobalStyles.pb10,
                              styles.borderBottom,
                            ]}>
                            <Paragraph textGray3Color title='Invite Code' style={GlobalStyles.mr10} />
                            <View style={[GlobalStyles.flexRow, GlobalStyles.container]}>
                              <TextInput
                                placeholder={networkState?.listMassInvitation?.data[0].attributes.code ?? ''}
                                style={[styles.inputStyle, GlobalStyles.ph10, GlobalStyles.container]}
                                editable={false}
                              />
                              <TouchableOpacity
                                style={styles.tagCount}
                                onPress={() =>
                                  copyToClipboard(networkState?.listMassInvitation?.data[0].attributes.code)
                                }>
                                <FastImage source={IMAGES.iconCopy} resizeMode='contain' style={styles.iconCopy} />
                              </TouchableOpacity>
                            </View>
                          </View>
                          {networkState?.listMassInvitation?.data[0].attributes?.tags.length > 0 && (
                            <View style={GlobalStyles.ph15}>
                              <Trans
                                i18nKey='network_invited'
                                parent={Text}
                                values={{
                                  name: `${joinArrayToString(
                                    networkState?.listMassInvitation?.data[0].attributes?.tags,
                                  )}`,
                                }}
                                components={{
                                  normal: <Text style={[styles.textNormal, styles.textCenter]} />,
                                  bold: <Text style={[styles.textBold]} />,
                                }}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30]}>
                        <Paragraph p bold title='Ongoing Mass Invites' style={GlobalStyles.mb10} />
                        <View style={[GlobalStyles.flexColumn, GlobalStyles.p15, styles.blockArea]}>
                          <Paragraph p title='There is no ongoing Mass Invites' style={GlobalStyles.mb15} />
                          <Button
                            title='Mass Invite via QR code'
                            h3
                            textCenter
                            containerStyle={{
                              ...GlobalStyles.buttonContainerStyle,
                              ...styles.buttonSignUpContainerStyle,
                            }}
                            textStyle={styles.h3BoldSignUpDefault}
                            onPress={onVisibleMassModal}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={GlobalStyles.flexColumn}>
                    <Paragraph p bold title='Your Trust Network' style={GlobalStyles.mb10} />
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
                </>
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
                        <Paragraph h6 bold700 textWhite title='Pending' />
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
                onPress={onAddFromPhone}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15, GlobalStyles.fullWidth]}>
            <InputValidateControl
              label={t('name')}
              inputStyle={styles.inputStyle}
              labelStyle={{...GlobalStyles.mb5, ...styles.labelStyle}}
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
              labelStyle={{...GlobalStyles.mb5, ...styles.labelStyle}}
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
                <View
                  style={[GlobalStyles.flexRow, GlobalStyles.container, GlobalStyles.alignCenter, GlobalStyles.mb5]}>
                  <Paragraph p title='Tag' style={[GlobalStyles.mr10, styles.labelStyle1]} />
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
          onHideModal={onVisibleJoinModal}
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
                <TouchableOpacity onPress={onVisibleJoinModal}>
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
                onPress={onAddFromPhone}
              />
            </View>
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.ph15]}>
            <View style={GlobalStyles.container}>
              <Button
                title={t('done')}
                h5
                textCenter
                onPress={onDone}
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
                onPress={onInviteMore}
                containerStyle={{
                  ...GlobalStyles.buttonContainerStyle,
                  ...styles.buttonContainerStyle2,
                }}
                textStyle={styles.h3BoldDefault}
              />
            </View>
          </View>
        </ModalDialogCommon>
      )}
      {visibleModal.modal3 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal3}
          onHideModal={onVisibleMassModal}
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
                <TouchableOpacity onPress={onVisibleMassModal}>
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
                <TextInput
                  placeholder='eg. bff, supplier. client'
                  style={[styles.inputStyle, GlobalStyles.ph10]}
                  value={tag}
                  onChangeText={text => setTag(text)}
                />
                <View style={styles.tagCount}>
                  <Paragraph textLavenderGrayColor p title='0 / 12' />
                </View>
              </View>
            </View>
            <Button
              title={t('generate_qr_code')}
              h5
              textCenter
              onPress={onCreateMassQrModal}
              containerStyle={{
                ...GlobalStyles.buttonContainerStyle,
                ...GlobalStyles.mb20,
                ...styles.buttonContainerStyle,
              }}
              textStyle={styles.h3BoldDefault}
            />
          </View>
        </ModalDialogCommon>
      )}
      {visibleModal.modal4 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal4}
          onHideModal={onHideMassQrModal}
          styleModal={styles.styleModal4}>
          <View style={[GlobalStyles.mb15, styles.headerContainer1]}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15]}>
              <View style={[GlobalStyles.flexRow]}>
                <View style={styles.iconClose} />
                <Paragraph
                  textSteelBlue2Color
                  h4
                  bold600
                  textCenter
                  title='Mass Invite QR'
                  style={[GlobalStyles.mb15, GlobalStyles.container]}
                />
                <TouchableOpacity onPress={onHideMassQrModal}>
                  <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
              <View style={[GlobalStyles.mb15, styles.qrCode]}>
                <QRCode
                  value={networkState?.dataMassInvitation?.attributes?.code ?? ''}
                  size={adjust(230)}
                  enableLinearGradient={true}
                  linearGradient={[BASE_COLORS.steelBlue2Color, BASE_COLORS.forestGreenColor]}
                />
              </View>
              <View style={[GlobalStyles.fullWidth, GlobalStyles.mt12]}>
                <TextInput
                  placeholder={networkState?.dataMassInvitation?.attributes?.code ?? ''}
                  placeholderTextColor={BASE_COLORS.gray3Color}
                  style={[styles.inputStyle, GlobalStyles.ph10]}
                  editable={false}
                />
                <View style={styles.tagCount}>
                  <FastImage source={IMAGES.iconCopy} resizeMode='contain' style={styles.iconCopy} />
                </View>
              </View>
            </View>
            {networkState?.dataMassInvitation?.attributes?.tags &&
              networkState?.dataMassInvitation?.attributes?.tags?.length > 0 && (
                <View style={GlobalStyles.mb15}>
                  <Trans
                    i18nKey='network_invited'
                    parent={Text}
                    values={{
                      name: joinArrayToString(networkState?.dataMassInvitation?.attributes?.tags),
                    }}
                    components={{
                      normal: <Text style={[styles.textNormal, styles.textCenter]} />,
                      bold: <Text style={[styles.textBold]} />,
                    }}
                  />
                </View>
              )}
            <View style={[GlobalStyles.flexRow]}>
              <View style={GlobalStyles.container}>
                <Button
                  title={t('cancel_invite')}
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
                  isIconLeft={true}
                  title={t('share_qr')}
                  h5
                  textCenter
                  onPress={onShare}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...GlobalStyles.flexRow,
                    ...GlobalStyles.itemCenter,
                    ...styles.buttonContainerStyle2,
                  }}
                  textStyle={styles.h3BoldDefault}>
                  <FastImage
                    source={IMAGES.iconShare2}
                    resizeMode='cover'
                    style={[GlobalStyles.mr5, styles.iconShare]}
                  />
                </Button>
              </View>
            </View>
          </View>
        </ModalDialogCommon>
      )}
      {visibleModal.modal5 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal5}
          onHideModal={onHideJoinModal}
          styleModal={styles.styleModal2}>
          <View style={[GlobalStyles.mb15, GlobalStyles.fullWidth]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.ph15]}>
              <Paragraph
                textSteelBlue2Color
                h5
                bold600
                textCenter
                title='Input Invite Code'
                style={[GlobalStyles.mb15, GlobalStyles.container]}
              />
              <TouchableOpacity onPress={onHideJoinModal}>
                <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15, GlobalStyles.fullWidth]}>
            <TextInput
              value={textInviteCode}
              onChangeText={(text: string) => setTextInviteCode(text)}
              selectionColor={BASE_COLORS.blackColor}
              placeholderTextColor={BASE_COLORS.blackColor}
              style={[GlobalStyles.mb10, GlobalStyles.ph10, styles.inputStyle]}
              editable={!modalLoading}
            />
            <Button
              title={t('confirm')}
              h5
              textCenter
              onPress={handleInvite}
              containerStyle={{
                ...GlobalStyles.buttonContainerStyle,
                ...GlobalStyles.mb20,
                ...styles.buttonContainerStyle,
              }}
              textStyle={styles.h3BoldDefault}
              disabled={modalLoading && textInviteCode !== ''}
            />
          </View>
        </ModalDialogCommon>
      )}
      {visibleModal.modal6 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={visibleModal.modal6}
          onHideModal={onHideJoinModal}
          styleModal={styles.styleModal5}>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.mt30]}>
            <TouchableOpacity onPress={onHideJoinModal} style={styles.iconCloseInvite}>
              <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
            </TouchableOpacity>
            <View style={GlobalStyles.alignCenter}>
              <Avatar
                styleAvatar={{...GlobalStyles.mb5, ...GlobalStyles.avatar2}}
                styleContainerGradient={{...GlobalStyles.mb5, ...GlobalStyles.avatar2}}
                userInfo={{
                  avatar_url: dataInvite?.included[0]?.attributes?.avatar_metadata?.avatar_url,
                  avatar_lat: dataInvite?.included[0]?.attributes?.avatar_metadata?.avatar_lat,
                  avatar_lng: dataInvite?.included[0]?.attributes?.avatar_metadata?.avatar_lng,
                  first_name: dataInvite?.included[0]?.attributes?.first_name,
                  last_name: dataInvite?.included[0]?.attributes?.last_name,
                }}
              />
              <Paragraph h5 textArsenicColor title={`You are now part of`} style={GlobalStyles.mb5} />
              {dataInvite?.included && dataInvite?.included?.length > 0 && (
                <Paragraph
                  h4
                  bold
                  textSteelBlueColor
                  title={`${dataInvite?.included[0]?.attributes?.first_name ?? ''} ${
                    dataInvite?.included[0]?.attributes?.last_name ?? ''
                  }`}
                  style={GlobalStyles.mb5}
                />
              )}
              {dataInvite?.included && dataInvite?.included?.length > 0 && (
                <Paragraph textCenter textSteelBlueColor bold600 p title={dataInvite?.included[0]?.attributes.pitch} />
              )}
            </View>
            <View style={[GlobalStyles.container, GlobalStyles.flexRow, GlobalStyles.mt20]}>
              {visibleModal.modal7 ? (
                <Button
                  title={t('ok')}
                  h4
                  textCenter
                  onPress={onModalOk}
                  containerStyle={{
                    ...GlobalStyles.buttonContainerStyle,
                    ...styles.buttonContainerStyle,
                    width: deviceWidth - 90,
                  }}
                  textStyle={styles.textPrimary}
                />
              ) : (
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
                  <Button
                    title={t('deny')}
                    h4
                    textCenter
                    onPress={onReject}
                    containerStyle={{
                      ...GlobalStyles.buttonContainerStyle,
                      ...GlobalStyles.mr10,
                      ...styles.buttonSecondContainerStyle,
                    }}
                    textStyle={{...styles.textSecondary, ...GlobalStyles.textCenter}}
                  />
                  <Button
                    title={t('accept')}
                    h4
                    textCenter
                    onPress={onAccept}
                    containerStyle={{
                      ...GlobalStyles.buttonContainerStyle,
                      ...styles.buttonContainerStyle,
                    }}
                    textStyle={styles.textPrimary}
                  />
                </View>
              )}
            </View>
          </View>
        </ModalDialogCommon>
      )}
      {visibleModal.modal8 && (
        <ModalDialogCommon
          isDefault={false}
          isVisible={true}
          onHideModal={onVisibleErrorModal}
          styleModal={styles.styleModal2}>
          <View style={[styles.iconCloseError]}>
            <TouchableOpacity onPress={onVisibleErrorModal}>
              <FastImage source={IMAGES.iconCloseBlack} resizeMode='cover' style={styles.iconClose} />
            </TouchableOpacity>
          </View>
          <View style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter]}>
            <FastImage source={IMAGES.iconErrorGray} style={[GlobalStyles.mb15, GlobalStyles.iconErrors]} />
            <Paragraph p textCenter textJetColor title={t('invite_code_invalid')} style={GlobalStyles.mb15} />
            <View style={GlobalStyles.container}>
              <Button
                title={t('ok')}
                h4
                textCenter
                onPress={onVisibleErrorModal}
                containerStyle={{
                  ...GlobalStyles.buttonContainerStyle,
                  ...styles.buttonContainerStyle,
                  width: deviceWidth - 90,
                }}
                textStyle={styles.h3BoldDefault}
              />
            </View>
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
