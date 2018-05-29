class SpotifyPlayer {

    private sdk;

    setSDK(sdk) {
        this.sdk = sdk;
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

        debugger;
        this.sdk.pause();

    }
    
    play =  () => {

        debugger;
        this.sdk.resume();

    }
    


}

const spotifyPlayer = new SpotifyPlayer();
export default spotifyPlayer;