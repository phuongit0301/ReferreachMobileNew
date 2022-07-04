import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {Trans} from 'react-i18next';

import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {CheckBox, Icon, Image, InputValidateControl, Paragraph} from '~Root/components';
import {IFeedItemsState} from '~Root/services/feed/types';
import styles from './styles';
import {adjust} from '~Root/utils';
import FastImage from 'react-native-fast-image';

interface Props {
  profile: IFeedItemsState['dataUser'] | null;
  profileRefer: IFeedItemsState['dataProfileRefer'] | null;
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
    <View style={[GlobalStyles.flexColumn, GlobalStyles.p15, styles.itemContainer, styleContainer]}>
      {isDisable && <View style={styles.disableContainer} />}
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb20, styleGroupImage]}>
        <View style={styles.imageProfileContainer}>
          <FastImage
            source={{uri: profile?.data?.attributes?.avatar_metadata?.avatar_url}}
            style={[GlobalStyles.mb5, styles.imageProfile]}
          />
          <Paragraph
            textSteelBlueColor
            bold600
            title={`${profile?.data?.attributes?.first_name} ${profile?.data?.attributes?.last_name}`}
          />
        </View>
        <FastImage source={IMAGES.iconDoubleArrow} style={[GlobalStyles.mr10, styles.iconDoubleArrow]} />
        <View style={styles.imageProfileContainer}>
          <FastImage
            source={{uri: profileRefer?.data?.attributes?.avatar_metadata?.avatar_url}}
            style={[GlobalStyles.mb5, styles.imageProfile]}
          />
          <Paragraph
            textForestGreenColor
            bold600
            title={`${profileRefer?.data?.attributes?.first_name} ${profileRefer?.data?.attributes?.last_name}`}
          />
        </View>
      </View>
      <Trans
        i18nKey='feed_message'
        parent={Text}
        values={{
          name1: `${profile?.data?.attributes?.first_name} ${profile?.data?.attributes?.last_name}`,
          name2: `${profileRefer?.data?.attributes?.first_name} ${profileRefer?.data?.attributes?.last_name}`,
        }}
        components={{
          normal: <Text style={[styles.textNormal]} />,
          blueHighlight: <Text style={[styles.textBlue]} />,
          greenHighlight: <Text style={[styles.textGreen]} />,
        }}
      />
      <InputValidateControl
        styleContainer={styles.styleContainer}
        inputStyle={styles.inputBorderStyle}
        labelStyle={styles.labelStyle}
        placeholder={'* Message will not be sent if left empty *'}
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
