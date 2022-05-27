import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {HeaderSmallBlueWithBG, InputIconValidate, Paragraph} from '~Root/components';
import {BASE_COLORS, CREATE_ASK_FIELDS, CREATE_ASK_KEYS, GlobalStyles, IMAGES} from '~Root/config';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Svg, { Path } from 'react-native-svg';

type Props = NativeStackScreenProps<BottomTabParams, AppRoute.AIR_FEED>;

const PAGINATION = [1, 2, 3];

const schema = yup.object().shape({
  location: yup.string().required('Location is required'),
  deadline: yup.string().required('Deadline is required'),
});

const AskTwocreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const [currentPage, setPage] = useState(2);
  const [showTooltip, setShowTooltip] = useState(true);
  const [titleTooltip, setTitleTooltip] = useState('Where and when do you need it? Any criteria?');

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onBack = () => {
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onTooltipPress = () => {
    setShowTooltip(!showTooltip);
  };

  const onPage = (number: number) => {
    if (number === 1) {
      navigation.goBack();
    }
  };

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  return (
    <View style={[GlobalStyles.container]}>
      <HeaderSmallBlueWithBG
        title={t('create_ask')}
        isBackButton={true}
        onBack={onBack}
        isRightButton={true}
        onRightPress={onToggleDrawer}
      />
      <View style={[GlobalStyles.container, styles.container, styles.contentContainer]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.container}
          keyboardVerticalOffset={80}>
          <View style={[GlobalStyles.mb20, GlobalStyles.container]}>
            <ScrollView>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.mt10]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyCenter]}>
                  {PAGINATION.map(item => {
                    return (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                        {currentPage === item ? (
                          <LinearGradient
                            colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
                            style={[styles.btnActive, GlobalStyles.center, GlobalStyles.m5]}>
                            <Paragraph bold600 textWhite title={`${item}`} />
                          </LinearGradient>
                        ) : (
                          <TouchableOpacity
                            onPress={() => onPage(item)}
                            style={[styles.btn, GlobalStyles.center, GlobalStyles.m5]}>
                            <Paragraph bold600 textWhite title={`${item}`} />
                          </TouchableOpacity>
                        )}
                        {item < PAGINATION.length && (
                          <FastImage source={IMAGES.dotPagination} resizeMode='cover' style={styles.dotPagination} />
                        )}
                      </View>
                    );
                  })}
                </View>
                <View style={[GlobalStyles.container, GlobalStyles.mh15, GlobalStyles.mt20]}>
                  <InputIconValidate
                    label={`${t('location')}*`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder='Select Your Location'
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.location}
                    register={register}
                    showIcon={true}
                    isIconImage={true}
                    uri={IMAGES.iconGlobeEarth}
                    imageStyleContainer={styles.iconContainer}
                    styleContainer={GlobalStyles.mb5}
                    imageStyle={styles.icon}
                    onSubmitEditing={() => onSubmitEditing(CREATE_ASK_KEYS.deadline)}
                  />
                  <InputIconValidate
                    label={`${t('by_when')}*`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder='Deadline'
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.deadline}
                    register={register}
                    showIcon={true}
                    isIconImage={true}
                    uri={IMAGES.iconCalendarBlue}
                    imageStyleContainer={styles.iconContainer}
                    styleContainer={GlobalStyles.mb5}
                    imageStyle={styles.icon}
                  />
                  <InputIconValidate
                    label={`${t('criteria')} 1`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('criteria')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.criteria}
                    register={register}
                    showIcon={false}
                    styleContainer={GlobalStyles.mb5}
                  />
                  <InputIconValidate
                    label={`${t('criteria')} 2`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder='Deadline'
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.criteria}
                    register={register}
                    showIcon={true}
                    isIconImage={true}
                    uri={IMAGES.iconSubtract}
                    imageStyleContainer={styles.iconContainer}
                    styleContainer={GlobalStyles.mb5}
                    imageStyle={styles.iconSubtract}
                  />
                  <TouchableOpacity>
                    <Paragraph textForestGreen2Color bold600 title='+ Add New Criteria' style={styles.btnAdd} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={GlobalStyles.container}>
              {showTooltip && (
                <View style={styles.tooltipContentStyle}>
                  <View style={GlobalStyles.flexColumn}>
                    <View style={[GlobalStyles.mb10, GlobalStyles.flexRow, styles.tooltipCloseBtnContainer]}>
                      <TouchableOpacity onPress={onTooltipPress}>
                        <FastImage
                          source={IMAGES.iconCloseCircleWhite}
                          resizeMode='cover'
                          style={styles.iconCloseCircleWhite}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.iconTriangle}>
                      <Svg width='19' height='13' viewBox='0 0 19 13' fill='none'>
                        <Path d='M19 13H0L7.308 0 19 13z' fill='#fff' />
                      </Svg>
                    </View>
                    <Paragraph style={styles.textSmall} title={titleTooltip} />
                  </View>
                </View>
              )}
              <TouchableOpacity style={styles.iconCatContainer} onPress={() => navigation.navigate(AppRoute.ASK_TWO)}>
                <FastImage source={IMAGES.iconCatNext} resizeMode='cover' style={styles.iconCatNext} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default AskTwocreen;
