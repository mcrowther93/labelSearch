import { handleActions, handleAction } from 'redux-actions';
import { IActiveUser, EDIT_LABEL, EDIT_ACTIVE_DATE} from '../actions/ActiveUser'
import * as _ from 'lodash'

const inititalState = {
    lastedLoggedIn: null,
    likedLabels: []
} as IActiveUser;

export const activeUserReducer = handleActions({
    [EDIT_LABEL]: (state: IActiveUser, { payload }) => ({
        ...state,
        likedLabels: state.likedLabels.includes(payload) ? state.likedLabels.filter(a => a != payload) :  state.likedLabels.concat(payload)
    }),
    [EDIT_ACTIVE_DATE]: (state: IActiveUser, { payload }) => ({
        ...state,
        lastedLoggedIn: payload
    })
}, inititalState)


