import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Trans, useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {BlockItems, Paragraph, Button, Icon, ModalDialogCommon} from '~Root/components';
import {onRevokeInvite} from '~Root/services/user/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {ITrustNetwork} from '~Root/services/ask/types';
import {adjust} from '~Root/utils';

interface INetwork {
  networkState: ITrustNetwork[];
  invokeInvite: ITrustNetwork | null;
  invitesLeft: number;
  showTooltip: boolean;
  onPress: () => void;
  onTooltipPress: () => void;
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, AppRoute.HOME>;
}

interface Props {
  contentProps: INetwork;
  tabLabel?: number;
}

const TrustNetwork: React.FC<Props> = ({
  contentProps: {networkState, invokeInvite, invitesLeft = 0, showTooltip = false, onPress, onTooltipPress, navigation},
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [confirmVisible, showConfirm] = useState({
    visibleButton: false,
    visibleModal: false,
  });

  const onEdit = () => {
    showConfirm({...confirmVisible, visibleButton: !confirmVisible.visibleButton});
  };

  const onConfirm = (item?: ITrustNetwork) => {
    if (item) {
      dispatch(onRevokeInvite(item));
    }
    showConfirm({...confirmVisible, visibleModal: !confirmVisible.visibleModal});
  };

  const onPending = (item?: ITrustNetwork) => {
    if (item) {
      dispatch(onRevokeInvite(item));
      navigation.navigate(AppRoute.INVITE_CONTACT_EDIT);
    }
  };

  const onCancel = () => {
    showConfirm({...confirmVisible, visibleModal: !confirmVisible.visibleModal});
  };

  const onPressConfirm = () => {
    // Todo: dispatch action remove an item
    showConfirm({...confirmVisible, visibleModal: !confirmVisible.visibleModal});
  };

  return (
    <View style={styles.networkContainer}>
      <View style={styles.askHeader}>
        <Paragraph h5 title={t('your_trust_network')} style={styles.titleBlue} />
        <Tooltip
          isVisible={showTooltip}
          backgroundColor='transparent'
          contentStyle={styles.tooltipContentStyle}
          tooltipStyle={styles.tooltipNetworkStyle}
          content={
            <View style={GlobalStyles.flexColumn}>
              <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                <Paragraph h4 textWhite title={t('trust_network')} style={styles.titleNetwork} />
                <TouchableOpacity style={styles.tooltipCloseBtn} onPress={onTooltipPress}>
                  <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(12)} />
                </TouchableOpacity>
              </View>
              <View style={styles.tooltipNetwork}>
                <Paragraph
                  p
                  title='Invite your friends in your Trust Network to jumpstart building new connections.'
                  style={styles.tooltipTextColor}
                />
              </View>
            </View>
          }
          placement='bottom'>
          <TouchableOpacity onPress={onTooltipPress} style={styles.iconContainer}>
            <Ionicons name='help-circle' color={BASE_COLORS.davysGreyColor} size={adjust(22)} />
          </TouchableOpacity>
        </Tooltip>
        <Paragraph textWhite title={`${invitesLeft} ${t('invites_left')}`} style={styles.inviteLeftArea} />
        <View style={styles.editButton}>
          <TouchableOpacity onPress={onEdit}>
            <Icon name='pencil-alt' color={BASE_COLORS.davysGreyColor} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[GlobalStyles.flexColumn]}>
        <BlockItems
          data={networkState}
          onConfirm={onConfirm}
          onPending={onPending}
          isVisible={confirmVisible.visibleButton}
        />
      </View>
      <View style={styles.mainButtonContainer}>
        <Button
          bordered
          title={t('invite')}
          onPress={onPress}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.textStyle}
        />
      </View>
      <ModalDialogCommon
        isVisible={confirmVisible.visibleModal}
        onHideModal={onConfirm}
        isDefault={false}
        styleModal={GlobalStyles.styleModal}
        styleModalContainer={GlobalStyles.styleModalContainer}>
        <View style={GlobalStyles.p30}>
          <View style={GlobalStyles.modalHeader}>
            <Trans
              i18nKey='you_want_revoke'
              values={{
                name:
                  invokeInvite?.status === 1
                    ? `${invokeInvite?.first_name ?? ''} ${invokeInvite?.last_name ?? ''}`
                    : `${invokeInvite?.phone_number ?? ''}`,
              }}
              components={{
                bold: <Text style={[GlobalStyles.p, GlobalStyles.textRevokeInviteHighlight]} />,
                italic: <Text style={[GlobalStyles.p, GlobalStyles.textRevokeInvite]} />,
              }}
            />
          </View>
          <View style={styles.buttonGroup}>
            <Button
              bordered
              title={t('cancel')}
              onPress={onCancel}
              containerStyle={styles.cancelButtonArea}
              textStyle={styles.textStyle}
            />
            <Button
              bordered
              title={t('confirm')}
              onPress={onPressConfirm}
              containerStyle={styles.mainButtonArea}
              textStyle={styles.textStyle}
            />
          </View>
        </View>
      </ModalDialogCommon>
    </View>
  );
};
export default TrustNetwork;
