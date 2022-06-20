import {IMAGES} from '~Root/config';
import {LIST_MATCHES_REQUESTED, LIST_MATCHES_SUCCESS, LIST_MATCHES_FAILURE} from './constants';
import {IChatState, STATUS_ENUM} from './types';

export const initialState: IChatState = {
  errors: [],
  loading: false,
  success: false,
  listMatches: [
    {id: '1', name: 'Kate Brady', image: IMAGES.avatar3},
    {id: '2', name: 'Jack Carlyle', image: IMAGES.avatar4},
    {id: '3', name: 'Sanjeev Kapur', image: IMAGES.avatar5},
    {id: '4', name: 'Alex Do', image: IMAGES.avatar6},
  ],
  peopleToAsks: [
    {
      id: '1',
      name: 'IAN CRAWFORD',
      image:
        'https://s3-alpha-sig.figma.com/img/279a/2339/fc84042a5503f9ef7127b6a69ec787cd?Expires=1647820800&Signature=Yc6kMgqjh796TZZ0tDSbF111ZJppacxnT6Pe~ZpOESffKuxJ8sQ11CQEBZLSb9SxQKk6p9kkPEiJdXcPcJpH46w573L7aAgf0eNgBpwZiy46snBc1TsYI9f2z529nHoOUaqk9mnbXsNUjaGJmlcJRsY7RDPEJcisMFDX9xKWze7MXPQVG0~d~PNzlzye4hrtonyHgBHQoQQzSK5r73E-og4ZfhJjaXeC2lmcmm49fFfXuWFouRSy0JAu9uMe7G44IiR1MCm5C4O3r8DXrIjx1i3A8R-z8hP-X2nYdauH1XUciP91~xbBPMiXebrKCE0zm25Ehc769l2qmQYbr5cCuw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      title: 'LOOKING FOR AN ADVERTISISE',
      description: 'Anthony said that he will follow. Could you share more info',
      status: STATUS_ENUM.NEW_INTRO,
      count: 2,
      hour: '10:43AM',
    },
    {
      id: '2',
      name: 'Liam mater',
      image:
        'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1647820800&Signature=YGXzlmO~nblo9UKlbi1pXtLWOo7Nr2cCer7ZsrgfaFqAC2oMhzVxsjZKpBcgDb2J78PSVhIoA-8SuHz2XoUd1ib8XHpd7RLulVAp6IE0wq~ROR9PFltKclltMBK74~4um06R0ARFQAW3w-ivZ0QSReVWIB~6k85ogHCWw9DthdFFozR-hQ5NpxhzOSSfziRcmWewcFzJWNXZO6xTTGZjDr0xUInvXGVGqe4TwxBU9DME7Z8-rz~ZGZ0QkLBdXqpe4JW1yMV1CqBssYDQDCii4SxBCuy7~TmLJ2FoJ~-PIb8taQtvKVRFGauzmWu4G1G~0CnPRd1oUi6HxAiJzBGBfA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      title: 'LOOKING FOR AN ADVERTISISE',
      description: 'Anthony said that he will follow. Could you share more info',
      status: STATUS_ENUM.INTRO_UPDATE,
      count: 2,
      hour: '10:43AM',
    },
    {
      id: '3',
      name: 'vicky adima',
      image:
        'https://s3-alpha-sig.figma.com/img/0351/6367/f5493a61b92f4dfa0d0048f7909d8e6c?Expires=1647820800&Signature=Fvp5ctKMtwyXploW0NE~8sqjmQuC7zECna2rAAIqKbYOcyssFy4fFgafd1-pOucoW4fNi19vTHEFqe0p~bGgY-daXlMOoTnd1lCxB7Jn9wDfRe4YkqkCB~BYQfi8rjM5pj75isA6Ln9ZoKjVp0ZmzuYihI3IhgegXfU8mZbvXGzVcHs91aYtMYc5K24pq1VZU5oJUxUw-btzkCCwRRpIevR9Fw2UWcvv3ruH72ugOx3FuH6DwtHpOujwHQwiznxBbFpYyEnw-9tBO5NaCCPidiqV0pWe6JEIiYLRGnJLm9M60viE761SDjXEGRMOs4c~sbkwDfwaW8GbFMZRpgKR4Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      title: 'LOOKING FOR AN ADVERTISISE',
      description: 'Anthony said that he will follow. Could you share more info',
      status: STATUS_ENUM.ASK_ENDED,
      count: 2,
      hour: '10:43AM',
    },
    {
      id: '4',
      name: 'vicky adima 1',
      image:
        'https://s3-alpha-sig.figma.com/img/a461/ee05/62e58ca3274d965f80f8160f57846f8d?Expires=1647820800&Signature=J-5MsRYiih4Aslqd-ft~T2m4f2fR7xBWO0BmCVtn8qkkj-95yJX8Meg7w8FRVClvbja8I4iqksLHB1MlfaGglXk2jLysuvNvHMCS3nAY9PQJg1KxK~h0Y4Xn3LpsBTB9UX2FJbgzqGp8IViciDUl5U~YK6EFBNWOi3r1dX~qyCFHB5YMmL06a1uKmya-qVqL~KZs8sCc5pDUz9h6rM-M5sMCZzebuB2UbGE~NiWNucQBagOLl6xLDhWd3of5ozFDquu901nW2IoXPEzq~8J5Sum8219v8RYCJo46DMYe~RkZhPKkZMbG2jOwjRMJbUNl7Jp9ToKG-xdDfniYtC1I6A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      title: 'LOOKING FOR AN ADVERTISISE',
      description: 'Anthony said that he will follow. Could you share more info',
      status: STATUS_ENUM.FEEDBACK,
      count: 2,
      hour: '10:43AM',
    },
    {
      id: '5',
      name: 'vicky adima 2',
      image:
        'https://s3-alpha-sig.figma.com/img/5d7b/069e/24433b92d5d24425286fa70a1f384315?Expires=1647820800&Signature=filO3yI7NguGoYR4zFwRCUcLiSzj3FHR1oEyJB7CtJunWTNyBvsFWnTfE4ZSFT8-0vDKx7gMM0OopFdh8Us07NmT36Cd47mhW5ALACQ3bxa0AuhW~MdxSoJ0bS9THV6mydbC72ZaAjvwwhVGjid0pRUlAds-Zvns4E0DQZ2nIdFamfc5bvuehDQU0KTiG28HKurU2XOaeE6pue60SFFBzpgCH7xPL1w-mND2AYz5XVwVl1tXolKfPNBXoXmaUYnDT4dW7QYJB577~eumW6l1Q3xoQ6FpOWx5W-4tjeG3dKmvYKOHu0NeHIsrMycrJfFAUrR-WO0MwjhvB1EzcIjhZg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      title: 'LOOKING FOR AN ADVERTISISE',
      description: 'Anthony said that he will follow. Could you share more info',
      status: STATUS_ENUM.INTRO_UPDATE,
      count: 2,
      hour: '10:43AM',
    },
  ],
  callback: () => {},
};

const userReducer = (state: IChatState = initialState, action: any): IChatState => {
  switch (action.type) {
    case LIST_MATCHES_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case LIST_MATCHES_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case LIST_MATCHES_FAILURE:
      return {...state, loading: false, errors: [...action.payload.error]};
    default:
      return state;
  }
};

export default userReducer;
