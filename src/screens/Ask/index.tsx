/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, TextInput, FlatList, Platform, KeyboardAvoidingView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {AskGreeting, Category, HeaderSmallBlueWithBG, InputIconValidate, Paragraph, Tags} from '~Root/components';
import {BASE_COLORS, CREATE_ASK_FIELDS, CREATE_ASK_KEYS, GlobalStyles, IMAGES} from '~Root/config';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {getJob, setDataCreateAsk1} from '~Root/services/ask/actions';

type Props = NativeStackScreenProps<BottomTabParams, AppRoute.AIR_FEED>;

const PAGINATION = [1, 2, 3];
const DEFAULT_FORM_STATE = {
  greeting: false,
  user_role: false,
  business_detail: false,
  business_requirement: true,
  description: false,
  business_requirement_suggestion: false,
  description_suggestion: false,
};

const schema = yup.object().shape({
  [CREATE_ASK_FIELDS.greeting]: yup.string().required('Field is a required').max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.userRole]: yup
    .string()
    .default('business developer')
    .required('Field is a required')
    .max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.demographic]: yup.string(),
  [CREATE_ASK_FIELDS.businessDetail]: yup
    .string()
    .default('to')
    .required('Field is a required')
    .max(111, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.businessRequirement]: yup
    .string()
    .required('Field is a required')
    .max(28, 'Maximum characters exceeded'),
});

