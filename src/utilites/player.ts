import apiActions from './apiActions';
import store from '../store'

import {playSong, PLAY_SONG} from '../actions/Player';

class SpotifyPlayer {

    private sdk;

    setSDK(sdk) {
        this.sdk = sdk;

        this.sdk.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
        });

        this.sdk.addListener('player_state_changed', (payload) => {
            console.log(`Song changed payload`)
            store.dispatch(playSong(payload))
        });

    }
    
    async isCurrentlyListeningTo() {
        let state = await this.sdk.getCurrentState();
        if (state == null) {
            // Playback isn't on this device yet
        } else {
            let {
                id,
                uri: track_uri,
                name: track_name,
                duration_ms,
                artists,
                album: {
                    name: album_name,
                    uri: album_uri,
                    images: album_images
                }
            } = state.track_window.current_track;
            console.log(`You're listening to ${track_name} by ${artists[0].name}!`);
        }
    }

    pause =  () => {
        this.sdk.togglePlay();
    }
    
    play =  () => {
        this.sdk.togglePlay();
    }
    
    playSong = (trackId) => {
        this.pause();
        apiActions.playTrack(trackId);
    } 

    nextSong = () => {
        this.sdk.nextTrack();
    }

    previousSong = () => {
        this.sdk.previousTrack();
    }

}

const spotifyPlayer = new SpotifyPlayer();
export default spotifyPlayer;