import apiActions from './apiActions';
import {} from '../store'

class SpotifyPlayer {

    private sdk;

    setSDK(sdk) {
        this.sdk = sdk;

<<<<<<< HEAD
        this.sdk.on('playback_error', ({ message }) => {
            console.error('Failed to perform playback', message);
          });
          this.sdk.addListener('player_state_changed', (payload) => {
              console.log(`Song changed payload:`, payload)
          });
    }
=======
    // changeConnection(){
    //     this.sdk.
    // }


>>>>>>> 9c4848004bc77aeb1682ad8f93f74d2001787cf6
    
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
        this.sdk.pause();
    }
    
    play =  () => {
        this.sdk.resume();
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