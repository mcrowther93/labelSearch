import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {authorisationReducer} from './Authorisation'
import {searchReducer} from './Seach'
import {recordLabelReducer} from './RecordLabel'
import {playerReducer} from './Player'
import {deviceReducer} from './Devices'
import {activeUserReducer} from './ActiveUser'


  export const reducers = combineReducers({
    authorisation: authorisationReducer,
    search: searchReducer,
    recordLabels: recordLabelReducer,
    player: playerReducer,
    devices: deviceReducer,
    activeUser: activeUserReducer
  })


