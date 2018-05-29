import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'
import { COUNT_DECREMENT } from '../actions'
import { SEARCH_FAILED, searchSuccess, BEGIN_SEARCH, beginSearch } from '../actions/Search'
import { addRecordLabel } from '../actions/RecordsLabels'
import Axios from 'axios';
import ApiAction from '../utilites/apiActions';

import axios from 'axios'
import * as _ from 'lodash'
import { cloneElement } from 'react';

export function* search() {
  const { searchTerm } = yield select((state: any) => state.search);
  const { accessToken } = yield select((state: any) => state.authorisation);

  let dto = []
  let albumDetailsResponse = [];
  let offset = 0;
  let bStop = true;
  let nextUrl = null;


  const apiActions = new ApiAction();

  do {
    const response: any = yield apiActions.searchLabel(searchTerm, nextUrl);
    dto.push(...response.data.albums.items)
    nextUrl = response.data.albums.next
    const trackIds = response.data.albums.items.map(track => track.id);

    if (trackIds.length > 0) {
      const res = yield call(getFullAlbumDetails, accessToken, trackIds);
      albumDetailsResponse.push(...res.data.albums);
    }

  } while (nextUrl && dto.length < 100);


  const allArtistIds = [];

  const albumDetails: any[] = albumDetailsResponse.map(albumDetail => {
    const albumArtistsIds = albumDetail.artists.map(artist => artist.id);
    allArtistIds.concat({...albumArtistsIds});

    return ({
      name: albumDetail.name,
      images: albumDetail.images ? albumDetail.images[1] : null,
      label: albumDetail.label,
      id: albumDetail.id,
      artistIds: albumArtistsIds,
      tracks: albumDetail.tracks.items.map(track => {
        return ({
          id: track.id,
          name: track.name,
          explicit: track.explicit,
        })
      })
    })
  });

  const recordLabels = _.uniqBy(albumDetails, 'label').map(ad => ad.label);
  const uniqueIds = _.uniq(allArtistIds);


  yield put(addRecordLabel(recordLabels));
  yield put(searchSuccess(albumDetails));
}

function getFullAlbumDetails(accessToken, albumsIds: string[]) {

  let response = null;
  return axios.get(`https://api.spotify.com/v1/albums/?ids=${albumsIds.join(",")}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })

}


function getArtistDetails(accessToken, artistIds: string[]) {

  let response = null;
  return axios.get(`https://api.spotify.com/v1/artists/?ids=${artistIds.join(",")}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })

}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* beginSearchSaga() {
  yield takeLatest(BEGIN_SEARCH, search)
}