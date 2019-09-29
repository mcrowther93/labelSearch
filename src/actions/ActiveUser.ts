import { createAction } from 'redux-actions';

export interface IActiveUser {
    likedLabels: [],
    lastedLoggedIn: Date,
}

export const EDIT_LABEL: string = 'ActiveUser/editLabels';
export const editLabel = createAction(EDIT_LABEL);

export const EDIT_ACTIVE_DATE: string = 'ActiveUser/editActiveDate';
export const editActiveDate = createAction(EDIT_ACTIVE_DATE);


export const ADD_MY_PLAYLIST: string = 'ActiveUser/addMyPlaylist';
export const addMyPlaylist = createAction(ADD_MY_PLAYLIST);
