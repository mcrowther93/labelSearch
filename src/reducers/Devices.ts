import { handleActions, handleAction } from 'redux-actions';
import { IDevice, VIEW_DEVICES, SET_DEVICES, SET_ACTIVE_DEVICES } from '../actions/Devices'
import * as _ from 'lodash'

const inititalState = {
    activeDevice: '',
    availableDevices: []
} as IDevice;

export const deviceReducer = handleActions({
    [SET_DEVICES]: (state: IDevice, { payload }) => ({
        ...state,
        availableDevices: payload
    }),
    [SET_ACTIVE_DEVICES]: (state: IDevice, { payload }) => ({
        ...state,
        activeDevice: payload
    })
}, inititalState)

