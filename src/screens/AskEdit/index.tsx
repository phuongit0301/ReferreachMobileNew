import React, {useCallback, useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Trans, useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, useFieldArray} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import moment from 'moment';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, HeaderSmallTransparent, InputIconValidate, Loading, Location, Paragraph} from '~Root/components';
import {BASE_COLORS, CREATE_ASK_FIELDS, CREATE_ASK_KEYS, GlobalStyles, IMAGES} from '~Root/config';
import {calculateExpiredTime, dateFormat3, dateWithMonthsDelay} from '~Root/utils';
import {getAskDetails, updateAsk} from '~Root/services/ask/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {
  IActionGetAskDetailsFailure,
  IActionGetAskDetailsSuccess,
  IActionUpdateAskSuccess,
  IAskInside,
  IFiles,
} from '~Root/services/ask/types';
import {setAskDetails} from '~Root/services/askDetails/actions';
import {IGlobalState} from '~Root/types';
import styles from './styles';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const schema = yup.object().shape({
  [CREATE_ASK_FIELDS.greeting]: yup.string().required('Field is a required').max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.userRole]: yup
    .string()
    .default('business developer')
    .required('Field is a required')
    .max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.demographic]: yup.string(),
  [CREATE_ASK_FIELDS.businessRequirement]: yup
    .string()
    .required('Field is a required')
    .max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.businessDetail]: yup
    .string()
    .default('to')
    .required('Field is a required')
    .max(130, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.location]: yup.string().required('Invalid Input'),
  [CREATE_ASK_FIELDS.deadline]: yup.string().required('Invalid Input'),
  [CREATE_ASK_FIELDS.criteria]: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      text: yup.string().max(28, 'Maximum characters exceeded'),
    }),
  ),
  [CREATE_ASK_FIELDS.criteria0]: yup.string().max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.criteria1]: yup.string().max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.criteria2]: yup.string().max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.criteria3]: yup.string().max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.criteria4]: yup.string().max(28, 'Maximum characters exceeded'),
  [CREATE_ASK_FIELDS.additiondalDetail]: yup.string().max(130, 'Maximum characters exceeded'),
});

