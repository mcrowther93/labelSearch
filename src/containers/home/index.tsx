
import * as React from "react";
import { connect } from 'react-redux'
import { startSetUser, IAuthUser } from '../../actions/Authorisation'
import { beginSearch } from '../../actions/Search'
import { viewDevices, IDevice } from '../../actions/Devices'
import { editLabel } from '../../actions/ActiveUser'

import { TextBox } from '../../components/TextBox'
import SearchResultsContainer from '../SearchResults'
import WebPlayer from '../WebPlayer';
import { MultiSelect } from '../../components/MultiSelect';

import './style.css'

import * as _ from 'lodash'
import StickyHeader from "../StickyHeader";
import SidePanel from '../../components/SidePanel';

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
    viewDevices(): void,
    editLabel(label): void
    history: any;
    results: any[];
    recordLabels: string[];
    player: any;
    devices: IDevice,
    favouriteLabels: []
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
        this.search = _.debounce(this.search, 500, { leading: false, trailing: true })
    }

    componentDidMount() {
        if (this.props.user.accessToken) {
            console.log(`User profile`, this.props.user)


            if (!this.props.user._id) { }
            this.props.startSetUser();


            this.props.viewDevices()


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


    navigateToAlbum = (albumId) => {
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

    toggleLabel = (label) => {
        this.props.editLabel(label)
    }



    renderFilter = () => {
        return (
            <div className={'ablum-organise'}>
                <div className={'album-filter-wrapper'}>
                    <MultiSelect style={{
                        padding: "10px",
                        borderRadius: "14px", maxHeight: "150px", overflowY: "scroll", backgroundColor: "white", boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}
                        itemStyle={{ padding: "5px 5px" }}
                        isSelected={this.filterAlbum}
                        onHover={null}
                        items={this.props.recordLabels.filter(f => !this.state.filterBy.includes(f))}
                        canSelectMultiple={true}
                        selectedStyle={{ backgroundColor: 'rgb(67, 68, 84)', color: "white" }}
                        type={"TAG"}
                    />
                </div>
                <div className={'album-sort-wrapper'}>
                    <MultiSelect style={{
                        padding: "10px",
                        borderRadius: "14px", maxHeight: "150px", overflowY: "scroll", backgroundColor: "white", boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}
                        itemStyle={{ padding: "5px 5px" }}
                        isSelected={this.sortAlbum}
                        onHover={null}
                        items={['Release Day (Desending)', 'A-Z Album Name', 'Popularity']}
                        selectedStyle={{ backgroundColor: 'rgb(67, 68, 84)', color: "white" }}
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
            case 'Popularity':
                return albums.sort((a, b) => a.popularity < b.popularity ? 1 : -1)
            default:
                return albums;
        }

    }

    renderSearch = () => {
        return (
            <div className={'searchBox'}>
                <TextBox
                    onValueChange={this.validateSearch}
                    style={{ outline: 'none', width: '100%', height: '50px', lineHeight: '100%', fontSize: '150%' }}
                    placeholder={'Search For Label'}>
                </TextBox>
            </div>
        )
    }

    render() {

        const { user, results } = this.props;
        const filteredAlbums = this.state.filterBy.length > 0 ? results.filter((r) => this.state.filterBy.includes(r.label)) : results
        const sortedAlbums = this.sortAlbums(filteredAlbums)
        return (
            <div>
                <StickyHeader />
                {
                    user.loadingProfile ? 'Loading Profile' :
                        <div className={'app-wrapper'}>
                            <SidePanel />

                            <div>
                                {this.renderSearch()}

                                {this.props.recordLabels.length > 0 && this.renderFilter()}

                            </div>
                            <div style={{ margin: '10px 20px' }}>

                                <React.Suspense   fallback={<div>Loading....</div>} >

                                    {sortedAlbums.length > 0 && <SearchResultsContainer
                                        navigateToAbum={this.navigateToAlbum}
                                        searchResults={sortedAlbums}
                                        editLabel={this.toggleLabel}
                                        favouriteAlbums={this.props.favouriteLabels}
                                    />}
                                </React.Suspense>

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
        devices: state.devices,
        favouriteLabels: state.activeUser.likedLabels
    }
}

export default connect(mapStateToProps, { startSetUser, beginSearch, viewDevices, editLabel })(Home_);
