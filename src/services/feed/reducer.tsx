import {
  GET_FEED_ITEMS_LIST_REQUESTED,
  GET_FEED_ITEMS_LIST_SUCCESS,
  GET_FEED_ITEMS_LIST_FAILURE,
  GET_FEED_ITEM_PAGINATION_REQUESTED,
  GET_FEED_ITEM_PAGINATION_SUCCESS,
  GET_FEED_ITEM_PAGINATION_FAILURE,
  SET_FEED_ITEM_READ_REQUESTED,
  SET_FEED_ITEM_READ_FAILURE,
  SET_FEED_VISIBLE_MENU,
  GET_PUBLIC_PROFILE_REQUESTED,
  GET_PUBLIC_PROFILE_FAILURE,
  GET_PUBLIC_PROFILE_SUCCESS,
} from './constants';
import {IFeedItemsState, IActionsUser} from './types';

export const initialState: IFeedItemsState = {
  message: '',
  loading: false,
  dataFeed: {
    data: [],
    included: [],
    meta: null,
  },
  dataNetwork: {
    data: [],
    included: [],
  },
  page: 1,
  dataSelected: null,
  dataUser: {
    data: null,
    included: [],
    meta: null,
  },
  dataProfile: {
    data: {
      id: '1',
      type: 'users',
      attributes: {
        title: 'CEO',
        first_name: 'Adam',
        last_name: 'Caol',
        full_name: 'Adam Caol',
        pitch: 'Director of SO corp',
        avatar_metadata: {
          avatar_url:
            'https://s3-alpha-sig.figma.com/img/59d7/8c1e/4e48c32cd8b988b068037e0b82557d7f?Expires=1657497600&Signature=PqTq38H8Zh5BbllMM57XBljlnuNWtHLUdf39bDe1HYxS~g5U3fSGFQiAX0nPhg8Z9AfdRPS8HgmqIj08h2vA7TVOLP24VLOIcG1maQIgr2uW7st91ohp9TD~YBP3DSfMLOyuI7MrBSLSNZku-doNHQzP6fyTLUY~M2DXwZGHR2uZJseXS5vOwCDOYwtLfjhoIFDhJVNccbWo6mAAmVy4P9AS2yxtpqR7sbS~3IW3nInJgIk13MuhNmpB1-DMfeqbIwBCNlZcpM4PuSdpyFAwPm-rH9F~fUycTVFmMw8~gHWIrvbNru~E8P8v7n86A5Pu7d2rCkAEgCuHca71~MOzeg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          avatar_lat: '12',
          avatar_lng: '12',
        },
      },
      relationships: {
        self_industries: {
          data: [
            {
              id: '1',
              type: 'acts_as_taggable_on_tags',
            },
            {
              id: '2',
              type: 'acts_as_taggable_on_tags',
            },
          ],
        },
        partner_industries: {
          data: [
            {
              id: '3',
              type: 'acts_as_taggable_on_tags',
            },
            {
              id: '4',
              type: 'acts_as_taggable_on_tags',
            },
          ],
        },
        sell_industries: {
          data: [
            {
              id: '5',
              type: 'acts_as_taggable_on_tags',
            },
            {
              id: '6',
              type: 'acts_as_taggable_on_tags',
            },
          ],
        },
      },
    },
    included: [
      {
        id: '1',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'Computer',
        },
      },
      {
        id: '2',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'Internet',
        },
      },
      {
        id: '3',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'ABC',
        },
      },
      {
        id: '4',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'XYZ',
        },
      },
      {
        id: '5',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'GGH',
        },
      },
      {
        id: '6',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'TTA',
        },
      },
    ],
    meta: null,
  },
  dataProfileRefer: {
    data: {
      id: '1',
      type: 'users',
      attributes: {
        title: 'CEO',
        first_name: 'Adam',
        last_name: 'Caol',
        full_name: 'Adam Caol',
        pitch: 'Director of SO corp',
        avatar_metadata: {
          avatar_url:
            'https://s3-alpha-sig.figma.com/img/cbb4/3ee6/9695bea370a2dee12e503d07053faeca?Expires=1657497600&Signature=eN1vHVAad-qs58~SzX7R~AVWmZGaFisQGf9XGuPf3M9QxH4CHCmCPqdiQ3TGXWspwOCNY~z9ccu16XrPJPAbk3AAUjW3lsVdsPMaJDEerX6haOcKZ6umCNQZIj7AmVZGrTsh-c~NUAKlIFDh5QNcLkUY~8tRjbxWOY7y1JgFVBZPB8Tv2Nc-f8jmDPOtP9~oNMoYICyLoFS7X0cIKZDEUsgKn9PHRH7JA6jwUWoGBvui5Y0ZOmbrgPo~TB1cfy3DrHj80KE76Iluj3eoXPTXqohQZjF8hh3d72Si6PBzH1Ci844Avazd818yCF6k8RK4Yt7MG2Vpi2fEYmQZyAfiOw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
          avatar_lat: '12',
          avatar_lng: '12',
        },
      },
      relationships: {
        self_industries: {
          data: [
            {
              id: '1',
              type: 'acts_as_taggable_on_tags',
            },
            {
              id: '2',
              type: 'acts_as_taggable_on_tags',
            },
          ],
        },
        partner_industries: {
          data: [
            {
              id: '3',
              type: 'acts_as_taggable_on_tags',
            },
            {
              id: '4',
              type: 'acts_as_taggable_on_tags',
            },
          ],
        },
        sell_industries: {
          data: [
            {
              id: '5',
              type: 'acts_as_taggable_on_tags',
            },
            {
              id: '6',
              type: 'acts_as_taggable_on_tags',
            },
          ],
        },
      },
    },
    included: [
      {
        id: '1',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'Computer',
        },
      },
      {
        id: '2',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'Internet',
        },
      },
      {
        id: '3',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'ABC',
        },
      },
      {
        id: '4',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'XYZ',
        },
      },
      {
        id: '5',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'GGH',
        },
      },
      {
        id: '6',
        type: 'acts_as_taggable_on_tags',
        attributes: {
          name: 'TTA',
        },
      },
    ],
    meta: null,
  },
  visibleMenu: {
    show: false,
    coordinate: {
      top: 0,
      left: 0,
    },
  },
  callback: () => {},
};

const userReducer = (state: IFeedItemsState = initialState, action: IActionsUser): IFeedItemsState => {
  switch (action.type) {
    case GET_FEED_ITEMS_LIST_REQUESTED:
    case SET_FEED_ITEM_READ_REQUESTED:
    case GET_PUBLIC_PROFILE_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_FEED_ITEM_PAGINATION_REQUESTED:
      return {...state, callback: action?.callback, page: action?.payload, loading: true};
    case GET_PUBLIC_PROFILE_SUCCESS:
      return {
        ...state,
        dataUser: {
          ...state?.dataUser,
          data: action?.payload?.data,
          included: action?.payload?.included,
          meta: action?.payload?.meta,
        },
        loading: true,
      };
    case GET_FEED_ITEMS_LIST_SUCCESS:
    case GET_FEED_ITEM_PAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action?.payload,
        message: action?.payload?.message,
      };
    case GET_FEED_ITEMS_LIST_FAILURE:
    case GET_FEED_ITEM_PAGINATION_FAILURE:
    case SET_FEED_ITEM_READ_FAILURE:
    case GET_PUBLIC_PROFILE_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    case SET_FEED_VISIBLE_MENU:
      return {...state, ...action?.payload};
    default:
      return state;
  }
};

export default userReducer;
