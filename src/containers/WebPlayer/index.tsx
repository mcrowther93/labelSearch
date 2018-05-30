
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import spotifyPlayer from '../../utilites/player';
import './style.css'

import pauseIcon from '../../styles/pause.svg';

interface IAuthState {
    isHovering: boolean;
}

interface IAuthProps {
    player: any
}

export class Player extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
    }


    handleAction = () => {

    }


    renderSongDetails = (song) => {
        return (
            <div className={'nowPlayingDetails'}>
                {song.artistName} - {song.currentSong}
            </div>
        )
    }

    render() {

        const {player} = this.props;

        return (
            <div className={'wrapper'}>
                <div className={'actionButtons'}>
                    <button onClick={spotifyPlayer.pause} > Pause</button>
                    <button onClick={spotifyPlayer.previousSong} > Previous</button>
                    <button onClick={spotifyPlayer.nextSong} > Next</button>

                </div>
                {player && player.song && this.renderSongDetails(player.song)}
                
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        player: state.player,
    }
}

export default connect(mapStateToProps, null)(Player);
