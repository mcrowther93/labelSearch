import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'
import { START_SET_USERS_USER, SET_USERS_USER } from '../actions/Authorisation'
import { EDIT_ACTIVE_DATE, ADD_MY_PLAYLIST } from '../actions/ActiveUser'

import axios from 'axios'
import spotifyPlayer from '../utilites/player';
import apiActions from './../utilites/apiActions';


export function* setAuth() {
  const authorisation = yield select((state: any) => state.authorisation);
  const response = yield apiActions.callMeEndpoint();
  let roundHerePlaylist, usersPlaylist;
  let nextUrl;

  do {
    usersPlaylist = yield apiActions.getMyPlaylist(nextUrl);
    roundHerePlaylist = usersPlaylist.data.items.filter(playlist => playlist.name === 'RoundHere...')
    nextUrl = usersPlaylist.data.next 
  } while(usersPlaylist.data.next && roundHerePlaylist.length < 1)


  if(roundHerePlaylist.length < 1){
    roundHerePlaylist = yield apiActions.createPlaylist(response.data.id).data;
  }else {
    roundHerePlaylist = roundHerePlaylist[0];
  }


  yield put({ type: SET_USERS_USER, payload: response.data });
  yield put({ type: EDIT_ACTIVE_DATE, payload: new Date().getTime() });
  yield put({type: ADD_MY_PLAYLIST, payload: roundHerePlaylist.id});

  yield setupSpotifyPlaybackSDK(authorisation.accessToken);
}

function* setupSpotifyPlaybackSDK(accessToken){
  // seperate this please.
  const {Player} = yield waitForSpotifyWebPlaybackSDKToLoad();
  console.log("The Web Playback SDK has loaded.", Player);
  
  const sdk = new Player({
    name: "Label Search Connect",
    volume: 1.0,
    getOAuthToken: callback => { callback(accessToken); }
  });


  
  sdk.addListener('ready', (d) => {
    console.log('Ready with Device ID', d.device_id);
    window.localStorage.setItem('deviceId', d.device_id)
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