const AskScreen = ({navigation}: any) => {
  const {t} = useTranslation();
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

  const dispatch = useDispatch();
  const askState = useSelector((state: IGlobalState) => state.askState);

  const [currentPage] = useState(1);
  const [showForm, setShowForm] = useState(DEFAULT_FORM_STATE);
  const [showTooltip, setShowTooltip] = useState(true);
  const [textDemographic, setTextDemographic] = useState(askState?.dataPositionDropDown?.[0]);
  const [textGreeting, setTextGreeting] = useState('');
  const [textDescriptionDefault, setTextDescriptionDefault] = useState('to');

  const [textGreetingDefault, setTextGreetingDefault] = useState('');
  const [textUserRoleDefault, setTextUserRoleDefault] = useState('business developer');
  const [titleTooltip, setTitleTooltip] = useState(t('ask_suggest_1'));

  useEffect(() => {
    if (watch(CREATE_ASK_FIELDS.businessRequirement) !== '' && showForm?.business_requirement) {
      dispatch(
        getJob(watch(CREATE_ASK_FIELDS.businessRequirement), response => {
          console.log('get job');
        }),
      );
    }
  }, [watch(CREATE_ASK_FIELDS.businessRequirement), showForm?.business_requirement]);

  const onBack = () => {
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onPage = (number: number) => {
    console.log(number);
  };

  const onShowGreeting = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      greeting: true,
    });
    setTitleTooltip(t('ask_suggest_2'));
  };

  const onShowRole = () => {
    setShowForm({
      ...showForm,
      business_detail: true,
    });
  };

  const onShowBusinessRequirement = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_requirement: true,
    });
  };

  const onShowBusinessDetails = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_detail: true,
    });
  };

  const onHideGreeting = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
    });
    if (textGreeting) {
      setTitleTooltip(t('ask_suggest_3'));
    }
  };

  const onTooltipPress = () => {
    setShowTooltip(!showTooltip);
  };

  const onSetTextBusinessRequirement = (item: any) => {
    // setTextBusinessRequirement(item?.attributes?.display_value);
    setValue(CREATE_ASK_FIELDS.businessRequirement, item?.attributes?.display_value);
  };

  const renderPositionItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => onSetTextBusinessRequirement(item)}
        style={[GlobalStyles.mh10, GlobalStyles.ph10, GlobalStyles.pv5, GlobalStyles.mb10, styles.btnGreetings]}>
        <Paragraph p textSteelBlue2Color bold600 title={item?.attributes?.display_value} />
      </TouchableOpacity>
    );
  };

  const onEndBusinessRequirement = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      business_requirement: false,
    });
  };

  const onEndBusinessDetails = () => {
    setShowForm({
      ...showForm,
      business_detail: false,
    });
    setTitleTooltip(t('ask_suggest_6'));
  };

  const onShowBusinessRequirementSuggestion = () => {
    setShowForm({
      ...showForm,
      business_requirement_suggestion: true,
    });
    setTitleTooltip(t('ask_suggest_4'));
    setTimeout(() => {
      setTitleTooltip(t('ask_suggest_5'));
    }, 5000);
  };

  const onShowDescriptionSuggestion = () => {
    setShowForm({
      ...showForm,
      description_suggestion: true,
    });
    setTitleTooltip(t('ask_suggest_7'));
  };

  const onNext = (credentials: any) => {
    if (credentials?.greeting) {
      credentials.greeting = `${textGreetingDefault !== '' ? textGreetingDefault : t('hi')} ${credentials?.greeting}`;
    }
    credentials.demographic = textDemographic;
    credentials.user_role = `${t('role')} ${credentials.user_role}`;
    dispatch(setDataCreateAsk1(credentials));
    navigation.navigate(AppRoute.ASK_TWO);
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
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]} key={`pagination-1-${item}`}>
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
                <View style={[GlobalStyles.ph15, GlobalStyles.mt15, GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
                  {showForm?.greeting ? (
                    <InputIconValidate
                      inputStyleWrapper={styles.inputDynamicContainer}
                      selectionColor={BASE_COLORS.blackColor}
                      placeholderTextColor={BASE_COLORS.grayColor}
                      placeholder={t('greeting')}
                      errors={errors}
                      control={control}
                      name={CREATE_ASK_FIELDS.greeting}
                      register={register}
                      styleContainer={GlobalStyles.mb5}
                      errorStyle={GlobalStyles.mt0}
                      onEndEditing={onHideGreeting}
                    />
                  ) : (
                    <Category
                      styleTag={styles.styleTag}
                      tagText={styles.tagText}
                      key={`greeting`}
                      name={`${textGreetingDefault !== '' ? textGreetingDefault : t('hi')} ${
                        watch(CREATE_ASK_FIELDS.greeting) ? (watch(CREATE_ASK_FIELDS.greeting) as string) : ''
                      }`}
                      showButton={true}
                      onPress={onShowGreeting}
                      uri={IMAGES.iconCloseBlue}
                    />
                  )}

                  {showForm?.user_role ? (
                    <InputIconValidate
                      inputStyleWrapper={styles.inputDynamicContainer}
                      selectionColor={BASE_COLORS.blackColor}
                      placeholderTextColor={BASE_COLORS.grayColor}
                      placeholder={t('role')}
                      errors={errors}
                      control={control}
                      name={CREATE_ASK_FIELDS.userRole}
                      register={register}
                      styleContainer={GlobalStyles.mb5}
                      errorStyle={GlobalStyles.mt0}
                      onEndEditing={onHideGreeting}
                    />
                  ) : (
                    <Category
                      styleTag={styles.styleTag}
                      tagText={styles.tagText}
                      key={`role`}
                      name={`${t('role')} ${
                        watch(CREATE_ASK_FIELDS.userRole)
                          ? (watch(CREATE_ASK_FIELDS.userRole) as string)
                          : textUserRoleDefault
                      }`}
                      showButton={true}
                      onPress={onShowRole}
                      uri={IMAGES.iconCloseBlue}
                    />
                  )}

                  <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
                    <SelectDropdown
                      data={askState?.dataPositionDropDown}
                      defaultValueByIndex={0}
                      onSelect={(selectedItem, index) => {
                        setTextDemographic(selectedItem);
                      }}
                      dropdownStyle={[styles.styleDropDown]}
                      buttonStyle={[styles.styleButton, GlobalStyles.ml5, GlobalStyles.mb5, GlobalStyles.pv5]}
                      buttonTextStyle={styles.buttonTextStyle}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                      renderDropdownIcon={() => (
                        <FastImage source={IMAGES.iconDropDown} resizeMode='cover' style={styles.iconDropDown} />
                      )}
                    />

                    {!watch(CREATE_ASK_FIELDS.businessRequirement) || showForm?.business_requirement ? (
                      <InputIconValidate
                        inputStyleWrapper={styles.inputContainer}
                        selectionColor={BASE_COLORS.blackColor}
                        placeholderTextColor={BASE_COLORS.grayColor}
                        placeholder={t('what')}
                        errors={errors}
                        control={control}
                        name={CREATE_ASK_FIELDS.businessRequirement}
                        register={register}
                        styleContainer={GlobalStyles.mb5}
                        errorStyle={GlobalStyles.mt0}
                        onEndEditing={onEndBusinessRequirement}
                        onFocus={onShowBusinessRequirementSuggestion}
                        editable={!!watch(CREATE_ASK_FIELDS.greeting)}
                      />
                    ) : (
                      <Category
                        styleTag={styles.styleTag}
                        tagText={styles.tagText}
                        key={`businessRequirement`}
                        name={`${
                          watch(CREATE_ASK_FIELDS.businessRequirement)
                            ? (watch(CREATE_ASK_FIELDS.businessRequirement) as string)
                            : ''
                        }`}
                        showButton={true}
                        onPress={onShowBusinessRequirement}
                        uri={IMAGES.iconCloseBlue}
                      />
                    )}
                  </View>
                  {!!watch(CREATE_ASK_FIELDS.businessRequirement) &&
                    (showForm?.business_detail ? (
                      <InputIconValidate
                        inputStyleWrapper={styles.inputAreaContainer}
                        selectionColor={BASE_COLORS.blackColor}
                        placeholderTextColor={BASE_COLORS.grayColor}
                        placeholder='to...(elaborate on your Ask)'
                        errors={errors}
                        control={control}
                        name={CREATE_ASK_FIELDS.businessDetail}
                        register={register}
                        styleContainer={GlobalStyles.mb5}
                        errorStyle={GlobalStyles.mt0}
                        onEndEditing={onEndBusinessDetails}
                        onFocus={onShowDescriptionSuggestion}
                        multiline={true}
                      />
                    ) : (
                      <Category
                        styleTag={styles.styleTag}
                        tagText={styles.tagText}
                        key={`details`}
                        name={`${
                          watch(CREATE_ASK_FIELDS.businessDetail)
                            ? `to ${watch(CREATE_ASK_FIELDS.businessDetail).trim()}`
                            : 'to '
                        }`}
                        showButton={true}
                        onPress={onShowBusinessDetails}
                        uri={IMAGES.iconCloseBlue}
                      />
                    ))}
                </View>
              </View>
            </ScrollView>
          </View>
          {showForm?.greeting && (
            <AskGreeting
              data={askState?.dataGreetingSuggest}
              setText={setTextGreetingDefault}
              textDefault={textGreetingDefault}
            />
          )}
          {showForm?.business_requirement_suggestion && (
            <View style={[GlobalStyles.mh20, GlobalStyles.container, GlobalStyles.pv15, styles.borderTop]}>
              <FlatList
                contentContainerStyle={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.container]}
                style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}
                data={askState?.dataPositionSuggest}
                renderItem={renderPositionItem}
                keyExtractor={(item, index) => `position-suggest-${index}`}
                keyboardShouldPersistTaps='handled'
              />
            </View>
          )}
          <View>
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
            {isValid ? (
              <TouchableOpacity style={styles.iconCatContainer} onPress={handleSubmit(onNext)}>
                <FastImage source={IMAGES.iconCatNext} resizeMode='cover' style={styles.iconCatNext} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[GlobalStyles.center, styles.iconCatContainer]}>
                <View style={[styles.btnMain, GlobalStyles.pv12]} />
                <FastImage source={IMAGES.iconCat1} resizeMode='cover' style={[styles.iconCat]} />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default AskScreen;
