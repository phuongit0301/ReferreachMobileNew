import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {Trans, useTranslation} from 'react-i18next';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {CheckBox, Icon, Image, InputValidateControl} from '~Root/components';
import {IFeedInfoState} from '~Root/services/feed/types';
import styles from './styles';
import {adjust} from '~Root/utils';

interface Props {
  profile: IFeedInfoState | null;
  profileJoint: IFeedInfoState | null;
  name: string;
  isValid: boolean;
  errors: any;
  control: any;
  register: any;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  styleContainer?: ViewStyle;
  styleGroupImage?: ViewStyle;
}

const IndividualJointBlockItem: React.FC<Props> = ({
  profile,
  profileJoint,
  name,
  isValid,
  errors,
  control,
  register,
  autoFocus = false,
  multiline = true,
  numberOfLines = 4,
  styleContainer = {},
  styleGroupImage = {},
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styleContainer]}>
      <View style={GlobalStyles.mb15}>
        <Trans
          i18nKey='feed_joint'
          values={{name: profile?.first_name, nameJoint: profileJoint?.first_name}}
          parent={Text}
          components={{
            color: <Text style={styles.textColor} />,
          }}
        />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb10, styleGroupImage]}>
        <View style={styles.imageProfileContainer}>
          <Image source={{uri: profile?.profile_photo}} style={styles.imageProfile} />
        </View>
        <View style={styles.imageProfileContainerOverlap}>
          <Image source={{uri: profileJoint?.profile_photo}} style={styles.imageProfile} />
        </View>
      </View>
      <InputValidateControl
        styleContainer={styles.styleContainer}
        inputStyle={styles.inputBorderStyle}
        labelStyle={styles.labelStyle}
        inputErrorStyle={!isValid && styles.inputErrorStyle}
        selectionColor={BASE_COLORS.primary}
        errors={errors}
        control={control}
        name={name}
        register={register}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

export default IndividualJointBlockItem;
