import { createAction } from 'redux-actions';

export interface IDevice {
    activeDevice: string;
    availableDevices: {
        is_active: boolean,
        name : string
        type : string
    }[]
}

export const VIEW_DEVICES: string = 'Devices/ViewDevices';
export const viewDevices = createAction(VIEW_DEVICES);

export const SET_DEVICES: string = 'Devices/SetDevices';
export const setDevices = createAction(SET_DEVICES);

export const SET_ACTIVE_DEVICES: string = 'Devices/SetActiveDevices';
export const setActiveDevice = createAction(SET_ACTIVE_DEVICES);