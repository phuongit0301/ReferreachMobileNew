import {GET_ASK_REQUESTED, GET_ASK_SUCCESS, GET_ASK_FAILURE} from './constants';
import {IActionsCreateAsk, IAskState} from './types';

export const initialState: IAskState = {
  errors: '',
  loading: false,
  success: false,
  data: [
    {
      id: 1,
      greeting: "Hi. I'm looking for",
      role: 'Custom build high end pc',
      description: 'for gaming.',
      date: '2022-05-18 23:28:14',
      location: 'Singapore',
      criteria: ['Must be able to play Crisis 6', 'Budget 3000 SGD', 'Nvidia 3080TI'],
      files: [{fileType: 'pdf'}, {fileType: 'xlx'}],
    },
    {
      id: 2,
      greeting: "Hi. I'm looking for",
      role: 'Front-end Developer',
      description: "to develop my client's website",
      date: '2022-05-19 10:28:14',
      location: 'Singapore',
      criteria: [
        '5 Years Experience',
        'Fast & Efficient',
        'Proficiency with fundamental front-end languages such as HTML, CSS, and JavaScript.',
      ],
      files: [{fileType: 'pdf'}, {fileType: 'xlx'}],
    },
  ],
  dataGreetingSuggest: ['Good day,', 'Hello,', '你好！', 'Hey guys!', 'Hola!', 'Xin chào', 'Salaam', 'Namaste'],
  dataPositionDropDown: ["I'm looking for", 'I urgently need', "I'm hiring for", 'I want'],
  dataPositionSuggest: ['customers', 'consultants'],
  textSearch: '',
  callback: () => {},
};

const askReducer = (state: IAskState = initialState, action: IActionsCreateAsk): IAskState => {
  switch (action.type) {
    case GET_ASK_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_ASK_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case GET_ASK_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    default:
      return state;
  }
};

export default askReducer;
