import React from 'react';
import {View, TextInput, ViewStyle, TextStyle, Pressable} from 'react-native';
import {Controller} from 'react-hook-form';

import {Paragraph} from '~Root/components';
import {BASE_COLORS} from '~Root/config';
import styles from './styles';

interface Props {
  label?: string;
  errors?: any;
  labelStyle?: any;
  styleContainer?: ViewStyle & TextStyle;
  styleArea?: ViewStyle;
  inputStyle?: any;
  inputErrorStyle?: any;
  textErrorStyle?: TextStyle;
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
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
}

const InputValidateControl: React.FC<Props> = ({
  label,
  labelStyle,
  styleContainer,
  styleArea = {},
  inputStyle = {},
  inputErrorStyle = {},
  textErrorStyle = {},
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
  selectionColor,
  children,
  autoCorrect = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  onPressIn = () => {},
  onSubmitEditing = () => {},
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
            <Pressable onPress={onPressIn} style={styleArea}>
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
              />
            </Pressable>
          );
        }}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      {children}
      {isError && <Paragraph p style={[styles.textError, textErrorStyle]} title={errors[name]?.message} />}
    </View>
  );
};

export default InputValidateControl;
