import {SET_CONTACT, SET_CONTACT_SELECTED, SHOW_MODAL_CONTACT, HIDE_MODAL_CONTACT} from './constants';
import {IActionSetContact, RowItem} from './types';

export const setContact = (payload: IActionSetContact['payload'], callback: () => void) => {
  return {
    type: SET_CONTACT,
    payload,
    callback,
  };
};

export const setContactSelected = (payload: RowItem, callback: () => void) => {
  return {
    type: SET_CONTACT_SELECTED,
    payload,
    callback,
  };
};

export const showModalContact = () => {
  return {
    type: SHOW_MODAL_CONTACT,
  };
};

export const hideModalContact = () => {
  return {
    type: HIDE_MODAL_CONTACT,
  };
};
