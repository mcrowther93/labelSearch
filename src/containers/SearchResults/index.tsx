
import * as React from "react";
import * as ReactDOM from "react-dom";
import { SelectableItem } from '../../components/SelectableItem'
import apiActions from './../../utilites/apiActions'
import getQueryParams from '../../utilites/StringToObject'
import Pagination from '../../components/Pagination'
<<<<<<< HEAD
import {Link} from 'react-router-dom';
=======
>>>>>>> master

import './style.css'


interface IAuthState {
    step: number,
    results: any[]
}

interface IAuthProps {
    searchResults: any[],
    navigateToAbum(albumId): void,
    editLabel(label): void
    favouriteAlbums: []
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
        })

    }

    toggleAlbum = (label) => {
        this.props.editLabel(label)
    }

    renderResults = () => {
        const { results } = this.state;

        const beginningItem: number = this.state.step * 15;
        return (
            <Pagination itemsPerStep={15} step={this.state.step}
                numberOfItems={results.length} next={this.nextSteps}>

                <div className={'searchResult'}>

                    {results.slice(beginningItem, beginningItem + 15).map((album, index) => {
                        const background = album.images && album.images.url ? album.images.url : "";
                        const albumLikedCSS = this.props.favouriteAlbums.includes(album.label) && "favourite"

                        return (
<<<<<<< HEAD
                            <div key={album.id}>

                                <SelectableItem
                                    itemId={album.id}>
=======
                            <div>

                                <SelectableItem
                                    isSelected={null}
                                    key={album.id}
                                    itemId={album.id}
                                    onHover={}>
>>>>>>> master
                                    <div className={'searchresult-album'}>

                                        <img className={'searchResult-albumCover'} src={background} />
                                        <div className={"ablumDetails-wrapper"}>
                                            <div className={'flex-center'}>                                                
                                                <h2 onClick={() => this.clickImage(album.id)}>Play/Pause</h2>
<<<<<<< HEAD
                                                <Link to={`albums/${album.id}`}> <h2> Details </h2> </Link>
=======
                                                <h2>Details Page</h2>
>>>>>>> master
                                                </div>

                                        </div>
                                    </div>
                                </SelectableItem>

                                <div className={'searchResults-albumDetails'}>
                                                <span id={'album-name'}>{album.name}</span>
                                                <span onClick={() => this.toggleAlbum(album.label)} id={'album-label'}>
                                                    {album.label}
                                                    <div className={`icon ${albumLikedCSS}`}></div>
                                                </span>
                                            </div>
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
