import React from 'react';
import {View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  Button,
  IndividualJointBlockItem,
  IndividualMessageBlockItem,
  IndividualMessageBlockItem2,
} from '~Root/components';
import {
  IActionCreateIntroductionRequested,
  IActionCreateIntroductionSuccess,
  IFeedItemsState,
} from '~Root/services/feed/types';
import {GlobalStyles} from '~Root/config';
import {MESSAGE_FIELDS, MESSAGE_KEYS} from '~Root/config/fields';
import {createIntroduction} from '~Root/services/feed/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import styles from './styles';

interface Props {
  feedState: IFeedItemsState;
  isSwitch: boolean;
  schema: any;
  navigation: any;
}

interface ICredentials {
  [MESSAGE_KEYS.individualMessage]: string;
  [MESSAGE_KEYS.individualJoint]: string;
}

const Form: React.FC<Props> = ({feedState, isSwitch = false, schema, navigation}) => {
  const {t} = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();

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
        Toast.show({
          position: 'bottom',
          type: response.success ? 'success' : 'info',
          text1: 'Successfully',
          visibilityTime: 3000,
          autoHide: true,
        });
        setTimeout(() => {
          navigation.goBack();
        }, 3100);
      }),
    );
  };

  if (isSwitch) {
    return (
      <View style={GlobalStyles.flexColumn}>
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
    );
  }
  return (
    <View style={GlobalStyles.flexColumn}>
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
  );
};

export default Form;
