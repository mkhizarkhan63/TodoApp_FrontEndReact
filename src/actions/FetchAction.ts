import * as actionTypes from './actionTypes';

export interface FetchDataRequestAction {
    type: typeof actionTypes.FETCH_DATA_REQUEST;

}

export interface FetchDataSuccessAction {
    type: typeof actionTypes.FETCH_DATA_SUCCESS;
    payload: any;

}

export interface FetchDataFailureAction {
    type: typeof actionTypes.FETCH_DATA_FAILURE;
    payload: string
}
