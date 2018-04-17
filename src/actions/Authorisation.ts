import { createAction } from 'redux-actions';


export interface IAuthUser {
    accessToken: string,
    expires_in: string,
    name: string,
    _id: string,
    loadingProfile: boolean
}
export const SET_USERS_AUTHORISATION_INFO: string = 'Authorisation/SetUserAuthInfo';
export const setAuthInfo = createAction(SET_USERS_AUTHORISATION_INFO);

export const SET_USERS_USER: string = 'Authorisation/SetUser';
export const setUser = createAction(SET_USERS_USER);

export const START_SET_USERS_USER: string = 'Authorisation/StartSetUser';
export const startSetUser = createAction(START_SET_USERS_USER);