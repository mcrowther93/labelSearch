
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { setAuthInfo } from '../../actions/Authorisation'
import { bindActionCreators } from 'redux'
import { SelectableItem } from '../../components/SelectableItem'

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
        this.props.navigateToAbum(albumId);

    }

    renderResults = () => {
        let markup = [];
        const { searchResults } = this.props;
        if (searchResults && searchResults.length > 0) {
            searchResults.forEach((album, index) => {
                markup.push(<SelectableItem isSelected={this.clickImage} key={album.id} itemId={album.id}>
                    <div>
                        {album.images && <img src={album.images.url} />}
                    </div>
                    <div>
                        {album.name}
                    </div>
                    <div>
                        {album.label}
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
