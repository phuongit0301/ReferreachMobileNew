/* eslint-disable @typescript-eslint/promise-function-async */
import React, {useCallback, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker, {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {setUserProfileAvatar} from '~Root/services/user/actions';
import {GlobalStyles} from '~Root/config';
import {HeaderProfileBlue, ModalDialogCommon, Paragraph} from '~Root/components';
import styles from './styles';
import {IUserState} from '~Root/services/user/types';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';

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
  onBack: () => void;
  isBackButton?: boolean;
  children?: React.ReactNode;
}

const ProfileTemplateScreen: React.FC<Props> = ({onBack = () => {}, isBackButton = false, children}) => {
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
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
      <HeaderProfileBlue
        isBackButton={isBackButton}
        profilePhoto={userState?.userInfo?.avatar?.url}
        onBack={onBack}
        onUpdate={onUpdate}
      />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView
          style={[GlobalStyles.scrollViewWhite, styles.scrollViewWhite]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollViewContentContainer}>
          {children}
        </ScrollView>
      </SafeAreaView>
      {visibleModal && (
        <ModalDialogCommon isVisible={visibleModal} onHideModal={onUpdate} isDefault={false}>
          {actions.map(({title, type, options}) => (
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
