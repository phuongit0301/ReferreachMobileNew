import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, ViewStyle} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

import {Button, CheckBox, ModalDialogCommon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  isVisible: boolean;
  isDefault: boolean;
  dataAskSelected: any;
  onHideModal: () => void;
  onUpdate: (date: string) => void;
  styleModal?: ViewStyle;
}

const ModalChangeDeadLine: React.FC<Props> = ({
  isVisible = false,
  isDefault = false,
  dataAskSelected,
  onHideModal = () => {},
  onUpdate = () => {},
  styleModal = {},
}) => {
  const {t} = useTranslation();

  const [dayDeadline, setDayDeadline] = useState({
    format1: null,
    format2: '',
  });
  const [isChecked, setCheckbox] = useState(false);
  const [dataDates, setDataDates] = useState({});
  const [dataDateChange, setDateChange] = useState({});

  useEffect(() => {
    if (dataAskSelected) {
      const n = moment().format('YYYY-MM-DD');
      const nd = moment(dataAskSelected?.deadline).format('YYYY-MM-DD');
      const color = !moment(dataAskSelected?.deadline).isAfter(moment())
        ? BASE_COLORS.indianRedColor
        : BASE_COLORS.steelBlueColor;
      const temp: any = {};
      temp[n] = {
        customStyles: {
          container: {
            backgroundColor: BASE_COLORS.steelBlueColor,
          },
          text: styles.calendarText,
        },
      };
      temp[nd] = {
        customStyles: {
          container: {
            backgroundColor: color,
          },
          text: styles.calendarText,
        },
      };
      setDataDates(temp);
    }
  }, [dataAskSelected]);

  const onCheckboxChange = () => {
    setCheckbox(!isChecked);
  };

  const onDayPress = (day: any) => {
    const temp: any = {};
    temp[day?.dateString] = {
      customStyles: {
        container: {
          backgroundColor: BASE_COLORS.steelBlueColor,
        },
        text: styles.calendarText,
      },
    };
    setDateChange(temp);
    setDayDeadline({
      format1: day?.dateString,
      format2: moment(day.timestamp).format('YYYY-MM-DD HH:MM:SS'),
    });
  };

  const onPress = () => {
    onUpdate(dayDeadline?.format2);
  };

  return (
    <ModalDialogCommon
      isVisible={isVisible}
      onHideModal={onHideModal}
      isDefault={isDefault}
      styleModal={{...styles.styleModal, ...styleModal}}
      styleModalContainer={styles.styleModalContainer}>
      <Paragraph textCenter textSteelBlueColor bold title={t('change_date_deadline')} style={styles.modalHeader} />
      <View style={styles.calendarContainer}>
        {isChecked && <View style={styles.calendarBgDisabled} />}
        <Calendar markingType={'custom'} onDayPress={onDayPress} markedDates={{...dataDates, ...dataDateChange}} />
      </View>
      <View style={GlobalStyles.mt15}>
        <Paragraph
          p
          bold
          textSteelBlueColor
          title={`${t('current_deadline', {date: moment(dataAskSelected?.deadline).format('Do MMM YYYY')})}`}
          style={styles.title}
        />
        {dayDeadline?.format1 && (
          <Paragraph
            p
            bold
            textSteelBlueColor
            title={`${t('new_deadline', {date: moment(dayDeadline?.format1).format('Do MMM YYYY')})}`}
            style={styles.title}
          />
        )}
      </View>
      <CheckBox
        text={t('no_preferred_deadline')}
        isChecked={isChecked}
        onChange={onCheckboxChange}
        style={styles.checkBoxContainer}
        iconStyle={styles.iconStyle}
        textStyle={styles.textStyle}
      />
      <View style={styles.mainButtonContainer}>
        <Button
          bordered
          title={t('change_deadline')}
          onPress={onPress}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.mainButtonTextStyle}
          textWhite
        />
      </View>
    </ModalDialogCommon>
  );
};

export default ModalChangeDeadLine;
