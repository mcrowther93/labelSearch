import { createAction } from 'redux-actions';


export interface ISearch {
    searchTerm: string,
    isSearching: boolean,
    results: any[]
}

export const BEGIN_SEARCH: string = 'Search/BeginSearch';
export const beginSearch = createAction(BEGIN_SEARCH);

export const SEARCH_FAILED: string = 'Search/SearchFailed';
export const searchFailed = createAction(SEARCH_FAILED);

export const SEARCH_SUCCESS: string = 'Search/SearchSuccess';
export const searchSuccess = createAction(SEARCH_SUCCESS);