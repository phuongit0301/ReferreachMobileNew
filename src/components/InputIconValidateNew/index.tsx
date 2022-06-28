import React from 'react';
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  TextStyle,
  Pressable,
  Image,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import {Controller} from 'react-hook-form';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {Paragraph} from '~Root/components';

interface Props {
  label?: string;
  errors?: any;
  labelStyle?: any;
  showIcon?: boolean;
  styleContainer?: ViewStyle & TextStyle;
  inputStyleWrapper?: ViewStyle;
  inputStyle?: ViewStyle & TextStyle;
  inputErrorStyle?: any;
  defaultValue?: string;
  control?: any;
  name?: string;
  rules?: any;
  secureTextEntry?: boolean;
  editable?: boolean;
  ref?: any;
  register?: any;
  required?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  placeholderInput?: string;
  placeholderTextInputStyle?: TextStyle;
  visiblePlaceholderInput?: boolean;
  selectionColor?: string;
  children?: React.ReactNode;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  errorStyle?: TextStyle;
  isEdit?: boolean;
  imageStyleContainer?: ViewStyle;
  imageStyle?: ImageStyle & TextStyle;
  uri?: any;
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
  onEndEditing?: () => void;
  onFocus?: () => void;
  onIconClick?: () => void;
}

const InputIconValidateNew: React.FC<Props> = ({
  label,
  labelStyle,
  showIcon = false,
  styleContainer,
  inputStyleWrapper = {},
  inputStyle = {},
  inputErrorStyle = {},
  defaultValue = '',
  errors = null,
  control = null,
  name = 'text',
  rules = {required: false},
  secureTextEntry = false,
  editable = true,
  register,
  required = false,
  autoFocus = false,
  multiline = false,
  numberOfLines = 8,
  placeholder = '',
  placeholderTextColor,
  placeholderInput = '',
  placeholderTextInputStyle,
  visiblePlaceholderInput = false,
  selectionColor,
  children,
  autoCorrect = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  errorStyle = {},
  isEdit = false,
  imageStyleContainer = {},
  imageStyle = {},
  uri,
  onPressIn = () => {},
  onSubmitEditing = () => {},
  onEndEditing = () => {},
  onFocus = () => {},
  onIconClick = () => {},
}) => {
  const isError = errors?.[name] && Boolean(errors[name]);
  const isText = Boolean(label);
  const styleErrors = isError && {...styles.inputErrorStyle, ...inputErrorStyle};

  return (
    <View style={[styles.container, styleContainer]}>
      {isText && <Paragraph h5 style={[styles.labelStyle, labelStyle]} title={label} />}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value, ref}}) => {
          return (
            <View style={[styles.textInputWrapper, inputStyleWrapper]}>
              {visiblePlaceholderInput && (
                <View style={GlobalStyles.alignSelfStart}>
                  <Paragraph style={[styles.labelStyle, placeholderTextInputStyle]} title={placeholderInput} />
                </View>
              )}
              <Pressable onPress={onPressIn}>
                <TextInput
                  {...register(name, {required})}
                  inputRef={ref}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  selectionColor={selectionColor ?? BASE_COLORS.whiteColor}
                  secureTextEntry={secureTextEntry}
                  style={[styles.inputStyle, inputStyle, styleErrors]}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  editable={editable}
                  autoCorrect={autoCorrect}
                  autoCapitalize={autoCapitalize}
                  keyboardType={keyboardType}
                  onPressIn={onPressIn}
                  autoFocus={autoFocus}
                  onSubmitEditing={onSubmitEditing}
                  onFocus={onFocus}
                  onEndEditing={onEndEditing}
                />
              </Pressable>
              {!isEdit && value !== '' && (
                <TouchableOpacity onPress={onIconClick} style={imageStyleContainer}>
                  <Image source={uri} resizeMode='contain' style={imageStyle} />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {children}
      {isError && <Text style={[styles.textError, errorStyle]}>{errors[name]?.message}</Text>}
    </View>
  );
};

export default InputIconValidateNew;
