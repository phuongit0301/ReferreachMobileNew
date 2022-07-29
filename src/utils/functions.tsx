import {PixelRatio, Platform} from 'react-native';
import moment, {now} from 'moment';
import * as yup from 'yup';

import {adjust} from '.';

export const dateWithMonthsDelay = (dateNow: Date, months: number) => {
  const date = dateNow || new Date();
  date.setMonth(date.getMonth() + months);

  return date;
};

const pad2 = (n: number) => {
  return (n < 10 ? '0' : '') + `${n}`;
};

enum DateFormat {
  format1 = 'dd-mm-YYYY',
  format2 = 'YYYY-mm-dd',
}

export const convertFromStringToDate = (responseDate: string) => {
  const dateComponents = responseDate.split('/');
  return new Date(`${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`);
};

export const dateFormat = (date: Date, separator?: string, format?: string): string => {
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const year = date.getFullYear();
  separator = separator ?? '/';
  format = format ?? DateFormat.format1;

  switch (format) {
    case DateFormat.format1:
      return `${day}${separator}${month}${separator}${year}`;
    case DateFormat.format2:
    default:
      return `${year}${separator}${month}${separator}${day}`;
  }
};

export const dateFormat2 = (date: string): string => {
  return moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY');
};

export const dateFormat3 = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const dateToHours = (date: Date | string) => {
  if (!date || !isDate(date)) {
    return '';
  }
  if (moment(date).format('MM-DD-YYYY HH:mm:ss') >= moment().format('MM-DD-YYYY HH:mm:ss')) {
    return `${moment(date).diff(moment(), 'hours')}`;
  }
  return `${moment(moment()).diff(date, 'hours')}`;
};

export const dateToDays = (date: Date | string) => {
  if (!date || !isDate(date)) {
    return '';
  }
  if (moment(date).format('MM-DD-YYYY HH:mm:ss') >= moment().format('MM-DD-YYYY HH:mm:ss')) {
    return `${moment(date).diff(moment(), 'days')}`;
  }
  return `${moment(moment()).diff(date, 'days')}`;
};

const isDate = (date: any) => {
  return !!Date.parse(date);
};

export const transformCapitalize = (text: string) => {
  if (!text) {
    return false;
  }
  const firstCharacter = text.substring(0, 1);
  const restString = text.substring(1);

  return firstCharacter.toUpperCase() + restString;
};

export const headerByRatio = () => {
  let top = '2%';
  let marginTop = '0%';
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';
  switch (true) {
    case value >= 3 && value < 3.5 && !isIos:
      top = '0%';
      marginTop = '0%';
      break;
    case value >= 3.5 && !isIos:
      top = '2%';
      marginTop = '2%';
      break;
  }
  return {top, marginTop};
};

export const buttonPositionByRatio = () => {
  let bottom = '15%';
  let bottomHomeShare = '8%';
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';

  switch (true) {
    case value >= 3 && value < 3.5 && !isIos:
      bottom = '2%';
      bottomHomeShare = '5%';
      break;
    case value >= 2 && value < 3:
      bottom = '20%';
      break;
    case value >= 3.5 && !isIos:
      bottom = '20%';
      break;
  }
  return {bottom, bottomHomeShare};
};

export const commonByRatio = () => {
  let paddingVertical = 20;
  let marginTop = 20;
  let widthOnboard = '70%';
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';

  switch (true) {
    case value >= 3 && !isIos:
      paddingVertical = 10;
      marginTop = 10;
      widthOnboard = '50%';
      break;
  }
  return {paddingVertical, marginTop, widthOnboard};
};

export const isRatioNormal = () => {
  let isNormal = true;
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';

  switch (true) {
    case value >= 3 && !isIos:
      isNormal = false;
      break;
  }
  return isNormal;
};

export const lineHeightByRatio = (lineHeight = 0) => {
  return PixelRatio.get() < 2 ? PixelRatio.roundToNearestPixel(lineHeight * 2) : lineHeight;
};

export const paddingByRatio = (padding = 0) => {
  return PixelRatio.get() < 2 ? PixelRatio.roundToNearestPixel(padding) * 2 : padding;
};

export const heightByRatio = (height = 0) => {
  return PixelRatio.get() < 2 ? PixelRatio.roundToNearestPixel(height) * 2 : height;
};

const parseType = (type: string) => {
  switch (type) {
    case 'number':
      return 'number';
    case 'text':
    default:
      return 'string';
  }
};

export const getValidationSchema = (fields: any) => {
  const schema = fields.structure.reduce((schema: any = {}, field: any) => {
    const {id, type, options} = field;

    if (!yup[parseType(type)]) {
      return schema;
    }

    let validator = yup[parseType(type)]();
    if (options.required) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      validator = validator['required']();
    }
    return schema.concat(yup.object().shape({[id]: validator}));
  }, yup.object().shape({}));
  return schema;
};

export const headerTop = () => {
  if (PixelRatio.get() < 2) {
    return Platform.OS === 'ios' ? '50%' : '30%';
  } else {
    return Platform.OS === 'ios' ? adjust(45) : adjust(30);
  }
};

export const calculateExpiredTime = (createdAt: Date = new Date()) => {
  if (!createdAt) return 0;
  const createdAtPlus = moment(createdAt).add(65, 'minutes');
  const experiedTime = moment();
  return moment
    .duration(moment(createdAtPlus, 'DD/MM/YYYY HH:mm').diff(moment(experiedTime, 'DD/MM/YYYY HH:mm')))
    .asMinutes();
};

export const uid = () => {
  return ('000000000' + Math.random().toString(36).substr(2, 9)).slice(-9);
};
