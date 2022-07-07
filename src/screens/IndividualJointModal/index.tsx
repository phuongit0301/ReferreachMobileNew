import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';

import {Button, HeaderSmallTransparent, IndividualJointBlockItem, Paragraph, ToggleSwitch} from '~Root/components';
import {AppRoute} from '~Root/navigation/AppRoute';
import {MESSAGE_FIELDS} from '~Root/config/fields';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const schema = yup.object().shape({
  responderFeedback: yup.string(),
  introducerFeedback: yup.string(),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INDIVIDUAL_MESSAGE_MODAL>;

const IndividualJointModalScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const feedState = useSelector((state: IGlobalState) => state.feedState);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container]}>
      <HeaderSmallTransparent
        isBackButton={true}
        onBack={onBack}
        title={t('message')}
        isRightButton={true}
        onRightPress={onToggleDrawer}
        containerHeaderStyle={{...GlobalStyles.bgWhite, ...GlobalStyles.pb15, ...GlobalStyles.pt50}}
      />
      <ScrollView>
        <View style={[GlobalStyles.container, styles.container]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
            <FastImage source={IMAGES.iconQuestion} style={[GlobalStyles.mr5, styles.iconQuestion]} />
            <Paragraph p textSpanishGrayColor title={t('message_individual')} style={styles.textStyle} />
          </View>
          <View
            style={[
              GlobalStyles.pv5,
              GlobalStyles.ph10,
              GlobalStyles.flexRow,
              GlobalStyles.mb20,
              GlobalStyles.alignCenter,
              styles.toggleContainer,
            ]}>
            <Paragraph textDarkGrayColor title={t('send_joint_message')} style={GlobalStyles.container} />
            <ToggleSwitch />
          </View>
          <IndividualJointBlockItem
            profile={feedState?.dataFeed}
            profileRefer={feedState?.dataProfileRefer}
            name={MESSAGE_FIELDS.individualMessage}
            register={register}
            multiline={true}
            numberOfLines={4}
            errors={errors}
            control={control}
            isValid={isValid}
            styleContainer={{...GlobalStyles.mb20, ...styles.styleItemContainer}}
            styleGroupImage={{
              ...GlobalStyles.fullWidth,
              ...GlobalStyles.alignCenter,
            }}
          />
          <Button
            title={t('submit')}
            h3
            textCenter
            containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
            textStyle={styles.h3BoldDefault}
            disabled={!isValid}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualJointModalScreen;
