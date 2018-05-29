
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import {setAuthInfo} from '../../actions/Authorisation'
import {bindActionCreators} from 'redux'

import getQueryParams from '../../utilites/StringToObject'


interface IAuthState {
    album,
}

interface IAuthProps {
    albumDetails,
    history: History,
    location: Location,
    albums


}

class AlbumDetails extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state){
        super(props, state);
        this.state = {
            album: null
        }
    }

    componentDidMount(){
        // get id
        const pathname = this.props.location.pathname;
        const indexOf = pathname.lastIndexOf("/")
        const id = pathname.substring(indexOf+1);

        const album = this.props.albums.filter(album => album.id === id)[0]
        console.log(`Redirected to ${id} found album in state`, album);
        
        this.setState({
            album: album
        });

        document.title = `Albums - ${album.name}`
    }

    render(){

        const {album} = this.state

        return(
            <div>
                <h1> {album && album.name} </h1>

                <ul>
                    {album &&  album.tracks.map((track) => <li key={track.id}> {track.name} </li>)}
                </ul>


            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        albums: state.search.results,
    }
}

export default connect(mapStateToProps, {})(AlbumDetails);