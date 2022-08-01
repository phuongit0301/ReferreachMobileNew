import React from 'react';
import {View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {usePubNub} from 'pubnub-react';

import {
  Button,
  IndividualJointBlockItem,
  IndividualMessageBlockItem,
  IndividualMessageBlockItem2,
} from '~Root/components';
import {IActionCreateIntroductionRequested, IFeedItemsState} from '~Root/services/feed/types';
import {GlobalStyles} from '~Root/config';
import {MESSAGE_FIELDS, MESSAGE_KEYS} from '~Root/config/fields';
import {createIntroduction} from '~Root/services/feed/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import styles from './styles';
import { AppRoute } from '~Root/navigation/AppRoute';

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
  const pubnub = usePubNub();
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
      createIntroduction(payload, (response: any) => {
        if (!response) {
          dispatch(hideLoading());
          return;
        }
        if (response?.included?.length > 0) {
          const chatContexts = response.included.find((x: any) => x.type === 'chat_contexts');
          console.log('feedState?.dataFeed=======>', feedState?.dataFeed);
          // chatContexts
          if (
            // eslint-disable-next-line prettier/prettier
            (feedState?.dataFeed.data?.length > 0 && feedState?.dataFeed.data[0]?.attributes?.user?.id) &&
            (feedState?.dataProfileRefer?.included &&
            feedState?.dataProfileRefer?.included?.length > 0 &&
            feedState?.dataProfileRefer?.included[0]?.id)
          ) {
            // dispatch(hideLoading());
            // Toast.show({
            //   position: 'bottom',
            //   type: response.success ? 'success' : 'info',
            //   text1: 'Successfully',
            //   visibilityTime: 3000,
            //   autoHide: true,
            // });
            const pubnubMessages = [
              {
                text: payload?.message_for_asker,
                userId: feedState?.dataFeed.data[0]?.attributes?.user?.id,
              },
              {
                text: payload?.message_for_introducee,
                userId: feedState?.dataProfileRefer?.included[0]?.id,
              },
            ];
            console.log('pubnubMessages=======>', JSON.stringify(pubnubMessages));
            const promises = [];
            for (const item of pubnubMessages) {
              promises.push(
                pubnub
                  .publish({
                    channel: chatContexts.attributes?.chat_uuid,
                    message: {
                      text: item?.text,
                      userId: item?.userId,
                      fullName1: '',
                      fullName2: '',
                      createdAt: new Date(),
                    },
                  })
                  .then(() => console.log('insert pubnub done'))
                  .catch(error => console.log(JSON.stringify(error))),
              );
            }

            return Promise.all(promises).then(() => {
              dispatch(hideLoading());
              Toast.show({
                position: 'bottom',
                type: response.success ? 'success' : 'info',
                text1: 'Successfully',
                visibilityTime: 2000,
                autoHide: true,
              });
              setTimeout(() => {
                navigation.navigate(AppRoute.CHAT_INTERNAL, {contextId: chatContexts?.id});
              }, 2100);
            });
          }
        }
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
