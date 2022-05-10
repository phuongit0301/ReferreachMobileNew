/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import React, {useCallback, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {setUserProfileAvatar} from '~Root/services/user/actions';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, HeaderSmallTransparent, Icon, ModalDialogCommon, Paragraph} from '~Root/components';
import styles from './styles';
import {IUserState} from '~Root/services/user/types';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {adjust} from '~Root/utils';

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const includeExtra = true;

const actions: Action[] = [
  {
    title: 'Take photo...',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Choose from Library',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
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

  const onUpdate = () => {
    setVisibleModal(!visibleModal);
  };

  const onButtonPress = useCallback(async (type, options) => {
    setVisibleModal(false);
    if (type === 'capture') {
      await launchCamera(options, imageResponse);
    } else {
      await launchImageLibrary(options, imageResponse);
    }
  }, []);

  const imageResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      // eslint-disable-next-line no-alert
      alert(response.customButton);
    } else {
      if (response?.assets?.length > 0) {
        dispatch(
          setUserProfileAvatar({
            name: response?.assets[0]?.fileName,
            type: response?.assets[0]?.type,
            uri: response?.assets[0]?.uri,
          }),
        );
      }
    }
  };

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
              <FastImage
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1652659200&Signature=O7iXEZgTzjmEJDI-0di2orJyz48YJA4NHiQXZCFMIgXsxqC1wqeAQO-ZYK3sL4QF0~RFqYw-xk3UetfEt1Jpw36v19pywORmr8f04lTL2aMisr5CR8-6mbYUAa5HVkxmh79hdFJGiXJF8sNDaSxXnt4g53gFob0jcdBmj6T2ZeWuymMnPNrqlCVpO4hBVe6C1M8g8er1O7v9MinUhC48XSnyHMnzdjSbyp4ATnetL4p55yLZtCqrJtW1or-Sm5pO4xf~PG32BVhkqmXVhlREuFLJpUhWl~-1iVds7r1f8poCTJGil2dUaDKk22vcKXQHju5ZhtLHUoP0LH1lX1n~Ag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                }}
                style={[GlobalStyles.avatar, GlobalStyles.mb10]}
              />
              <View style={styles.iconEditContainer}>
                <TouchableOpacity style={styles.iconEdit} onPress={onUpdate}>
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
