import { handleActions, handleAction } from 'redux-actions';
import {BEGIN_SEARCH, SEARCH_FAILED, SEARCH_SUCCESS, ISearch} from '../actions/Search'
import * as _ from 'lodash'

const inititalState = {
  isSearching: false,
  results: [],
  searchTerm: '',
  errorMessage: '',
  recordLabel:[]
} as ISearch;

export const searchReducer = handleActions({
    [BEGIN_SEARCH]: (state: ISearch, {payload}) => ({
        ...state,
        isSearching: true,
        searchTerm: payload
    }), 
    [SEARCH_FAILED]: (state: ISearch, {payload}) => ({
        ...state,
        isSearching: false,
        errorMessage: payload.error
    }), 
    [SEARCH_SUCCESS]: (state: ISearch, {payload}) => ({
        ...state,
        isSearching: false,
        results: payload,
        recordLabel: uniuqeRecordLabel(payload)
    }),
}, inititalState)


const uniuqeRecordLabel = (albums) => {
    return _.uniqBy(albums, (album) => album.label).map(ad => ad.label);
}

const groupByRecordLabel = (albums) => {

    const groupedAlbum = albums.reduce((groupByRecordLabel, album) => {
        const recordLabel = album.label;

        if(groupByRecordLabel[recordLabel] === undefined){
        groupByRecordLabel[recordLabel] = [];
        }

        return [...groupByRecordLabel, album];

    }, {})


    return groupedAlbum;
}