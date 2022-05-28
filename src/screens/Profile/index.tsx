import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {Options} from 'react-native-image-crop-picker';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {
  AvatarGradient,
  Button,
  HeaderSmallTransparent,
  Icon,
  InputValidateControl,
  ModalDialogCommon,
  Paragraph,
  ProfileTemplateScreen,
} from '~Root/components';
import {BASE_COLORS, GlobalStyles, PROFILE_FIELDS} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';
import {IGlobalState} from '~Root/types';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {updateUserAvatar} from '~Root/services/user/actions';
import {adjust} from '~Root/utils';

const schema = yup.object().shape({
  [PROFILE_FIELDS.first_name]: yup
    .string()
    .max(31, 'First Name must be at most 31 characters')
    .required('First Name is required'),
  [PROFILE_FIELDS.last_name]: yup
    .string()
    .max(31, 'Last Name must be at most 31 characters')
    .required('Last Name is required'),
  [PROFILE_FIELDS.title]: yup.string().required('Job Title is required'),
  [PROFILE_FIELDS.introductions]: yup.string().max(248).required('Expertise / Pitch is required'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

interface Action {
  title: string;
  type: 'camera' | 'library';
  options: Options;
}

const actions: Action[] = [
  {
    title: 'Take photo...',
    type: 'camera',
    options: {
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Choose from Library',
    type: 'library',
    options: {
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];
interface AvtarRect {
  height: number;
  width: number;
  x: number;
  y: number;
}
interface AvatarProps {
  uri: string;
  width: number;
  height: number;
  cropRect?: AvtarRect | null;
  mime: string;
}

const ProfileScreen = ({navigation}: any) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const userState = useSelector((state: IGlobalState) => state.userState);
  const [visibleModal, setVisibleModal] = useState(false);
  const [imageAvatar, setImageAvatar] = useState<AvatarProps>({
    uri: '',
    width: 0,
    height: 0,
    cropRect: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    mime: '',
  });

  const onSubmit: SubmitHandler<any> = (credentials: any) => {
    navigation.navigate(AppRoute.PROFILE_SECOND, {...credentials});
  };

  useEffect(() => {
    if (userState.userInfo?.first_name) {
      setValue(PROFILE_FIELDS.first_name, userState.userInfo?.first_name);
    }
    if (userState.userInfo?.last_name) {
      setValue(PROFILE_FIELDS.last_name, userState.userInfo?.last_name);
    }
    if (userState.userInfo?.title) {
      setValue(PROFILE_FIELDS.title, userState.userInfo?.title);
    }
    if (userState.userInfo?.introductions) {
      setValue(PROFILE_FIELDS.introductions, userState.userInfo?.introductions);
    }
  }, [userState.userInfo]);

  const onUpdate = () => {
    setVisibleModal(!visibleModal);
  };

  const openImageCrop = (response: any, type: any) => {
    ImagePicker.openCropper({
      path: response.path,
      mediaType: type,
      width: 80,
      height: 80,
      writeTempFile: false,
      includeExif: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      includeBase64: true,
    })
      .then(async croppedImage => {
        setVisibleModal(false);
        const data = new FormData();
        data.append('avatar', {
          name: 'image',
          type: 'image/jpg',
          uri: Platform.OS === 'android' ? croppedImage.path : croppedImage.path.replace('file://', ''),
        });
        data.append('avatar_lat', croppedImage?.cropRect?.x);
        data.append('avatar_lng', croppedImage?.cropRect?.y);
        dispatch(showLoading());
        dispatch(
          updateUserAvatar(data, (response: any) => {
            dispatch(hideLoading());
          }),
        );
      })
      .catch(error => {
        console.log(`Error in open cropper: ${error as string}`);
      });
  };

  const onButtonPress = useCallback(async (type, options) => {
    try {
      if (type === 'camera') {
        ImagePicker.openCamera(options)
          .then((response: any) => openImageCrop(response, type))
          .catch(error => {
            console.log(`Error in open camera: ${error as string}`);
          });
      } else {
        ImagePicker.openPicker(options)
          .then((response: any) => openImageCrop(response, type))
          .catch(error => {
            console.log(`Error in open picker: ${error as string}`);
          });
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  if (userState.loading && !userState?.userInfo) {
    return null;
  }

  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.container, styles.container]}>
        <SafeAreaView style={GlobalStyles.container} edges={['top', 'bottom', 'right', 'left']}>
          <HeaderSmallTransparent
            title={t('set_up_profile')}
            isBackButton={true}
            onBack={onBack}
            isRightButton={true}
            onRightPress={onToggleDrawer}
          />
          <View style={GlobalStyles.bgWhite}>
            <LinearGradient
              colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
              style={[GlobalStyles.center, styles.profileGradient]}>
              <View style={GlobalStyles.flexRow}>
                {userState.userInfo?.avatar_metadata?.avatar_url ? (
                  <FastImage
                    source={{
                      uri: userState.userInfo?.avatar_metadata?.avatar_url,
                    }}
                    style={[GlobalStyles.avatar, GlobalStyles.mb10]}
                  />
                ) : imageAvatar?.uri ? (
                  <FastImage
                    source={{
                      uri: imageAvatar?.uri,
                    }}
                    resizeMode='cover'
                    onProgress={() => <ActivityIndicator />}
                    style={[GlobalStyles.avatar, GlobalStyles.mb10]}>
                    <View
                      style={{
                        width: imageAvatar?.cropRect?.width,
                        height: imageAvatar.cropRect?.height,
                        transform: [
                          {translateX: imageAvatar?.cropRect?.x ?? 0},
                          {translateY: imageAvatar?.cropRect?.y ?? 0},
                        ],
                      }}
                    />
                  </FastImage>
                ) : (
                  <AvatarGradient
                    title='AD'
                    color1={BASE_COLORS.oxleyColor}
                    color2={BASE_COLORS.oxleyColor}
                    stylesContainer={GlobalStyles.mb15}
                  />
                )}
                <View style={styles.iconEditContainer}>
                  <TouchableOpacity style={GlobalStyles.iconEdit} onPress={onUpdate}>
                    <Icon name='pencil-alt' size={adjust(8)} color={BASE_COLORS.whiteColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <Paragraph textWhite bold600 title={userState.userInfo?.email} style={GlobalStyles.mb10} />
              <Button
                title={t('update_email')}
                h5
                textCenter
                containerStyle={styles.buttonUpdateContainerStyle}
                textStyle={styles.txtButton}
              />
            </LinearGradient>
          </View>
          <ScrollView
            style={GlobalStyles.scrollViewWhiteNoMargin}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
              <InputValidateControl
                label={`${t('first_name')}*`}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={PROFILE_FIELDS.first_name}
                register={register}
                autoFocus={true}
                onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.last_name)}
              />
              <InputValidateControl
                label={`${t('last_name')}*`}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={PROFILE_FIELDS.last_name}
                register={register}
                onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.title)}
              />
              <InputValidateControl
                label={`${t('job_title')}*`}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={PROFILE_FIELDS.title}
                register={register}
                onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.introductions)}
              />
              <InputValidateControl
                label={`${t('expertise')}*`}
                inputStyle={styles.textAreaStyle}
                labelStyle={styles.labelStyle}
                inputErrorStyle={styles.inputErrorStyle}
                selectionColor={BASE_COLORS.blackColor}
                placeholderTextColor={BASE_COLORS.blackColor}
                errors={errors}
                control={control}
                name={PROFILE_FIELDS.introductions}
                register={register}
                multiline={true}>
                <View style={styles.countCharacters}>
                  <Paragraph title={`${(watch('introductions') as string)?.length ?? 0}/248`} />
                </View>
              </InputValidateControl>
              <View>
                <Button
                  title={t('next')}
                  h5
                  textCenter
                  onPress={handleSubmit(onSubmit)}
                  containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                  textStyle={styles.h3BoldDefault}
                  disabled={!isValid && !errors}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        {visibleModal && (
          <ModalDialogCommon isVisible={visibleModal} onHideModal={onUpdate} isDefault={false}>
            {actions.map(({title, type, options}) => (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <TouchableOpacity key={type} onPress={() => onButtonPress(type, options)} style={styles.imageButton}>
                <Paragraph h5 title={title} />
              </TouchableOpacity>
            ))}
          </ModalDialogCommon>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
