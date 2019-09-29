import { handleActions, handleAction } from 'redux-actions';
<<<<<<< HEAD
import { IActiveUser, EDIT_LABEL, EDIT_ACTIVE_DATE, ADD_MY_PLAYLIST} from '../actions/ActiveUser'
=======
import { IActiveUser, EDIT_LABEL, EDIT_ACTIVE_DATE} from '../actions/ActiveUser'
>>>>>>> master
import * as _ from 'lodash'

const inititalState = {
    lastedLoggedIn: null,
<<<<<<< HEAD
    likedLabels: [],
    myPlaylist: []
=======
    likedLabels: []
>>>>>>> master
} as IActiveUser;

export const activeUserReducer = handleActions({
    [EDIT_LABEL]: (state: IActiveUser, { payload }) => ({
        ...state,
        likedLabels: state.likedLabels.includes(payload) ? state.likedLabels.filter(a => a != payload) :  state.likedLabels.concat(payload)
    }),
    [EDIT_ACTIVE_DATE]: (state: IActiveUser, { payload }) => ({
        ...state,
        lastedLoggedIn: payload
<<<<<<< HEAD
    }),
    [ADD_MY_PLAYLIST]: (state: IActiveUser, { payload }) => ({
        ...state,
        myPlaylist: payload
=======
>>>>>>> master
    })
}, inititalState)


