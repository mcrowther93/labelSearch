import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'
import { COUNT_DECREMENT } from '../actions'
import { setUser, START_SET_USERS_USER, SET_USERS_USER } from '../actions/Authorisation'
import axios from 'axios'

export function* setAuth() {
  const authorisation = yield select((state: any) => state.authorisation);
  const response = yield call(callMeEndpoint, authorisation.accessToken);
  yield put({ type: SET_USERS_USER, payload: response.data });
}


function callMeEndpoint(accessToken) {

  let response = null;
  return axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })

}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* authorise() {
  yield takeEvery(START_SET_USERS_USER, setAuth)
}