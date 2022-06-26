/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, TextInput, FlatList, Platform, KeyboardAvoidingView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {
  AskGreeting,
  Category,
  Category2,
  HeaderSmallBlueWithBG,
  InputIconValidate,
  InputIconValidateNew,
  Paragraph,
} from '~Root/components';
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
  business_details_suggestion: false,
};

const schema = yup.object().shape({
  [CREATE_ASK_FIELDS.greeting]: yup
    .string()
    .trim()
    .required('Field is a required')
    .max(28, 'Maximum characters exceeded'),
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
    setValue,
    watch,
    formState: {errors, isValid},
    reset,
    setFocus,
    trigger,
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const dispatch = useDispatch();
  const askState = useSelector((state: IGlobalState) => state.askState);

  const [currentPage] = useState(1);
  const [showForm, setShowForm] = useState(DEFAULT_FORM_STATE);
  const [showTooltip, setShowTooltip] = useState(true);
  const [textDemographic, setTextDemographic] = useState(askState?.dataPositionDropDown?.[0]);

  const [textGreetingDefault, setTextGreetingDefault] = useState(`${t('hi')}, `);
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

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onBack = () => {
    reset();
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onPage = (number: number) => {
    console.log(number);
  };

  /** Greeting Section */

  const onShowGreeting = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      greeting: true,
    });
    setTitleTooltip(t('ask_suggest_2'));
  };

  const onClearGreeting = async () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      greeting: true,
    });
    setValue(CREATE_ASK_FIELDS.greeting, '');
    setFocus(CREATE_ASK_FIELDS.greeting);
    await trigger(CREATE_ASK_FIELDS.greeting);
  };

  const onSetGreetingValue = async (text: string) => {
    setValue(CREATE_ASK_FIELDS.greeting, text);
    setTextGreetingDefault(text);
    setFocus(CREATE_ASK_FIELDS.greeting);
    await trigger(CREATE_ASK_FIELDS.greeting);
  };

  const onHideGreeting = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
    });
    if (watch(CREATE_ASK_FIELDS.greeting)) {
      setTitleTooltip(t('ask_suggest_3'));
    }
  };
  /** End Greeting Section */

  /** Role Section */
  const onShowRole = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      user_role: true,
    });
  };

  const onClearRole = async () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      user_role: true,
    });
    setValue(CREATE_ASK_FIELDS.userRole, '');
    setFocus(CREATE_ASK_FIELDS.userRole);
    await trigger(CREATE_ASK_FIELDS.userRole);
  };

  const onHideRole = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
    });
  };
  /** End Role Section */

  /** Business Requirement */
  const onShowBusinessRequirement = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_requirement: true,
    });
    setTitleTooltip(t('ask_suggest_4'));
    setTimeout(() => {
      setTitleTooltip(t('ask_suggest_5'));
    }, 5000);
  };

  const onClearBusinessRequirement = async () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_requirement: true,
    });
    setValue(CREATE_ASK_FIELDS.businessRequirement, '');
    setFocus(CREATE_ASK_FIELDS.businessRequirement);
    await trigger(CREATE_ASK_FIELDS.businessRequirement);
  };

  const onHideBusinessRequirement = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      business_requirement: false,
      business_detail: true,
    });
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
  /** End Business Requirement */

  /** Business Details */
  const onShowBusinessDetails = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_detail: true,
    });
  };

  const onClearBusinessDetails = async () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_detail: true,
    });
    setValue(CREATE_ASK_FIELDS.businessDetail, '');
    setFocus(CREATE_ASK_FIELDS.businessDetail);
    await trigger(CREATE_ASK_FIELDS.businessDetail);
  };

  const onHideBusinessDetails = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      business_detail: false,
    });
    setTitleTooltip(t('ask_suggest_6'));
  };

  const onShowBusinessDetailsSuggestion = () => {
    setShowForm({
      ...showForm,
      business_details_suggestion: true,
    });
    setTitleTooltip(t('ask_suggest_7'));
  };

  /** End Business Details */

  const onTooltipPress = () => {
    setShowTooltip(!showTooltip);
  };

  const onSetTextBusinessRequirement = (item: any) => {
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

  const onNext = (credentials: any) => {
    credentials.demographic = textDemographic;
    credentials.business_detail = `${t('to')} ${credentials.business_detail}`;
    console.log('credentials==========>', credentials);
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
                  <InputIconValidateNew
                    inputStyleWrapper={{
                      ...GlobalStyles.mr10,
                      ...(showForm?.greeting ? styles.inputDynamicActiveContainer : styles.inputDynamicContainer),
                    }}
                    inputStyle={{
                      ...GlobalStyles.mr5,
                      ...styles.inputMinWidth,
                      ...(showForm?.greeting ? styles.inputActiveStyle : styles.inputStyle),
                    }}
                    selectionColor={BASE_COLORS.blackColor}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.greeting}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    errorStyle={GlobalStyles.mt0}
                    uri={IMAGES.iconCloseBlue}
                    isEdit={showForm?.greeting}
                    imageStyleContainer={styles.styleTag}
                    onEndEditing={onHideGreeting}
                    onPressIn={onShowGreeting}
                    onIconClick={onClearGreeting}
                    defaultValue={textGreetingDefault}
                  />

                  <InputIconValidateNew
                    inputStyleWrapper={{
                      ...GlobalStyles.mr10,
                      ...(showForm?.user_role ? styles.inputDynamicActiveContainer : styles.inputDynamicContainer),
                    }}
                    inputStyle={{
                      ...GlobalStyles.mr5,
                      ...styles.inputMinWidth,
                      ...(showForm?.user_role ? styles.inputActiveStyle : styles.inputStyle),
                    }}
                    selectionColor={BASE_COLORS.blackColor}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.userRole}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    errorStyle={GlobalStyles.mt0}
                    uri={IMAGES.iconCloseBlue}
                    isEdit={showForm?.user_role}
                    imageStyleContainer={styles.styleTag}
                    onEndEditing={onHideRole}
                    onPressIn={onShowRole}
                    onIconClick={onClearRole}
                    visiblePlaceholderInput={true}
                    placeholderInput={t('role')}
                    placeholderTextInputStyle={{
                      ...GlobalStyles.mr3,
                      ...(showForm?.user_role
                        ? styles.placeholderTextInputActiveStyle
                        : styles.placeholderTextInputStyle),
                    }}
                    defaultValue={`${textUserRoleDefault}`}
                  />

                  <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
                    <SelectDropdown
                      data={askState?.dataPositionDropDown}
                      defaultValueByIndex={0}
                      onSelect={(selectedItem, index) => {
                        setTextDemographic(selectedItem);
                      }}
                      dropdownStyle={[styles.styleDropDown]}
                      buttonStyle={[styles.styleButton, GlobalStyles.ml5, GlobalStyles.mb10, GlobalStyles.pv5]}
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

                    <InputIconValidateNew
                      inputStyleWrapper={{
                        ...GlobalStyles.mr10,
                        ...(showForm?.business_requirement
                          ? styles.inputDynamicActiveContainer
                          : styles.inputDynamicContainer),
                      }}
                      inputStyle={{
                        ...GlobalStyles.mr5,
                        ...styles.inputMinWidth,
                        ...(showForm?.business_requirement ? styles.inputActiveStyle : styles.inputStyle),
                      }}
                      selectionColor={BASE_COLORS.blackColor}
                      errors={errors}
                      control={control}
                      name={CREATE_ASK_FIELDS.businessRequirement}
                      register={register}
                      styleContainer={GlobalStyles.mb5}
                      errorStyle={GlobalStyles.mt0}
                      uri={IMAGES.iconCloseBlue}
                      isEdit={showForm?.business_requirement}
                      imageStyleContainer={styles.styleTag}
                      onEndEditing={onHideBusinessRequirement}
                      onPressIn={onShowBusinessRequirement}
                      onIconClick={onClearBusinessRequirement}
                      onFocus={onShowBusinessRequirementSuggestion}
                      visiblePlaceholderInput={true}
                      placeholder={t('what')}
                      placeholderTextColor={
                        showForm?.business_requirement ? BASE_COLORS.steelBlue2Color : BASE_COLORS.whiteColor
                      }
                    />
                  </View>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
                    {(!!watch(CREATE_ASK_FIELDS.businessRequirement) || !!watch(CREATE_ASK_FIELDS.businessDetail)) && (
                      <InputIconValidateNew
                        inputStyleWrapper={{
                          ...GlobalStyles.mr10,
                          ...(showForm?.business_detail
                            ? styles.textAreaDynamicActiveContainer
                            : styles.textAreaDynamicContainer),
                        }}
                        inputStyle={{
                          ...GlobalStyles.mr5,
                          ...styles.inputMinWidth,
                          ...(showForm?.business_detail ? styles.inputActiveStyle : styles.inputStyle),
                        }}
                        selectionColor={BASE_COLORS.blackColor}
                        errors={errors}
                        control={control}
                        name={CREATE_ASK_FIELDS.businessDetail}
                        register={register}
                        styleContainer={GlobalStyles.mb5}
                        errorStyle={GlobalStyles.mt0}
                        uri={IMAGES.iconCloseBlue}
                        isEdit={showForm?.business_detail}
                        imageStyleContainer={styles.styleTag}
                        onEndEditing={onHideBusinessDetails}
                        onPressIn={onShowBusinessDetails}
                        onIconClick={onClearBusinessDetails}
                        onFocus={onShowBusinessDetailsSuggestion}
                        visiblePlaceholderInput={true}
                        placeholderInput={t('to')}
                        placeholderTextInputStyle={{
                          ...GlobalStyles.mr3,
                          ...(showForm?.business_detail
                            ? styles.placeholderTextAreaActiveStyle
                            : styles.placeholderTextAreaStyle),
                        }}
                        multiline={true}
                      />
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          {showForm?.greeting && (
            <AskGreeting
              data={askState?.dataGreetingSuggest}
              setText={onSetGreetingValue}
              textDefault={textGreetingDefault}
            />
          )}
          {(showForm?.business_requirement_suggestion && !!watch(CREATE_ASK_FIELDS.businessRequirement)) && (
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
