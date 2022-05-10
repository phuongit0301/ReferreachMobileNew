import {
  CONTACT_REQUESTED,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
  SET_CONTACT,
  SET_CONTACT_SELECTED,
  SHOW_MODAL_CONTACT,
  HIDE_MODAL_CONTACT,
} from './constants';
import {IContactState, IActionsContact, IActionSetContact, IContactRequest, RowItem} from './types';

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
      return {...state, callback: action?.callback, loading: true};
    case CONTACT_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case CONTACT_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    default:
      return state;
  }
};

const sortAndGroupData = (payload: IActionSetContact['payload']) => {
  return Object.values<RowItem>(
    payload
      .sort((a: IContactRequest, b: IContactRequest) =>
        a.givenName.localeCompare(b.givenName, 'es', {sensitivity: 'base'}),
      )
      .reduce((r: any, e: IContactRequest) => {
        // get first letter of name of current element
        const alphabet = e.givenName[0];
        if (e.emailAddresses.length) {
          if (!r[alphabet]) {
            r[alphabet] = {
              id: e.recordID,
              name: `${e.givenName} ${e.familyName}`,
              phoneNumber: e.phoneNumbers.length ?? e.phoneNumbers[0]?.number,
              email: e.emailAddresses.length ?? e.emailAddresses[0].email,
            };
          } else {
            r[alphabet].push({
              id: e.recordID,
              name: `${e.givenName} ${e.familyName}`,
              phoneNumber: e.phoneNumbers.length ?? e.phoneNumbers[0]?.number,
              email: e.emailAddresses.length ?? e.emailAddresses[0].email,
            });
          }
        }
        return r;
      }, {}),
  );
};

export default contactReducer;
