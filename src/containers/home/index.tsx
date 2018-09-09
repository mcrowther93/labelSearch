
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
import WebPlayer from '../WebPlayer';
import { MultiSelect } from '../../components/MultiSelect';

import * as _ from 'lodash'
import { SelectableItem } from "../../components/SelectableItem";

interface IAuthState {
    firstLoad: boolean;
    searchTerm: string;
    filterBy: string[],
    sortBy: string
}

interface IAuthProps {
    user: IAuthUser;
    startSetUser(): void;
    beginSearch(value): void;
    history: any;
    results: any[];
    recordLabels: string[];
    player: any;
}

class Home_ extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.state = {
            searchTerm: "",
            firstLoad: false,
            filterBy: [],
            sortBy: ''
        };
        this.navigateToAlbum = this.navigateToAlbum.bind(this);

        this.search = _.debounce(this.search, 500, { leading: false, trailing: true })

    }

    componentDidMount() {
        if (this.props.user.accessToken) {
            console.log(`User profile`, this.props.user)


            if (!this.props.user._id)
                this.props.startSetUser();

        } else {
            this.props.history.push('/auth')
        }

    }

    validateSearch = (value: string) => {
        console.log(`Search Term: ${value}`);
        if (value.length > 1) {
            this.setState({ searchTerm: value, filterBy: [] });
            this.search();
        }
    }

    search = () => {
        this.props.beginSearch(this.state.searchTerm)
    }


    navigateToAlbum(albumId) {
        this.props.history.push(`/albums/${albumId}`)
    }


    filterAlbum = (filterBy) => {
        console.log(`Filtering By ${filterBy}`)
        this.setState({ filterBy: filterBy });

    }

    sortAlbum = (sortBy) => {
        console.log(`Sorting By ${sortBy}`)
        this.setState({ sortBy: sortBy[0] });

    }
 

    renderFilter = () => {
        return (
            <div className={'ablum-organise'}>
                <div className={'album-filter-wrapper'}>
                    <MultiSelect style={{ maxHeight: "150px", overflowY: "scroll", backgroundColor: "white", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                        itemStyle={{ padding: "5px 5px" }}
                        isSelected={this.filterAlbum}
                        onHover={null} 
                        items={this.props.recordLabels.filter(f => !this.state.filterBy.includes(f))}
                        canSelectMultiple={true}
                        selectedStyle={{backgroundColor: 'rgb(215, 175, 149)', color: "white"}}
                        type={"TAG"}
                    />
                </div>
                <div className={'album-sort-wrapper'}>
                    <MultiSelect style={{ maxHeight: "150px", overflowY: "scroll" , backgroundColor: "white" , boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                        itemStyle={{ padding: "5px 5px" }}
                        isSelected={this.sortAlbum}
                        onHover={null}
                        items={['Release Day (Desending)', 'A-Z Album Name']}
                        selectedStyle={{backgroundColor: 'rgb(215, 175, 149)', color: "white"}}
                        type={"NORMAL"}
                    />
                </div>
            </div>

        )
    }

    sortAlbums = (albums: any[]) => {

        switch (this.state.sortBy) {
            case 'Release Day (Desending)':
                return albums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate);
            case 'A-Z Album Name':
                return albums.sort((a, b) => a.name.localeCompare(b.name))
            default:
                return albums;
        }

    }

    renderSearch = () => {
        return (<div className={'searchBox'}><TextBox
            // selectionOptions={this.props.recordLabels}
            onValueChange={this.validateSearch}
            style={{ outline: 'none', width: '100%', height: '50px', lineHeight: '100%', fontSize: '150%' }}
            placeholder={'Search For Label'}>
        </TextBox></div>)
    }

    render() {

        const { user, results } = this.props;
        const filteredAlbums = this.state.filterBy.length > 0 ? results.filter((r) => this.state.filterBy.includes(r.label)) : results
        const sortedAlbums = this.sortAlbums(filteredAlbums)
        return (
            <div>
                {
                    user.loadingProfile ? 'Loading Profile' :
                        <div>
                            <div>
                                {this.renderSearch()}

                                {this.props.recordLabels.length > 0 && this.renderFilter()}

                            </div>
                            <div style={{ margin: '10px 20px' }}>
                                {sortedAlbums.length > 0 && <SearchResultsContainer
                                    navigateToAbum={this.navigateToAlbum}
                                    searchResults={sortedAlbums}
                                />}
                            </div>
                            {this.props.player.isPlaying && 
                                <div className={'webPlayerWrapper'}>
                                <WebPlayer />
                                </div>
                            }
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
        recordLabels: state.search.recordLabel,
        player: state.player,
    }
}

export default connect(mapStateToProps, { startSetUser, beginSearch })(Home_);
