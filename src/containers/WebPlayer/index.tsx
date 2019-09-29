
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import spotifyPlayer from '../../utilites/player';
import apiActions from './../../utilites/apiActions'
import './style.css'

interface IAuthState {
    isHovering: boolean;
}

interface IAuthProps {
    player: any,
    playlistId: string
}

export class Player extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
    }

    renderSongDetails = (song) => {
        return (
            <div className={'nowPlayingDetails'}>
                <div>{song.currentSong}</div>
                <div>{song.artistName}</div>
            </div>
        )
    }

    addToPLaylist = () => {
        apiActions.addToPLaylist(this.props.player.song.uri, this.props.playlistId)
    }

    render() {
        const {player} = this.props;

        return (
            <div className={'wrapper'}>
                <div>{player && player.song && this.renderSongDetails(player.song)}</div>
                <div className={'actionButtons'}>
                    <button className={'webplayer-previous'} onClick={spotifyPlayer.previousSong} > </button>
                    <div className={'play-wrapepr'}>
                        <button className={player.isPaused ? 'webplayer-play' : 'webplayer-pause'} onClick={spotifyPlayer.pause} ></button>
                    </div>
                    <button className={'webplayer-next'} onClick={spotifyPlayer.nextSong} ></button>
                </div>
                <div onClick={this.addToPLaylist}>like</div>

                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.player,
        playlistId: state.activeUser.myPlaylist
    }
}

export default connect(mapStateToProps)(Player);
