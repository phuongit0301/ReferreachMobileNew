import React, {useState, useRef, useEffect} from 'react';
import {Platform, View, ViewStyle} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {verifyAccountRequest} from '~Root/services/register/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {onClearProgress} from '~Root/services/auth/actions';
import {InputValidate} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {IActionVerifyAccountSuccess} from '~Root/services/register/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import Toast from 'react-native-toast-message';

interface Props {
  styleContainer?: ViewStyle;
  navigation: NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VERIFY_EMAIL>['navigation'];
}

const schema = yup.object().shape({
  firstInput: yup.number().required(),
  secondInput: yup.number().required(),
  thirdInput: yup.number().required(),
  fourthInput: yup.number().required(),
  fifthInput: yup.number().required(),
  sixthInput: yup.number().required(),
});

const Otp: React.FC<Props> = ({styleContainer = {}, navigation}) => {
  const {register} = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const refCallback = (textInputRef: any) => (node: any) => {
    textInputRef.current = node;
  };

  useEffect(() => {
    if (otpArray.join('').length === 6) {
      dispatch(showLoading());
      dispatch(
        verifyAccountRequest(
          {confirmation_token: otpArray.join('')},
          (response: IActionVerifyAccountSuccess['payload']) => {
            dispatch(hideLoading());
            if (!response.success) {
              Toast.show({
                position: 'bottom',
                type: 'error',
                text1: 'Verification Code is invalid',
                visibilityTime: 4000,
                autoHide: true,
              });
            }
            if (response.verified) {
              dispatch(onClearProgress({progress: 0}));
              navigation.navigate(AppRoute.INVITE_CONTACT);
            }
          },
        ),
      );
    }
  }, [otpArray]);

  const onChange = (index: number) => {
    return (value: any) => {
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index + 1 === 1) {
          (secondTextInputRef.current as any).focus();
        } else if (index + 1 === 2) {
          (thirdTextInputRef.current as any).focus();
        } else if (index + 1 === 3) {
          (fourthTextInputRef.current as any).focus();
        } else if (index + 1 === 4) {
          (fifthTextInputRef.current as any).focus();
        } else if (index + 1 === 5) {
          (sixthTextInputRef.current as any).focus();
        }
      }
    };
  };

  const onKeyPress = (index: number) => {
    return ({nativeEvent}: any) => {
      if (nativeEvent.key === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          (secondTextInputRef.current as any).focus();
        } else if (index === 2) {
          (thirdTextInputRef.current as any).focus();
        } else if (index === 3) {
          (fourthTextInputRef.current as any).focus();
        } else if (index === 4) {
          (fifthTextInputRef.current as any).focus();
        } else if (index === 5) {
          (sixthTextInputRef.current as any).focus();
        }

        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const mapIndexToString = (index: number) => {
    switch (index) {
      case 1:
        return 'first';
      case 2:
        return 'second';
      case 3:
        return 'third';
      case 4:
        return 'fourth';
      case 5:
        return 'fifth';
      case 6:
        return 'sixth';
      default:
        return 'first';
    }
  };

  return (
    <View style={[GlobalStyles.flexColumn, styles.container, styleContainer]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
        {[
          firstTextInputRef,
          secondTextInputRef,
          thirdTextInputRef,
          fourthTextInputRef,
          fifthTextInputRef,
          sixthTextInputRef,
        ].map((textInputRef, index) => (
          <InputValidate
            inputStyle={styles.inputStyle}
            register={register}
            name={`${mapIndexToString(index + 1)}Input`}
            onKeyPress={onKeyPress(index)}
            onChange={onChange(index)}
            refCallback={refCallback(textInputRef)}
            selectionColor={BASE_COLORS.blackColor}
            maxLength={1}
            keyboardType={'numeric'}
            autoFocus={index === 0 ? true : undefined}
            key={`otp-${index}`}
          />
        ))}
      </View>
      {/* <Paragraph h5 textIndianRedColor title={t('invalid_code')} /> */}
    </View>
  );
};

export default Otp;
