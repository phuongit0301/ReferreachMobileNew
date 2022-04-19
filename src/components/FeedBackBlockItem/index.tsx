/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

import {Icon, InputValidateControl, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {adjust} from '~Root/utils';

interface Props {
  data: any;
  dataSelected?: string;
  tags?: string[];
  onChangeDropDown?: (itemValue: string, type: number) => void;
  name: string;
  isValid: boolean;
  errors: any;
  control: any;
  register: any;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  styleContainer?: ViewStyle;
  onAddTag?: (type: number) => void;
  onRemove?: (index: number, tagType: number) => void;
  type?: number;
}

const FeedBackBlockItem: React.FC<Props> = ({
  data = [],
  dataSelected = '',
  tags = [],
  onChangeDropDown = () => {},
  name,
  isValid,
  errors,
  control,
  register,
  autoFocus = false,
  multiline = true,
  numberOfLines = 4,
  styleContainer = {},
  onAddTag = () => {},
  onRemove = () => {},
  type = 0,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[GlobalStyles.container, styleContainer]}>
      <View style={[styles.pickerContainer, GlobalStyles.mb15]}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItemStyle}
          dropdownIconColor={BASE_COLORS.eerieBlackColor}
          selectedValue={dataSelected}
          onValueChange={itemValue => onChangeDropDown(itemValue, type)}>
          {data?.length ? (
            data.map((item: any, index: number) => (
              <Picker.Item
                key={`dropdown-${index}`}
                label={`${item?.user_profile?.first_name} ${item?.user_profile?.last_name}`}
                value={item?.id}
              />
            ))
          ) : (
            <Picker.Item key={`dropdown`} label={'Empty'} value={'-'} />
          )}
        </Picker>
      </View>
      <View style={[GlobalStyles.flexColumn, styles.tagContainer]}>
        {tags?.length > 0 && (
          <View style={styles.tagArea}>
            {tags.map((item, index) => (
              <TouchableOpacity
                onPress={() => onRemove(index, type)}
                style={[styles.tag, GlobalStyles.mr10, GlobalStyles.mb5, GlobalStyles.flexRow]}>
                <Paragraph textEerieBlackColor title={item} key={`tags-selected-${index}`} style={GlobalStyles.mr5} />
                <Icon name='times' size={12} color={BASE_COLORS.indianRedColor} />
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.btnAddContainer}>
          <TouchableOpacity style={styles.btnAdd} onPress={() => onAddTag(type)}>
            <Icon name='plus' size={adjust(10)} color={BASE_COLORS.primary} style={GlobalStyles.mr10} />
            <Paragraph p textPrimary title={`Add New Tag`} style={styles.textBtnAdd} />
          </TouchableOpacity>
        </View>
        <Paragraph textSpanishGrayColor italic title='Private to you' style={styles.alignEnd} />
      </View>
      <InputValidateControl
        placeholder={t('your_feedback')}
        placeholderTextColor={BASE_COLORS.lightPinkColor}
        styleContainer={styles.styleContainer}
        inputStyle={styles.inputBorderStyle}
        labelStyle={styles.labelStyle}
        inputErrorStyle={!isValid && styles.inputErrorStyle}
        selectionColor={BASE_COLORS.primary}
        errors={errors}
        control={control}
        name={name}
        register={register}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

export default FeedBackBlockItem;
