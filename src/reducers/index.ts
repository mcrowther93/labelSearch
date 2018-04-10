import { handleActions, handleAction } from 'redux-actions';
import {COUNT_INCREMENT, COUNT_DECREMENT} from '../actions'
import { combineReducers } from 'redux';

const appReducer = handleActions({
    [COUNT_INCREMENT]: (state, action) => ({
        counter: state.counter + 1
    }),
    [COUNT_DECREMENT]: (state, action) => ({
        counter: state.counter - 1
    })
}
  , { counter: 5 });


  export const reducers = combineReducers({
    appReducer
  })


