import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {
  Button,
  HeaderSmallTransparent,
  Icon,
  InputValidateControl,
  Paragraph,
  ProfileTemplateScreen,
} from '~Root/components';
import {BASE_COLORS, GlobalStyles, PROFILE_FIELDS} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';
import {adjust} from '~Root/utils';

const schema = yup.object().shape({
  first_name: yup.string().max(31, 'First Name must be at most 31 characters').required('First Name is required'),
  last_name: yup.string().max(31, 'Last Name must be at most 31 characters').required('Last Name is required'),
  job_title: yup.string().required('Job Title is required'),
  expertise: yup.string().max(248).required('Expertise / Pitch is required'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileScreen = ({navigation}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();

  const onSubmit: SubmitHandler<any> = (credentials: any) => {
    navigation.navigate(AppRoute.PROFILE_SECOND);
    // if (credentials.first_name && credentials.last_name) {
    //   console.log(1312323);
    // }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  return (
    <View style={[GlobalStyles.container]}>
      <ProfileTemplateScreen onBack={onBack}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
          <InputValidateControl
            label={`${t('first_name')}*`}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            inputErrorStyle={styles.inputErrorStyle}
            selectionColor={BASE_COLORS.blackColor}
            placeholderTextColor={BASE_COLORS.blackColor}
            errors={errors}
            control={control}
            name={PROFILE_FIELDS.first_name}
            register={register}
            autoFocus={true}
            onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.last_name)}
          />
          <InputValidateControl
            label={`${t('last_name')}*`}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            inputErrorStyle={styles.inputErrorStyle}
            selectionColor={BASE_COLORS.blackColor}
            placeholderTextColor={BASE_COLORS.blackColor}
            errors={errors}
            control={control}
            name={PROFILE_FIELDS.last_name}
            register={register}
            autoFocus={true}
            onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.job_title)}
          />
          <InputValidateControl
            label={`${t('job_title')}*`}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            inputErrorStyle={styles.inputErrorStyle}
            selectionColor={BASE_COLORS.blackColor}
            placeholderTextColor={BASE_COLORS.blackColor}
            errors={errors}
            control={control}
            name={PROFILE_FIELDS.job_title}
            register={register}
            autoFocus={true}
            onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.expertise)}
          />
          <InputValidateControl
            label={`${t('expertise')}*`}
            inputStyle={styles.textAreaStyle}
            labelStyle={styles.labelStyle}
            inputErrorStyle={styles.inputErrorStyle}
            selectionColor={BASE_COLORS.blackColor}
            placeholderTextColor={BASE_COLORS.blackColor}
            errors={errors}
            control={control}
            name={PROFILE_FIELDS.expertise}
            register={register}
            autoFocus={true}
            multiline={true}>
            <View style={styles.countCharacters}>
              <Paragraph title={`${(watch('expertise') as string)?.length ?? 0}/248`} />
            </View>
          </InputValidateControl>
          <View>
            <Button
              title={t('next')}
              h5
              textCenter
              // onPress={handleSubmit(onSubmit)}
              onPress={onSubmit}
              containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
              textStyle={styles.h3BoldDefault}
              // disabled={!isValid}
            />
          </View>
        </View>
      </ProfileTemplateScreen>
    </View>
  );
};

export default ProfileScreen;
