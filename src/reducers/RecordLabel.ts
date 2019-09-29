import { handleActions, handleAction } from 'redux-actions';
import { ADD_LABEL, IRecordLabel } from '../actions/RecordsLabels'
import * as _ from 'lodash'

const inititalState = {
    recordLabel: []
} as IRecordLabel;

export const recordLabelReducer = handleActions({
    [ADD_LABEL]: (state: IRecordLabel, { payload }) => ({
        recordLabel: labelExists(payload, state.recordLabel)
    }),
}, inititalState)


const labelExists = (labelNames: string[], existingLabels): string[] => {
    labelNames.forEach(label => {
        if (!_.includes(existingLabels, label)) {
            existingLabels.push(label)
        }
    });

    return existingLabels;
}