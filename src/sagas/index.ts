import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'
import { COUNT_DECREMENT } from '../actions'
import { setUser, START_SET_USERS_USER, SET_USERS_USER } from '../actions/Authorisation'
import axios from 'axios'
import spotifyPlayer from '../utilites/player';

export function* setAuth() {
  const authorisation = yield select((state: any) => state.authorisation);
  const response = yield call(callMeEndpoint, authorisation.accessToken);
  yield put({ type: SET_USERS_USER, payload: response.data });


  // seperate this please.
  const {Player} = yield waitForSpotifyWebPlaybackSDKToLoad();
  console.log("The Web Playback SDK has loaded.", Player);
  const sdk  = new Player({
    name: "Web Playback SDK",
    volume: 1.0,
    getOAuthToken: callback => { callback(authorisation.accessToken); }
  });

  sdk.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    window.localStorage.setItem('deviceId', device_id)
  });


  yield sdk.connect().then(connected => {
    if (connected) {
      console.log(`connected`);
    }
  });



  spotifyPlayer.setSDK(sdk);

}


async function waitForSpotifyWebPlaybackSDKToLoad () {
  return new Promise(resolve => {
    if (self.window.Spotify) {
      resolve(self.window.Spotify);
    } else {
      self.window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(self.window.Spotify);
      };
    }
  });
};


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