const AskEditScreen = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const {
    register,
    trigger,
    control,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    reset,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'criteria',
  });

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const loadingState = useSelector((state: IGlobalState) => state.loadingState);
  const askState = useSelector((state: IGlobalState) => state.askState);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [inputDynamic, setInputDynamic] = useState<{
    items: any[];
    deleted: any[];
  }>({
    items: [],
    deleted: [],
  });
  const [textAdditionalDetail, setTextAdditionalDetail] = useState('');
  const [textBusinessDetail, setTextBusinessDetail] = useState('');
  const [textDemographic, setTextDemographic] = useState(askState?.dataPositionDropDown?.[0]);
  const [filesUpload, setFilesUpload] = useState<Array<DocumentPickerResponse | IFiles>>([]);
  const [filesDeleted, setFilesDeleted] = useState<Array<DocumentPickerResponse | IFiles>>([]);

  useEffect(() => {
    if (!(route.params as any)?.id) {
      navigation.goBack();
    }

    dispatch(showLoading());
    dispatch(
      getAskDetails(
        (route.params as any)?.id,
        (response: IActionGetAskDetailsSuccess['payload'] | IActionGetAskDetailsFailure['payload']) => {
          if (response?.data) {
            setFilesDeleted([]);
            setDataForm(response?.data?.attributes);
            setFilesUpload(response?.data?.attributes?.documents);
          }
          dispatch(hideLoading());
        },
      ),
    );
    return () => {
      navigation.setParams({id: null});
      setAskDetails();
    };
  }, [isFocused]);

  const setDataForm = (item: IAskInside['attributes']) => {
    if (item?.greeting) {
      setValue(CREATE_ASK_FIELDS.greeting, item.greeting);
    }
    if (item?.user_role) {
      setValue(CREATE_ASK_FIELDS.userRole, item.user_role);
    }
    if (item?.demographic) {
      setValue(CREATE_ASK_FIELDS.demographic, item.demographic);
      setTextDemographic(item.demographic);
    }
    if (item?.business_requirement) {
      setValue(CREATE_ASK_FIELDS.businessRequirement, item.business_requirement);
    }
    if (item?.business_detail) {
      setValue(CREATE_ASK_FIELDS.businessDetail, item.business_detail);
      setTextBusinessDetail(item.business_detail);
    }
    if (item?.deadline) {
      setValue(CREATE_ASK_FIELDS.deadline, dateFormat3(item.deadline));
    }
    if (item?.criterium && item?.criterium?.length > 0) {
      setValue(CREATE_ASK_FIELDS.criteria, item?.criterium);
    }
    if (item?.additional_detail) {
      setValue(CREATE_ASK_FIELDS.additiondalDetail, item.additional_detail);
      setTextAdditionalDetail(item.additional_detail);
    }
  };

  useEffect(() => {
    if (watch(CREATE_ASK_FIELDS.criteria)?.length > 0) {
      watch(CREATE_ASK_FIELDS?.criteria).forEach((x: any, index: number) => {
        if (CREATE_ASK_FIELDS[`criteria${index}`]) {
          setValue(CREATE_ASK_FIELDS[`criteria${index}`], x?.text ?? '');
        }
      });
    }
  }, [watch(CREATE_ASK_FIELDS.criteria)]);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onRemoveInput = (index: number) => {
    const items = watch(CREATE_ASK_FIELDS.criteria);
    remove(index);
    setInputDynamic({
      ...inputDynamic,
      deleted: [...inputDynamic.deleted, items[index]],
    });
  };

  const onAddInput = () => {
    if (watch(CREATE_ASK_FIELDS.criteria)?.length < 4) {
      append({text: ''});
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

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  const onAdditionalDetailChange = (text: string) => {
    setTextAdditionalDetail(text);
  };

  const onBusinessDetailChange = (text: string) => {
    setTextBusinessDetail(text);
  };

  const onSelect = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.xls,
        ],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      const items = [...filesUpload, ...res];
      if (items.length > 2) {
        Alert.alert('Maximum files exceeded');
        return;
      }
      setFilesUpload(items);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.log('Unknown Error: ' + JSON.stringify(err));
      }
    }
  }, [filesUpload]);

  const removeFile = (index: number) => {
    const file = filesUpload[index];
    if ('id' in file && file?.id) {
      const items = filesDeleted && filesDeleted?.length > 0 ? [...filesDeleted, file] : [file];
      setFilesDeleted(items);
    }
    setFilesUpload([...filesUpload.filter((_: any, i: number) => index !== i)]);
  };

  const onBack = () => {
    navigation.navigate(AppRoute.YOUR_ASK);
  };

  const onSave = (credentials: any) => {
    credentials[CREATE_ASK_FIELDS.businessDetail] = textBusinessDetail;
    credentials[CREATE_ASK_FIELDS.demographic] = textDemographic;
    credentials[CREATE_ASK_FIELDS.additiondalDetail] = textAdditionalDetail;
    const formData = new FormData();
    const formDataRemove = new FormData();

    if (credentials.greeting) {
      formData.append(CREATE_ASK_FIELDS.greeting, credentials.greeting);
    }
    if (credentials.demographic) {
      formData.append(CREATE_ASK_FIELDS.demographic, textDemographic);
    }
    if (credentials.user_role) {
      formData.append(CREATE_ASK_FIELDS.userRole, credentials.user_role);
    }
    if (credentials.business_requirement) {
      formData.append(CREATE_ASK_FIELDS.businessRequirement, credentials.business_requirement);
    }
    if (credentials.business_detail) {
      formData.append(CREATE_ASK_FIELDS.businessDetail, textBusinessDetail);
    }
    if (credentials.deadline) {
      formData.append(CREATE_ASK_FIELDS.deadline, moment(credentials.deadline).format('DD/MM/YYYY'));
    }
    if (credentials.location) {
      formData.append('ask_location_attributes[text]', credentials.location);
      formData.append('ask_location_attributes[id]', askState?.dataDetails?.attributes?.ask_location?.id);
    }

    if (credentials.criteria) {
      for (let i = 0; i < credentials.criteria?.length; i++) {
        if (credentials[`criteria${i}`] && credentials[`criteria${i}`] !== '') {
          formData.append('criterium_attributes[][text]', credentials[`criteria${i}`]);

          if (credentials.criteria[i]?.id) {
            formData.append('criterium_attributes[][id]', credentials.criteria[i]?.id);
          }
        }
      }
      delete credentials.criteria;
    }

    if (inputDynamic.deleted.length > 0) {
      for (const item of inputDynamic.deleted) {
        formDataRemove.append('criterium_attributes[][id]', item.id);
        formDataRemove.append('criterium_attributes[][_destroy]', true);
      }
    }

    if (credentials.additional_detail) {
      formData.append(CREATE_ASK_FIELDS.additiondalDetail, credentials.additional_detail);
    }

    if (filesUpload?.length) {
      for (const file of filesUpload) {
        if (!file?.id) {
          formData.append('documents_attributes[][file]', {
            name: 'name' in file ? file?.name : '',
            type: 'type' in file ? file?.type : '',
            uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
          });
        }
      }
    }

    if (filesDeleted?.length) {
      for (const file of filesDeleted) {
        formDataRemove.append('documents_attributes[][id]', file?.id);
        formDataRemove.append('documents_attributes[][_destroy]', true);
      }
    }

    dispatch(showLoading());
    dispatch(
      updateAsk(
        {
          formData,
          formDataRemove: filesDeleted?.length > 0 || inputDynamic?.deleted?.length > 0 ? formDataRemove : null,
          id: (route.params as any)?.id,
        },
        (response: IActionUpdateAskSuccess['payload']) => {
          dispatch(hideLoading());
          reset();
          if (response?.success) {
            if (response?.isExpired) {
              Toast.show({
                position: 'bottom',
                type: 'info',
                text1: response?.message,
                visibilityTime: 1200,
                autoHide: true,
              });
            } else {
              Toast.show({
                position: 'bottom',
                type: 'success',
                text1: response.message,
                visibilityTime: 1200,
                autoHide: true,
              });
            }
            setTimeout(() => {
              navigation.navigate(AppRoute.BOTTOM_TAB, {
                screen: AppRoute.YOUR_ASK,
              });
            }, 1400);
          }
        },
      ),
    );
  };

  if (loadingState?.loading) {
    return <Loading />;
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.bgWhite]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent
          title={t('your_ask')}
          isBackButton={true}
          isRightButton={true}
          onRightPress={onToggleDrawer}
          onBack={onBack}
        />
        <View style={[GlobalStyles.container]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={GlobalStyles.container}
            keyboardVerticalOffset={80}>
            <View style={[GlobalStyles.mb20, GlobalStyles.container]}>
              <ScrollView nestedScrollEnabled={true}>
                <View style={GlobalStyles.alignCenter}>
                  <Trans
                    i18nKey='time_left'
                    values={{
                      mins: `${parseInt(`${calculateExpiredTime(askState?.dataDetails?.attributes?.created_at)}`, 10)}`,
                    }}
                    parent={Text}
                    components={{
                      normal: <Text style={GlobalStyles.textNormal} />,
                      highlight: <Text style={GlobalStyles.textBlue} />,
                    }}
                  />
                </View>
                <View style={[GlobalStyles.container, GlobalStyles.mh15, GlobalStyles.mt20]}>
                  <InputIconValidate
                    label={`${t('greeting')}*`}
                    inputStyleWrapper={styles.inputDynamicContainer}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('greeting')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.greeting}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    errorStyle={GlobalStyles.mt0}
                    onSubmitEditing={() => onSubmitEditing(CREATE_ASK_KEYS.userRole)}
                  />
                  <InputIconValidate
                    label={`${t('your_role')}*`}
                    inputStyleWrapper={styles.inputDynamicContainer}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('your_role')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.userRole}
                    register={register}
                    styleContainer={GlobalStyles.mb10}
                    errorStyle={GlobalStyles.mt0}
                  />
                  <View style={GlobalStyles.mb10}>
                    <SelectDropdown
                      data={askState?.dataPositionDropDown}
                      defaultValue={askState?.dataDetails?.attributes?.demographic}
                      onSelect={(selectedItem, index) => {
                        setTextDemographic(selectedItem);
                      }}
                      dropdownStyle={[styles.styleDropDown]}
                      buttonStyle={[styles.styleButton, GlobalStyles.ml5, GlobalStyles.mb5, GlobalStyles.pv5]}
                      buttonTextStyle={styles.buttonTextStyle}
                      buttonTextAfterSelection={(selectedItem, _index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, _index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                      renderDropdownIcon={() => (
                        <FastImage source={IMAGES.iconDropDown} resizeMode='cover' style={styles.iconDropDown} />
                      )}
                    />
                  </View>
                  <InputIconValidate
                    label={`${t('description')}*`}
                    inputStyleWrapper={styles.inputDynamicContainer}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('description')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.businessRequirement}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    errorStyle={GlobalStyles.mt0}
                    onSubmitEditing={() => onSubmitEditing(CREATE_ASK_KEYS.businessDetail)}
                  />
                  <View style={[GlobalStyles.flexColumn, GlobalStyles.mb10]}>
                    <Paragraph bold600 textSteelBlue2Color h5 title='Details*' style={GlobalStyles.mr5} />
                    <View style={[GlobalStyles.mb5, styles.inputAreaContainer]}>
                      <TextInput
                        {...register(CREATE_ASK_FIELDS.businessDetail)}
                        value={textBusinessDetail}
                        onChangeText={onBusinessDetailChange}
                        style={styles.inputArea}
                        maxLength={130}
                        multiline
                      />
                    </View>
                  </View>
                  <View style={styles.locationContainer}>
                    <Location
                      register={register}
                      setValue={setValue}
                      data={askState?.dataDetails?.attributes?.ask_location}
                      errors={errors}
                      control={control}
                      watch={watch}
                      trigger={trigger}
                      onSubmitEditing={onSubmitEditing}
                    />
                  </View>
                  <InputIconValidate
                    label={`${t('by_when')}*`}
                    inputStyleWrapper={styles.inputDynamicContainer}
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
                    errorStyle={GlobalStyles.mt0}
                    onPressIn={onShowDatePicker}
                  />
                  <DateTimePickerModal
                    key={`template-date`}
                    isVisible={visibleDatePicker}
                    mode='datetime'
                    onConfirm={(date: Date) => onChangeDatePicker(date)}
                    onCancel={onShowDatePicker}
                  />
                  <View>
                    {fields.length > 0 &&
                      fields.map((item: any, index) => (
                        <InputIconValidate
                          label={`${t('criteria')} ${index + 1}`}
                          inputStyleWrapper={styles.inputDynamicContainer}
                          labelStyle={styles.labelStyle}
                          selectionColor={BASE_COLORS.blackColor}
                          placeholderTextColor={BASE_COLORS.grayColor}
                          placeholder={`${t('criteria')} ${index + 1}`}
                          errors={errors}
                          control={control}
                          name={CREATE_ASK_FIELDS[`criteria${index}`]}
                          register={register}
                          showIcon={true}
                          isIconImage={true}
                          uri={IMAGES.iconSubtract}
                          imageStyleContainer={styles.iconContainer}
                          styleContainer={GlobalStyles.mb5}
                          imageStyle={styles.iconSubtract}
                          onIconClick={() => onRemoveInput(index)}
                          errorStyle={GlobalStyles.mt0}
                          key={item?.id}
                          defaultValue={item?.text}
                        />
                      ))}
                    <TouchableOpacity onPress={onAddInput}>
                      <Paragraph textForestGreen2Color bold600 title='+ Add New Criteria' style={styles.btnAdd} />
                    </TouchableOpacity>
                  </View>
                  <View style={[GlobalStyles.flexColumn]}>
                    <Paragraph bold600 textSteelBlue2Color h5 title='Additional details' style={GlobalStyles.mr5} />
                    <View style={[GlobalStyles.mb5, styles.inputAreaContainer]}>
                      <TextInput
                        {...register(CREATE_ASK_FIELDS.additiondalDetail)}
                        style={styles.inputArea}
                        onChangeText={onAdditionalDetailChange}
                        value={textAdditionalDetail}
                        maxLength={130}
                        multiline
                      />
                    </View>
                    <Paragraph
                      textGraniteGrayColor
                      textRight
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      title={`${textAdditionalDetail.length}/130`}
                      style={styles.fontSmall}
                    />
                  </View>
                  <View>
                    {filesUpload?.length > 0 &&
                      filesUpload.map((item: any, index) =>
                        item?.id ? (
                          <View
                            style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}
                            key={`file-edit-${index}`}>
                            <FastImage
                              source={IMAGES.iconUploadDone}
                              resizeMode='cover'
                              style={styles.iconUploadDone}
                            />
                            <Paragraph
                              numberOfLines={1}
                              ellipsizeMode='tail'
                              textSteelBlue2Color
                              title={item?.content_type}
                              style={[GlobalStyles.mr5, styles.fileName]}
                            />
                            <TouchableOpacity onPress={() => removeFile(index)}>
                              <FastImage source={IMAGES.iconTrash} resizeMode='cover' style={styles.iconTrash} />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View
                            style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}
                            key={`file-edit-${index}`}>
                            <FastImage
                              source={IMAGES.iconUploadDone}
                              resizeMode='cover'
                              style={styles.iconUploadDone}
                            />
                            <Paragraph
                              numberOfLines={1}
                              ellipsizeMode='tail'
                              textSteelBlue2Color
                              title={item?.name}
                              style={[GlobalStyles.mr5, styles.fileName]}
                            />
                            <TouchableOpacity onPress={() => removeFile(index)}>
                              <FastImage source={IMAGES.iconTrash} resizeMode='cover' style={styles.iconTrash} />
                            </TouchableOpacity>
                          </View>
                        ),
                      )}
                    {filesUpload?.length < 2 && (
                      <TouchableOpacity
                        style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb20]}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onPress={onSelect}>
                        <FastImage source={IMAGES.iconUploadDone} resizeMode='cover' style={styles.iconUploadDone} />
                        <View style={[GlobalStyles.flexColumn]}>
                          <Paragraph
                            h5
                            textSpanishGray2Color
                            title='Upload additional documents'
                            style={GlobalStyles.mb5}
                          />
                          <Paragraph
                            textSpanishGray2Color
                            title='(pdf, jpg, png, xls, xlsx 2 MB max)'
                            style={[GlobalStyles.mb5, styles.fileType]}
                          />
                          <Paragraph
                            textSpanishGray2Color
                            title='Please do not share sensitive files'
                            style={[GlobalStyles.mr5, styles.fontSmall]}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Button
                    onPress={handleSubmit(onSave)}
                    title={t('save')}
                    h5
                    textCenter
                    containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                    textStyle={styles.h3BoldDefault}
                    disabled={!isValid && Object.keys(errors).length > 0}
                  />
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AskEditScreen;
