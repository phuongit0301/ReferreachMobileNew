import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';

import {BottomTabParams, TabNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Button, HeaderSmallTransparent, InputIconValidate, Paragraph} from '~Root/components';
import {BASE_COLORS, CREATE_ASK_FIELDS, CREATE_ASK_KEYS, GlobalStyles, IMAGES} from '~Root/config';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {dateFormat3, dateWithMonthsDelay} from '~Root/utils';
import {IUserState} from '~Root/services/user/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParams, AppRoute.YOUR_ASK>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const schema = yup.object().shape({
  [CREATE_ASK_FIELDS.location]: yup.string().required('Location is required'),
  [CREATE_ASK_FIELDS.deadline]: yup.string().required('Deadline is required'),
});

const AskEditScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
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

  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const askState = useSelector((state: IGlobalState) => state.askState);
  const [textSearch, setTextSearch] = useState('');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [inputDynamic, setInputDynamic] = useState(['1']);
  const [textDescription, setTextDescription] = useState('');
  const [filesUpload, setFilesUpload] = useState<DocumentPickerResponse[]>([]);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onInputChange = (text: string) => {
    setTextSearch(text);
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

  const onSubmitEditing = (key: any) => {
    setFocus(key);
  };

  const onDescriptionChange = (text: string) => {
    setTextDescription(text);
  };

  const onSelect = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      setFilesUpload(res);
      // Setting the state to show single file attributes
    } catch (err) {
      // Handling any exception (If any)
      if (!DocumentPicker.isCancel(err)) {
        console.log('Unknown Error: ' + JSON.stringify(err));
      }
    }
  }, []);

  const removeFile = (index: number) => {
    setFilesUpload(filesUpload.filter((_, i) => index !== i));
  };

  return (
    <View style={[GlobalStyles.container, GlobalStyles.bgWhite]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent
          title={t('your_ask')}
          isBackButton={true}
          isRightButton={true}
          onRightPress={onToggleDrawer}
        />
        <View style={[GlobalStyles.container]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={GlobalStyles.container}
            keyboardVerticalOffset={80}>
            <View style={[GlobalStyles.mb20, GlobalStyles.container]}>
              <ScrollView>
                <Paragraph h5 textGray2Color textCenter title='Time left to edit this Ask: 24 mins' />
                <View style={[GlobalStyles.container, GlobalStyles.mh15, GlobalStyles.mt20]}>
                  <InputIconValidate
                    label={`${t('greeting')}*`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('greeting')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.greeting}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    onSubmitEditing={() => onSubmitEditing(CREATE_ASK_KEYS.location)}
                  />
                  <InputIconValidate
                    label={`${t('your_role')}*`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('your_role')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.yourRole}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    onSubmitEditing={() => onSubmitEditing(CREATE_ASK_KEYS.location)}
                  />
                  <SelectDropdown
                    data={askState?.dataPositionDropDown}
                    defaultValueByIndex={0}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
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
                  <InputIconValidate
                    label={`${t('description')}*`}
                    inputStyleWrapper={styles.inputWrapperStyle}
                    inputStyle={styles.inputIconStyle}
                    labelStyle={styles.labelStyle}
                    selectionColor={BASE_COLORS.blackColor}
                    placeholderTextColor={BASE_COLORS.grayColor}
                    placeholder={t('description')}
                    errors={errors}
                    control={control}
                    name={CREATE_ASK_FIELDS.description}
                    register={register}
                    styleContainer={GlobalStyles.mb5}
                    onSubmitEditing={() => onSubmitEditing(CREATE_ASK_KEYS.location)}
                  />
                  <View style={[GlobalStyles.flexColumn]}>
                    <Paragraph textSteelBlue2Color title='Details' style={GlobalStyles.mr5} />
                    <View style={[GlobalStyles.mb5, styles.inputAreaContainer]}>
                      <TextInput
                        value={textDescription}
                        style={styles.inputArea}
                        onChangeText={onDescriptionChange}
                        maxLength={130}
                        multiline
                      />
                    </View>
                    <Paragraph
                      textGraniteGrayColor
                      textRight
                      title={`${textDescription.length}/130`}
                      style={styles.fontSmall}
                    />
                  </View>
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
                  <View>
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
                  <View style={[GlobalStyles.flexColumn]}>
                    <Paragraph textSteelBlue2Color title='Additional details' style={GlobalStyles.mr5} />
                    <View style={[GlobalStyles.mb5, styles.inputAreaContainer]}>
                      <TextInput
                        value={textDescription}
                        style={styles.inputArea}
                        onChangeText={onDescriptionChange}
                        maxLength={130}
                        multiline
                      />
                    </View>
                    <Paragraph
                      textGraniteGrayColor
                      textRight
                      title={`${textDescription.length}/130`}
                      style={styles.fontSmall}
                    />
                  </View>
                  <View>
                    {filesUpload?.length > 0 &&
                      filesUpload.map((item, index) => (
                        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
                          <FastImage source={IMAGES.iconUploadDone} resizeMode='cover' style={styles.iconUploadDone} />
                          <Paragraph textSteelBlue2Color title={item?.name} style={GlobalStyles.mr5} />
                          <TouchableOpacity onPress={() => removeFile(index)}>
                            <FastImage source={IMAGES.iconTrash} resizeMode='cover' style={styles.iconTrash} />
                          </TouchableOpacity>
                        </View>
                      ))}
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
                          title='(pdf, jpg, gif, png, 2 MB max)'
                          style={[GlobalStyles.mb5, styles.fileType]}
                        />
                        <Paragraph
                          textSpanishGray2Color
                          title='Please do not share sensitive files'
                          style={[GlobalStyles.mr5, styles.fontSmall]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Button
                    title={t('save')}
                    h5
                    textCenter
                    containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
                    textStyle={styles.h3BoldDefault}
                    disabled={
                      userState?.userInfo?.self_industries.length === 0 ||
                      userState?.userInfo?.partner_industries.length === 0 ||
                      userState?.userInfo?.sell_industries.length === 0
                    }
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
