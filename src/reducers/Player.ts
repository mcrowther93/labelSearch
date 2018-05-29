import { handleActions, handleAction } from 'redux-actions';
import {PLAY_SONG, playSong, IPlayer} from '../actions/Player'

const inititalState = {
song: null,
isPlaying: false
} as IPlayer;

export const searchReducer = handleActions({
    [PLAY_SONG]: (state: IPlayer, {payload}) => ({
        ...state,
        isPlaying: true,
        song: payload
    })
});