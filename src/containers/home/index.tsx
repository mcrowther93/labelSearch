
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { startSetUser, IAuthUser } from '../../actions/Authorisation'
import { beginSearch, ISearch } from '../../actions/Search'

import { bindActionCreators } from 'redux'
import './style.css'
import { TextBox } from '../../components/TextBox'
import AlbumDetails from '../AlbumDetails'
import SearchResultsContainer from '../SearchResults'

import spotifyPlayer from '../../utilites/player';


import * as _ from 'lodash'

interface IAuthState {
    firstLoad: boolean;
    searchTerm: string;
}

interface IAuthProps {
    user: IAuthUser;
    startSetUser(): void;
    beginSearch(value): void;
    history: any;
    results: any[];
    recordLabels: string[]
}

class Home_ extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.state = {
            searchTerm: "",
            firstLoad: false,
        };
        this.navigateToAlbum = this.navigateToAlbum.bind(this);
    }
 
    componentDidMount() {
        if (this.props.user.accessToken) {
            console.log(`User profile`, this.props.user)
            this.props.startSetUser();
        } else {
            this.props.history.push('/auth')
        }

        // document.title = ``;
    }

    debouncedSearch = () => {
        this.props.beginSearch(this.state.searchTerm);
    }

    validateSearch = (value: string) => {
        console.log(value);

        if (value.length > 0) {
            this.setState({ searchTerm: value });
            this.props.beginSearch(value);
    
        }

    }

    navigateToAlbum(albumId){
        this.props.history.push(`/albums/${albumId}`)
    }

    renderSearch = () => {
        return (<div className={'searchBox'}><TextBox
            // selectionOptions={this.props.recordLabels}
            onValueChange={this.validateSearch}
            style={{ outline: 'none', width: '100%', height: '50px', lineHeight: '100%', fontSize: '150%' }}
            placeholder={'Search For Label'}>
        </TextBox></div>)
    }

    listeningTo(){
        spotifyPlayer.isCurrentlyListeningTo();
    }


    render() {
        const { user, results } = this.props;
        return (
            <div>
                {
                    user.loadingProfile ? 'Loading Profile' :
                        <div>
                            <div>
                                {this.renderSearch()}
                                <br />
                                <button onClick={this.listeningTo} > Listening TO </button>
                                <button onClick={spotifyPlayer.pause} > Pause</button>
                                <button onClick={spotifyPlayer.play} > Play</button>

                            </div>
                            <div style={{margin: '20px 0'}}>
                                {<SearchResultsContainer 
                                navigateToAbum={this.navigateToAlbum}
                                searchResults={this.props.results} 
                                />} </div>
                        </div>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.authorisation,
        results: state.search.results,
        recordLabels: state.recordLabels.recordLabel
    }
}

export default connect(mapStateToProps, { startSetUser, beginSearch })(Home_);
