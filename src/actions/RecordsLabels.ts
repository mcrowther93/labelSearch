import { createAction } from 'redux-actions';

export interface IRecordLabel {
    recordLabel: string[],
}

export const ADD_LABEL: string = 'RecordLabel/ADD';
export const addRecordLabel = createAction(ADD_LABEL);