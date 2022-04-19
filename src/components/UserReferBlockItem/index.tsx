import React from 'react';
import {View, TouchableOpacity, GestureResponderEvent, ViewStyle} from 'react-native';

import {Paragraph, Image} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  id?: number;
  first_name?: string;
  last_name?: string;
  profile_photo?: string;
  status?: string;
  phoneNumber?: string;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const UserReferBlockItem: React.FC<Props> = ({
  first_name = '',
  last_name = '',
  profile_photo,
  status = 'pending',
  phoneNumber,
  style = {},
  onPress = () => {},
}: Props) => {
  return (
    <View style={[styles.contain, style]}>
      <View style={[GlobalStyles.flexRow, styles.itemContainer]}>
        <TouchableOpacity onPress={onPress} style={styles.profileContainer}>
          <View style={styles.imageProfileContainer}>
            <Image source={{uri: profile_photo}} style={styles.imageProfile} />
          </View>
          {status === 'pending' ? (
            <View style={styles.groupText}>
              <Paragraph h5 title={`${first_name} ${last_name}`} style={styles.boldTitle} />
            </View>
          ) : (
            <View style={styles.groupText}>
              <Paragraph p title={phoneNumber} style={styles.title} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserReferBlockItem;
