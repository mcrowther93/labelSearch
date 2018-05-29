
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import spotifyPlayer from '../../utilites/player';
import './style.css'

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

    render() {

        const {player} = this.props;

        return (
<<<<<<< HEAD
            <div className={'actionButtons'}>
                <button onClick={spotifyPlayer.pause} > Pause</button>
                <button onClick={spotifyPlayer.previousSong} > Previous</button>
                <button onClick={spotifyPlayer.nextSong} > Next</button>

                {player && player.songName}

=======
            <div>
                <div>
                    Song Info
            </div>
                <div>
                    seeker
            </div>
                <div>
                    Volume
                </div>

                <div>
                    Play/Pause/Rewind/Forward
                </div>
>>>>>>> 9c4848004bc77aeb1682ad8f93f74d2001787cf6
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
