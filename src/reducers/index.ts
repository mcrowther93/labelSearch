import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {authorisationReducer} from './Authorisation'
import {searchReducer} from './Seach'
import {recordLabelReducer} from './RecordLabel'

  export const reducers = combineReducers({
    authorisation: authorisationReducer,
    search: searchReducer,
    recordLabels: recordLabelReducer
  })


