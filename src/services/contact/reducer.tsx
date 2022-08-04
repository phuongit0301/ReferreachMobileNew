import {
  CONTACT_REQUESTED,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
  SET_CONTACT,
  SET_CONTACT_SELECTED,
  SHOW_MODAL_CONTACT,
  HIDE_MODAL_CONTACT,
  INVITE_USER_CONTACT_FAILURE,
  INVITE_USER_CONTACT_REQUESTED,
  INVITE_USER_CONTACT_SUCCESS,
} from './constants';
import {IContactState, IActionsContact, IActionSetContact, IContactRequest} from './types';

export const initialState: IContactState = {
  errors: [],
  loading: false,
  contacts: [],
  contactSelected: null,
  showModal: false,
  callback: () => {},
};

const contactReducer = (state: IContactState = initialState, action: IActionsContact): IContactState => {
  switch (action.type) {
    case SET_CONTACT: {
      const contactPrepare = sortAndGroupData(action?.payload);
      return {...state, contacts: contactPrepare};
    }
    case SET_CONTACT_SELECTED:
      action?.callback();
      return {...state, contactSelected: action?.payload, callback: action?.callback};
    case SHOW_MODAL_CONTACT:
      return {...state, showModal: true};
    case HIDE_MODAL_CONTACT:
      return {...state, showModal: false};
    case CONTACT_REQUESTED:
    case INVITE_USER_CONTACT_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case CONTACT_SUCCESS:
    case INVITE_USER_CONTACT_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case CONTACT_FAILURE:
    case INVITE_USER_CONTACT_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    default:
      return state;
  }
};

const sortAndGroupData = (payload: IActionSetContact['payload']) => {
  const datas = payload.sort((a: IContactRequest, b: IContactRequest) =>
    a.givenName.localeCompare(b.givenName, 'es', {sensitivity: 'base'}),
  );
  const contacts: any = [];

  datas.forEach(item => {
    if (item.emailAddresses.length) {
      contacts.push({
        id: item.recordID,
        name: `${item.givenName} ${item.familyName}`,
        phone: item.phoneNumbers.length ?? item.phoneNumbers[0]?.number,
        email: item.emailAddresses.length ? item.emailAddresses[0].email : '',
      });
    }
  });
  return contacts;
};

export default contactReducer;
