
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { setAuthInfo } from '../../actions/Authorisation'
import { bindActionCreators } from 'redux'
import { SelectableItem } from '../../components/SelectableItem'
import apiActions from './../../utilites/apiActions'
import getQueryParams from '../../utilites/StringToObject'
import Pagination from '../../components/Pagination'

import './style.css'


interface IAuthState {
    step: number,
    results: any[]
}

interface IAuthProps {
    searchResults: any[],
    navigateToAbum(albumId): void;
}

export default class SearchResultsContainer extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);

        this.state = {
            step: 0, 
            results: []
        }

        this.clickImage = this.clickImage.bind(this);
    }

    clickImage = (albumId) => {
        console.log(`Selected album ${albumId}`);
        apiActions.playTrack(albumId);
    }

    nextSteps = (step) => {
        this.setState({
            step: step
        })
    }

    componentDidMount = () => {
        this.setState({
            results: this.props.searchResults,
        })
    }

    componentWillReceiveProps = (nextProps) => {

        this.setState({
            results: nextProps.searchResults,
            step: 0
        })

    }

    renderResults = () => {
        const { results } = this.state;

        const beginningItem: number = this.state.step * 12;
        return (
            <Pagination itemsPerStep={12} step={this.state.step} 
                        numberOfItems={results.length} next={this.nextSteps}>



                <div className={'searchResult'}>

                    {results.slice(beginningItem, beginningItem + 12).map((album, index) => {
                        const background = album.images && album.images.url ? album.images.url : "";
                        return (
                            <div className={'searchresult-album'}>

                                <SelectableItem
                                    onHover={null}
                                    isSelected={this.clickImage}
                                    key={album.id}
                                    itemId={album.id}>
                                    <img className={'searchResult-albumCover'} src={background} />
                                    <div>

                                        <div className={'searchResults-albumDetails'}>
                                            <div>{album.name}</div>
                                            <div>{album.label}</div>
                                        </div>
                                    </div>
                                </SelectableItem>
                            </div>
                        )
                    })}
                </div>

            </Pagination>
        )
    }

    render() {
        return (
            <div>
                {this.renderResults()}
            </div>

        );
    }

}
