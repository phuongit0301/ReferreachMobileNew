import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';

import {
  Button,
  HeaderSmallTransparent,
  IndividualJointBlockItem,
  IndividualMessageBlockItem,
  IndividualMessageBlockItem2,
  Loading,
  Paragraph,
  ToggleSwitch,
} from '~Root/components';
import {AppRoute} from '~Root/navigation/AppRoute';
import {MESSAGE_FIELDS, MESSAGE_KEYS} from '~Root/config/fields';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {IActionCreateIntroductionRequested, IActionCreateIntroductionSuccess} from '~Root/services/feed/types';
import {createIntroduction} from '~Root/services/feed/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';

const schema = yup.object().shape({
  [MESSAGE_FIELDS.individualMessage]: yup.string().required('Field is a required').max(200),
  [MESSAGE_FIELDS.individualJoint]: yup.string().required('Field is a required').max(200),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INDIVIDUAL_MESSAGE_MODAL>;

interface ICredentials {
  [MESSAGE_KEYS.individualMessage]: string;
  [MESSAGE_KEYS.individualJoint]: string;
}

const IndividualMessageModalScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    unregister,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const [isSwitch, setSwitch] = useState(false);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onSwitch = (bool: boolean) => {
    if (bool) {
      unregister('introducerFeedback');
    } else {
      register('introducerFeedback', {required: true});
    }
    setSwitch(bool);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSubmit: SubmitHandler<IActionCreateIntroductionRequested['payload']> = (credentials: ICredentials) => {
    if (!feedState?.dataFeed?.data || !feedState?.dataProfileRefer?.included) {
      return false;
    }

    const payload = {
      message_for_asker: credentials?.message_for_asker,
      message_for_introducee: isSwitch ? credentials?.message_for_asker : credentials?.message_for_introducee,
      ask_id: feedState?.dataFeed?.data[0]?.attributes?.ask_id,
      introducee_id: feedState?.dataProfileRefer?.included[0].id,
    };

    dispatch(showLoading());
    dispatch(
      createIntroduction(payload, (response: IActionCreateIntroductionSuccess['payload']) => {
        console.log('response===>', response);
        dispatch(hideLoading());
        navigation.goBack();
      }),
    );
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
            <ToggleSwitch onSwitch={onSwitch} />
          </View>
          {isSwitch ? (
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb20]}>
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
            </View>
          ) : (
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mb20]}>
              <IndividualMessageBlockItem
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
                  ...GlobalStyles.justifyBetween,
                  ...GlobalStyles.ph20,
                  ...GlobalStyles.alignCenter,
                }}
              />
              <IndividualMessageBlockItem2
                profile={feedState?.dataFeed}
                profileRefer={feedState?.dataProfileRefer}
                name={MESSAGE_FIELDS.individualJoint}
                register={register}
                multiline={true}
                numberOfLines={4}
                errors={errors}
                control={control}
                isValid={isValid}
                styleContainer={styles.styleItemContainer}
                styleGroupImage={{
                  ...GlobalStyles.fullWidth,
                  ...GlobalStyles.justifyBetween,
                  ...GlobalStyles.ph20,
                  ...GlobalStyles.alignCenter,
                }}
              />
            </View>
          )}
          <Button
            title={t('submit')}
            h3
            textCenter
            containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
            textStyle={styles.h3BoldDefault}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      <Loading />
    </View>
  );
};

export default IndividualMessageModalScreen;
