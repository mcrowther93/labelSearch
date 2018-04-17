import { handleActions, handleAction } from 'redux-actions';
import {BEGIN_SEARCH, SEARCH_FAILED, SEARCH_SUCCESS, ISearch} from '../actions/Search'

const inititalState = {
  isSearching: false,
  results: [],
  searchTerm: '',
  errorMessage: ''
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
        results: payload
    }),
}, inititalState)