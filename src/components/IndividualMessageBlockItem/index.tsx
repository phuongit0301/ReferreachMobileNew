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
  profileRefer: IFeedInfoState | null;
  isChecked: boolean;
  onCheckboxChange: () => void;
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
  isDisable?: boolean;
}

const IndividualMessageBlockItem: React.FC<Props> = ({
  profile,
  profileRefer,
  isChecked = false,
  onCheckboxChange = () => {},
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
  isDisable = false,
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styleContainer]}>
      {isDisable && <View style={styles.disableContainer} />}
      <View style={GlobalStyles.flexRow}>
        <CheckBox
          textTran={
            <Trans
              i18nKey='feed_send'
              values={{
                name: profile?.user?.user_profile.first_name,
                nameRefer: profileRefer?.to_user?.user_profile?.first_name,
              }}
              parent={Text}
              components={{
                bold: <Text style={[GlobalStyles.p, GlobalStyles.textTealBlueHighlight]} />,
                color: <Text style={styles.textColor} />,
              }}
            />
          }
          isChecked={isChecked}
          onChange={onCheckboxChange}
          style={styles.checkBoxContainer}
          iconStyle={styles.iconStyle}
          textStyle={styles.textStyle}
        />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb10, styleGroupImage]}>
        <View style={styles.imageProfileContainer}>
          <Image source={{uri: profile?.profile_photo}} style={styles.imageProfile} />
        </View>
        <Icon name='arrow-right' size={adjust(12)} color={BASE_COLORS.eerieBlackColor} style={GlobalStyles.mr10} />
        <View style={styles.imageProfileContainer}>
          <Image source={{uri: profileRefer?.profile_photo}} style={styles.imageProfile} />
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

export default IndividualMessageBlockItem;
