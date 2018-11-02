import { handleActions, handleAction } from 'redux-actions';
import {PLAY_SONG, playSong, IPlayer} from '../actions/Player'


interface INowPLaying  {

    id: string,
    currentSong: string,
    nextSong?: INowPLaying,
    duration: number,
    artistName: string
}

const inititalState = {
song: null as INowPLaying,
isPlaying: false,
isPaused: false
} as IPlayer;

export const playerReducer = handleActions({
    [PLAY_SONG]: (state: IPlayer, {payload}) => ({
        ...state,
        isPlaying: true,
        isPaused: payload.paused,
        song: transformIntoSong(payload.track_window)
    })
},inititalState);


const transformIntoSong = (payload) => {

    const currentSong = payload.current_track;

    const nextSong = payload.next_tracks.length > 0 ? payload.next_tracks[0] : null;

    return {
        artistName: currentSong.artists[0].name,
        currentSong: currentSong.name,
        duration: currentSong.duration_ms,
        id: currentSong.id,
        nextSong: nextSong && {
            artistName: nextSong.artists[0].name,
            currentSong: nextSong.name,
            duration: nextSong.duration_ms,
            id: nextSong.id,
        } as INowPLaying

    } as INowPLaying;
}