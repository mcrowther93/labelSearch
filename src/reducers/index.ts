import { handleActions, handleAction } from 'redux-actions';
import {COUNT_INCREMENT} from '../actions'
import { combineReducers } from 'redux';

const appReducer = handleAction(
    COUNT_INCREMENT, (state, action) => ({
        counter: state.counter + 1
    })
  , { counter: 5 });


  export const reducers = combineReducers({
    appReducer
  })


