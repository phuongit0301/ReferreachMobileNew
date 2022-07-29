/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {Trans} from 'react-i18next';

import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {Avatar, InputValidateControl, Paragraph} from '~Root/components';
import {IFeedItemsState} from '~Root/services/feed/types';
import styles from './styles';
import FastImage from 'react-native-fast-image';

interface Props {
  profile: IFeedItemsState['dataFeed'] | null;
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
  if (!profile?.data || !profileRefer?.included) {
    return null;
  }

  return (
    <View style={[GlobalStyles.flexColumn, GlobalStyles.p15, styles.itemContainer, styleContainer]}>
      {isDisable && <View style={styles.disableContainer} />}
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb20, styleGroupImage]}>
        <View style={[styles.imageProfileContainer, GlobalStyles.alignCenter]}>
          <Avatar
            styleAvatar={{...GlobalStyles.mb5, ...styles.imageProfile}}
            styleContainerGradient={{...GlobalStyles.mb5, ...styles.imageProfile}}
            userInfo={{
              avatar_url: profile?.data[0]?.attributes?.user?.avatar_metadata?.avatar_url,
              avatar_lat: profile?.data[0]?.attributes?.user?.avatar_metadata?.avatar_lat,
              avatar_lng: profile?.data[0]?.attributes?.user?.avatar_metadata?.avatar_lng,
              first_name: profile?.data[0]?.attributes?.user?.first_name,
              last_name: profile?.data[0]?.attributes?.user?.last_name,
            }}
          />
          <View style={GlobalStyles.container}>
            <Paragraph
              textSteelBlueColor
              bold600
              textCenter
              title={`${profile?.data[0]?.attributes?.user?.first_name} ${profile?.data[0]?.attributes?.user?.last_name}`}
            />
          </View>
        </View>
        <View style={[GlobalStyles.alignCenter, styles.iconDoubleArrowContainer]}>
          <FastImage source={IMAGES.iconDoubleArrow} style={[GlobalStyles.mr10, styles.iconDoubleArrow]} />
        </View>
        <View style={[styles.imageProfileContainer, GlobalStyles.alignCenter]}>
          <Avatar
            styleAvatar={{...GlobalStyles.mb5, ...styles.imageProfile}}
            styleContainerGradient={{...GlobalStyles.mb5, ...styles.imageProfile}}
            userInfo={{
              avatar_url: profileRefer?.included[0]?.attributes?.avatar_metadata?.avatar_url,
              avatar_lat: profileRefer?.included[0]?.attributes?.avatar_metadata?.avatar_lat,
              avatar_lng: profileRefer?.included[0]?.attributes?.avatar_metadata?.avatar_lng,
              first_name: profileRefer?.included[0]?.attributes?.first_name,
              last_name: profileRefer?.included[0]?.attributes?.last_name,
            }}
          />
          <View style={GlobalStyles.container}>
            <Paragraph
              textForestGreenColor
              bold600
              textCenter
              title={`${profileRefer?.included[0]?.attributes?.first_name} ${profileRefer?.included[0]?.attributes?.last_name}`}
            />
          </View>
        </View>
      </View>
      <Trans
        i18nKey='feed_message'
        parent={Text}
        values={{
          name1: `${profile?.data[0]?.attributes?.user?.first_name} ${profile?.data[0]?.attributes?.user?.last_name}`,
          name2: `${profileRefer?.included[0]?.attributes?.first_name} ${profileRefer?.included[0]?.attributes?.last_name}`,
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
