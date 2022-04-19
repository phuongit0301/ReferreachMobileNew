/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useState} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {IUserInfoState} from '~Root/services/user/types';
import {ButtonSecond, HeaderNormalBlue, Paragraph, Icon, Image, Button, ModalDialogCommon} from '~Root/components';
import {logout} from '~Root/services/auth/actions';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';

interface Props {
  onBack: () => void;
  onProfile: () => void;
  onEdit: () => void;
  isBackButton: boolean;
  containerHeaderStyle?: ViewStyle;
  profile?: IUserInfoState | null;
  children?: React.ReactNode;
}

const HomeTemplateScreen: React.FC<Props> = ({
  onBack = () => {},
  onProfile = () => {},
  onEdit = () => {},
  isBackButton = false,
  containerHeaderStyle = {},
  profile,
  children,
}: Props) => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onLogout = () => {
    dispatch(logout());
  };

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderNormalBlue onBack={onBack} isBackButton={isBackButton} containerHeaderStyle={containerHeaderStyle}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.container]}>
          <TouchableOpacity style={[GlobalStyles.avatarContainer, GlobalStyles.mr20]} onPress={onProfile}>
            {profile?.avatar?.url ? (
              <Image source={{uri: profile?.avatar?.url}} style={styles.imageProfile} />
            ) : (
              <Icon name='user-circle' size={adjust(60)} color={BASE_COLORS.blackColor} style={GlobalStyles.avatar} />
            )}
          </TouchableOpacity>
          <View style={[GlobalStyles.flexColumn, styles.userInfoArea]}>
            <Paragraph
              p
              bold600
              textWhite
              title={`${profile?.first_name} ${profile?.last_name}`}
              style={[GlobalStyles.mb5, styles.title]}
            />
            {profile?.title && (
              <Paragraph
                p
                textWhite
                title={profile?.title}
                style={[GlobalStyles.mb20, styles.limitWidth, styles.title, styles.biztype]}
              />
            )}
            <ButtonSecond
              title={t('view_profile')}
              titleStyle={{...GlobalStyles.mr10, ...styles.titleStyle}}
              showIcon={false}
              onPress={onProfile}
              buttonContainerStyle={styles.btnSecond}
            />
          </View>
          <TouchableOpacity onPress={onShowModal}>
            <Icon name='sign-out-alt' size={adjust(15)} color={BASE_COLORS.whiteColor} />
          </TouchableOpacity>
        </View>
      </HeaderNormalBlue>

      <View style={styles.areaViewContainer}>
        <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
          {children}
        </SafeAreaView>
      </View>
      {showModal && (
        <ModalDialogCommon
          isVisible={showModal}
          onHideModal={onShowModal}
          isDefault={false}
          styleModal={styles.styleModal}
          styleModalContainer={styles.styleModalContainer}>
          <Paragraph h5 bold600 title={t('logout')} style={GlobalStyles.pv20} />
          <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
            <Button
              isIconLeft={true}
              title={t('cancel')}
              bordered
              h3
              textCenter
              onPress={onShowModal}
              containerStyle={styles.cancelButtonArea}
              textStyle={styles.textStyle}
            />
            <Button
              bordered
              title={t('confirm')}
              onPress={onLogout}
              containerStyle={styles.mainButtonArea}
              textStyle={styles.mainButtonTextStyle}
              textWhite
            />
          </View>
        </ModalDialogCommon>
      )}
    </View>
  );
};

export default HomeTemplateScreen;
