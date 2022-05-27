import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, ViewStyle} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import {Button, InputValidateControl, ModalDialogCommon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles, REPORT_FIELDS} from '~Root/config';
import styles from './styles';

interface Props {
  isVisible: boolean;
  isDefault: boolean;
  onHideModal: () => void;
  styleModal?: ViewStyle;
}

const schema = yup.object().shape({
  report: yup.string().required(),
});

const ModalReportAsk: React.FC<Props> = ({
  isVisible = false,
  isDefault = false,
  onHideModal = () => {},
  styleModal = {},
}) => {
  const {t} = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSend = (credentials: any) => {
    onHideModal();
  };

  return (
    <ModalDialogCommon
      isVisible={isVisible}
      onHideModal={onHideModal}
      isDefault={isDefault}
      styleModal={{...styles.styleModal, ...styleModal}}
      styleModalContainer={styles.styleModalContainer}>
      <Paragraph h5 textCenter textBlack bold title={t('report_ask')} style={GlobalStyles.pv20} />
      <InputValidateControl
        inputStyle={styles.textAreaStyle}
        labelStyle={styles.labelStyle}
        placeholder={t('briefly')}
        selectionColor={BASE_COLORS.blackColor}
        placeholderTextColor={BASE_COLORS.spanishGrayColor}
        control={control}
        name={REPORT_FIELDS.report}
        register={register}
        multiline={true}
      />
      <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
        <Button
          isIconLeft={true}
          title={t('cancel')}
          h3
          textCenter
          onPress={onHideModal}
          containerStyle={styles.cancelButtonArea}
          textStyle={styles.textStyle}
        />
        <Button
          title={t('send_report')}
          onPress={handleSubmit(onSend)}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.mainButtonTextStyle}
          disabled={!isValid}
          textWhite
        />
      </View>
    </ModalDialogCommon>
  );
};

export default ModalReportAsk;
