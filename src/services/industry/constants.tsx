import {IAsyncCall, IModalAsyncCall, ISetAsyncCall} from '~Root/types';

export const GET_INDUSTRY_REQUESTED = 'GET_INDUSTRY/REQUESTED';
export const GET_INDUSTRY_SUCCESS = 'GET_INDUSTRY/SUCCESS';
export const GET_INDUSTRY_FAILURE = 'GET_INDUSTRY/FAILURE';

export const ASYNC_GET_INDUSTRY: IAsyncCall = {
  REQUESTED: GET_INDUSTRY_REQUESTED,
  SUCCESS: GET_INDUSTRY_SUCCESS,
  FAILURE: GET_INDUSTRY_FAILURE,
};

export const SET_DATA_INDUSTRY_SELECTED = 'DATA_INDUSTRY_SELECTED/SET';
export const DELETE_DATA_INDUSTRY = 'DELETE_DATA_INDUSTRY/SET';

export const FILTER_DATA_INDUSTRY = 'DATA_INDUSTRY/FILTER';
export const ASYNC_FILTER_DATA_INDUSTRY: ISetAsyncCall = {
  SET: FILTER_DATA_INDUSTRY,
};

export const SHOW_MODAL_INDUSTRY = 'MODAL_INDUSTRY/SHOW';
export const HIDE_MODAL_INDUSTRY = 'MODAL_INDUSTRY/HIDE';
export const ASYNC_SHOW_MODAL_INDUSTRY: IModalAsyncCall = {
  SHOW: SHOW_MODAL_INDUSTRY,
  HIDE: HIDE_MODAL_INDUSTRY,
};

export const GET_ALL_INDUSTRIES_REQUESTED = 'GET_ALL_INDUSTRIES/REQUESTED';
export const GET_ALL_INDUSTRIES_SUCCESS = 'GET_ALL_INDUSTRIES/SUCCESS';
export const GET_ALL_INDUSTRIES_FAILURE = 'GET_ALL_INDUSTRIES/FAILURE';
