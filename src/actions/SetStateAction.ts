import * as actionTypes from './actionTypes';

export interface SetStateDataAction {
    type: typeof actionTypes.SET_DATA_STATE;
    payload: any;
}