
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
                <div>{song.currentSong}</div>
                <div>{song.artistName}</div>
            </div>
        )
    }

    render() {

        const {player} = this.props;

        return (
            <div className={'wrapper'}>
                <div className={'actionButtons'}>
                    <button className={'webplayer-previous'} onClick={spotifyPlayer.previousSong} > </button>
                    <button className={player.isPaused ? 'webplayer-play' : 'webplayer-pause'} onClick={spotifyPlayer.pause} ></button>
                    <button className={'webplayer-next'} onClick={spotifyPlayer.nextSong} ></button>

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
