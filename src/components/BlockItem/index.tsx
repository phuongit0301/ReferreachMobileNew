import React from 'react';
import {View, TouchableOpacity, GestureResponderEvent, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Paragraph, Image, Icon} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';

interface Props {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  title: string;
  profile_photo?: string;
  status: string;
  phoneNumber?: string;
  showConfirm: boolean;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  onConfirm?: (event: GestureResponderEvent) => void;
  onPending?: (event: GestureResponderEvent) => void;
}

const BlockItem: React.FC<Props> = ({
  first_name = '',
  last_name = '',
  title = '',
  profile_photo,
  status = 'pending',
  phoneNumber,
  showConfirm = false,
  style = {},
  onPress = () => {},
  onConfirm = () => {},
  onPending = () => {},
}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.contain, style]}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <TouchableOpacity onPress={onPress} style={styles.profileContainer}>
          <View style={styles.imageProfileContainer}>
            <Image source={{uri: profile_photo}} style={styles.imageProfile} />
          </View>
          {status === 'actived' ? (
            <View style={styles.groupText}>
              <Paragraph h5 bold title={`${first_name} ${last_name}`} style={styles.boldTitle} />
              <Paragraph p title={title} style={styles.title} />
            </View>
          ) : (
            <View style={styles.groupText}>
              <Paragraph p title={phoneNumber} style={styles.title} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.groupBtn}>
          {status === 'actived' ? (
            <TouchableOpacity style={styles.iconMessageContainer}>
              <Icon name='comment-alt' size={adjust(12)} color={BASE_COLORS.eerieBlackColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.pendingContainer} onPress={onPending}>
              <Paragraph textWhite title={t('pending_invite')} style={styles.pendingInviteArea} />
            </TouchableOpacity>
          )}
          {showConfirm && (
            <TouchableOpacity style={styles.iconMinusContainer} onPress={onConfirm}>
              <Icon name='minus-circle' size={adjust(20)} color={BASE_COLORS.indianRedColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default BlockItem;
