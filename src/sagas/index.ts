import {takeEvery, put } from 'redux-saga/effects'
import {COUNT_DECREMENT} from '../actions'

export function* incrementAsync() {
}
  
  // Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
  export function* watchIncrementAsync() {
    yield takeEvery(COUNT_DECREMENT, incrementAsync)
  }