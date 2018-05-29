import { createAction } from 'redux-actions';

export interface IPlayer {
    song: any,
    isPlaying: boolean
}

export const PLAY_SONG: string = 'PlaySong';
export const playSong = createAction(PLAY_SONG);

