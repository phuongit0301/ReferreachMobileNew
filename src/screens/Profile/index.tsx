import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useSelector} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {Button, InputValidateControl, Paragraph, ProfileTemplateScreen} from '~Root/components';
import {BASE_COLORS, GlobalStyles, PROFILE_FIELDS} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';
import {IGlobalState} from '~Root/types';

const schema = yup.object().shape({
  first_name: yup.string().max(31, 'First Name must be at most 31 characters').required('First Name is required'),
  last_name: yup.string().max(31, 'Last Name must be at most 31 characters').required('Last Name is required'),
  title: yup.string().required('Job Title is required'),
  introductions: yup.string().max(248).required('Expertise / Pitch is required'),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileScreen = ({navigation}: any) => {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {t} = useTranslation();
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);

  const onSubmit: SubmitHandler<any> = (credentials: any) => {
    console.log(credentials);
    navigation.navigate(AppRoute.PROFILE_SECOND, {...credentials});
  };

  useEffect(() => {
    if (userInfo?.first_name) {
      setValue(PROFILE_FIELDS.first_name, userInfo?.first_name);
    }
    if (userInfo?.last_name) {
      setValue(PROFILE_FIELDS.last_name, userInfo?.last_name);
    }
    if (userInfo?.title) {
      setValue(PROFILE_FIELDS.title, userInfo?.title);
    }
    if (userInfo?.introductions) {
      setValue(PROFILE_FIELDS.introductions, userInfo?.introductions);
    }
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={[GlobalStyles.container]}>
      <ProfileTemplateScreen onBack={onBack} isRightButton={true} onToggleDrawer={onToggleDrawer}>
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
            onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.title)}
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
            name={PROFILE_FIELDS.title}
            register={register}
            autoFocus={true}
            onSubmitEditing={() => onSubmitEditing(PROFILE_FIELDS.introductions)}
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
            name={PROFILE_FIELDS.introductions}
            register={register}
            autoFocus={true}
            multiline={true}>
            <View style={styles.countCharacters}>
              <Paragraph title={`${(watch('introductions') as string)?.length ?? 0}/248`} />
            </View>
          </InputValidateControl>
          <View>
            <Button
              title={t('next')}
              h5
              textCenter
              onPress={handleSubmit(onSubmit)}
              containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
              textStyle={styles.h3BoldDefault}
              disabled={!isValid}
            />
          </View>
        </View>
      </ProfileTemplateScreen>
    </View>
  );
};

export default ProfileScreen;
