/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Alert, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker, {Options} from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {updateUserAvatar} from '~Root/services/user/actions';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {AvatarGradient, Button, HeaderSmallTransparent, Icon, ModalDialogCommon, Paragraph} from '~Root/components';
import styles from './styles';
import {IAvatar, IUserState} from '~Root/services/user/types';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {adjust} from '~Root/utils';

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

interface Props {
  onBack?: () => void;
  isBackButton?: boolean;
  isRightButton?: boolean;
  onToggleDrawer?: () => void;
  children?: React.ReactNode;
}

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

const ProfileTemplateScreen: React.FC<Props> = ({
  onBack = () => {},
  isBackButton = false,
  isRightButton = false,
  onToggleDrawer = () => {},
  children,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

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
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);

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
        // dispatch(
        //   setUserProfileAvatar({
        //     name: response?.assets[0]?.fileName,
        //     type: response?.assets[0]?.type,
        //     uri: response?.assets[0]?.uri,
        //   }),
        // );
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

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'bottom', 'right', 'left']}>
        <HeaderSmallTransparent
          title={t('set_up_profile')}
          isBackButton={isBackButton}
          onBack={onBack}
          isRightButton={isRightButton}
          onRightPress={onToggleDrawer}
        />
        <View style={GlobalStyles.bgWhite}>
          <LinearGradient
            colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
            style={[GlobalStyles.center, styles.profileGradient]}>
            <View style={GlobalStyles.flexRow}>
              {imageAvatar?.uri ? (
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
              ) : userState.userInfo?.avatar ? (
                <FastImage
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1652659200&Signature=O7iXEZgTzjmEJDI-0di2orJyz48YJA4NHiQXZCFMIgXsxqC1wqeAQO-ZYK3sL4QF0~RFqYw-xk3UetfEt1Jpw36v19pywORmr8f04lTL2aMisr5CR8-6mbYUAa5HVkxmh79hdFJGiXJF8sNDaSxXnt4g53gFob0jcdBmj6T2ZeWuymMnPNrqlCVpO4hBVe6C1M8g8er1O7v9MinUhC48XSnyHMnzdjSbyp4ATnetL4p55yLZtCqrJtW1or-Sm5pO4xf~PG32BVhkqmXVhlREuFLJpUhWl~-1iVds7r1f8poCTJGil2dUaDKk22vcKXQHju5ZhtLHUoP0LH1lX1n~Ag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                  }}
                  style={[GlobalStyles.avatar, GlobalStyles.mb10]}
                />
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
            <Paragraph textWhite bold600 title='kelly.choo@referreach.com' style={GlobalStyles.mb10} />
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
          {children}
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
  );
};

export default ProfileTemplateScreen;
