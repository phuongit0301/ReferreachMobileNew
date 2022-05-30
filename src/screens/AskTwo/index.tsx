import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {HeaderSmallBlueWithBG, InputIconValidate, Paragraph} from '~Root/components';
import {BASE_COLORS, CREATE_ASK_FIELDS, CREATE_ASK_KEYS, GlobalStyles, IMAGES} from '~Root/config';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Svg, {Path} from 'react-native-svg';
import { dateFormat3, dateWithMonthsDelay } from '~Root/utils';

type Props = NativeStackScreenProps<BottomTabParams, AppRoute.AIR_FEED>;

const PAGINATION = [1, 2, 3];

const schema = yup.object().shape({
  [CREATE_ASK_FIELDS.location]: yup.string().required('Location is required'),
  [CREATE_ASK_FIELDS.deadline]: yup.string().required('Deadline is required'),
});

const AskTwocreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const [currentPage, setPage] = useState(2);
  const [showTooltip, setShowTooltip] = useState(true);
  const [titleTooltip, setTitleTooltip] = useState('Where and when do you need it? Any criteria?');
  const [inputDynamic, setInputDynamic] = useState(['1']);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
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

  const onRemoveInput = (index: number) => {
    const temp = inputDynamic.filter((item: any, i: number) => i !== index);
    setInputDynamic(temp);
  };

  const onAddInput = () => {
    if (inputDynamic.length < 4) {
      setInputDynamic([...inputDynamic, '1']);
    }
  };

  const onShowDatePicker = () => {
    setVisibleDatePicker(!visibleDatePicker);
  };

  const onChangeDatePicker = (date: Date) => {
    let currentDate = date || new Date();
    currentDate = dateWithMonthsDelay(currentDate, 0);
    setValue(CREATE_ASK_FIELDS.deadline, dateFormat3(currentDate));
    setVisibleDatePicker(!visibleDatePicker);
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
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]} key={`pagination-2-${item}`}>
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
                    editable={false}
                    onPressIn={onShowDatePicker}
                  />
                  <DateTimePickerModal
                    key={`template-date`}
                    isVisible={visibleDatePicker}
                    mode='datetime'
                    onConfirm={(date: Date) => onChangeDatePicker(date)}
                    onCancel={onShowDatePicker}
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
                  {inputDynamic.length > 0 &&
                    inputDynamic.map((item, index) => (
                      <InputIconValidate
                        label={`${t('criteria')} ${index + 2}`}
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
                        onIconClick={() => onRemoveInput(index)}
                      />
                    ))}
                  <TouchableOpacity onPress={onAddInput}>
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
              <TouchableOpacity style={styles.iconCatContainer} onPress={() => navigation.navigate(AppRoute.ASK_THREE)}>
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