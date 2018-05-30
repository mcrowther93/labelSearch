
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { setAuthInfo } from '../../actions/Authorisation'
import { bindActionCreators } from 'redux'
import { SelectableItem } from '../../components/SelectableItem'
import apiActions from './../../utilites/apiActions'
import getQueryParams from '../../utilites/StringToObject'

interface IAuthState {
}

interface IAuthProps {
    searchResults: any,
    navigateToAbum(albumId): void;
}

export default class SearchResultsContainer extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.clickImage = this.clickImage.bind(this);
    }

    clickImage(albumId) {
        console.log(`Selected album ${albumId}`);
        apiActions.playTrack(albumId);
    }

    renderResults = () => {
        let markup = [];
        const { searchResults } = this.props;
        if (searchResults && searchResults.length > 0) {
            searchResults.forEach((album, index) => {
                const background =  album.images &&  album.images.url?  album.images.url : "";
                markup.push(<SelectableItem isSelected={this.clickImage} key={album.id} itemId={album.id}> 
                    <div style={{backgroundImage: `url(${background})`,
                    height: '300px',
                    width: '300px',
                    display: 'flex',
                    marginBottom: '2rem',
                    backgroundRepeat: 'no-repeat',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    overflow: 'hidden'}}>

                        <div style={{    width: '100%', background: 'rgba(35, 35, 35, 0.7)' }}>
                            <div style={{ fontSize: '1.5rem', color: '#f15d00' }}>
                                {album.name}
                            </div>
                            <div>
                                {album.label}
                            </div>
                            <div>
                                <img src='../../styles/play.svg'/>
                            </div>
                        </div>
                    </div>
                </SelectableItem>)
            })
        }

        return markup;
    }

    render() {
        return (
            <div className={'results'}>
                {this.renderResults()}
            </div>
        );
    }

}
