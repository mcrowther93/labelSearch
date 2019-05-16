import { handleActions, handleAction } from 'redux-actions';
import {SET_USERS_AUTHORISATION_INFO, IAuthUser
        , SET_USERS_USER, START_SET_USERS_USER} from '../actions/Authorisation'

const inititalState = {
    accessToken: '',
    expires_in: '',
    _id: '',
    loadingProfile: false
} as IAuthUser;

export const authorisationReducer = handleActions({
    [SET_USERS_AUTHORISATION_INFO]: (state: IAuthUser, {payload}) => ({
        accessToken: payload.access_token,
        expires_in: payload.expires_in
    }),
    [SET_USERS_USER]: (state: IAuthUser, {payload}) => ({
        ...state,
        loadingProfile: false
    }),
    [START_SET_USERS_USER]: (state: IAuthUser, {payload}) => ({
        ...state,
        loadingProfile: true
    }),

}, inititalState);
