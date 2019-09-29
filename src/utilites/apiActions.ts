import axios from 'axios'
import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'

class ApiAction {

  private instance;
  private static baseUrl = `https://api.spotify.com/v1/`;

  constructor() {
    this.instance = axios.create();
    this.instance.interceptors.request.use(this.requestInterceptor);
  }

  requestInterceptor = (config) => {

    const accessToken = self.window.localStorage.getItem('accessToken');

    config.headers = {
      Authorization: `Bearer ${accessToken}`
    }
    return config;
  }

  searchLabel = async (searchTerm, url)=> {

    const newRequest = `${ApiAction.baseUrl}search?q=${encodeURIComponent("label:" + searchTerm)}*&type=album&offset=0&limit=20&next`;
    const finalUrl = url ? url : newRequest;
    return await this.instance.get(finalUrl);
    
  }


  getAlbums = async (albumsIds)=> {

    if(albumsIds.length < 1){
      return;
    }

    const url = `${ApiAction.baseUrl}albums/?ids=${albumsIds.join(",")}`;
    return await this.instance.get(url);

  }

  playTrack = async (trackId) => {
    const url = `${ApiAction.baseUrl}me/player/play?device_id=${window.localStorage.getItem('deviceId')}`;
    return await this.instance.put(url, {
      'context_uri': `spotify:album:${trackId}`,
      'offset': {'position': 0}
    });
  }

  callMeEndpoint = async () => {
      return this.instance.get(`${ApiAction.baseUrl}me`)
  }
    
  getMyPlaylist = async (url?: string) => {
    const playlistUrl = url ? url : `${ApiAction.baseUrl}me/playlists?limit=50&next`;
    return this.instance.get(playlistUrl);
  }

  getAvailableDevices = async () => {
    return this.instance.get(`${ApiAction.baseUrl}me/player/devices`)
  }

  createPlaylist = async (userId) => {
    return this.instance.post(`${ApiAction.baseUrl}users/${userId}/playlists`, {
      name: 'RoundHere...'
    });
 
  }

  addToPLaylist = (songURI, playlistId) => {
    return this.instance.post(`${ApiAction.baseUrl}playlists/${playlistId}/tracks?uris=${songURI}`)
  }

}


const apiAction = new ApiAction();
export default apiAction;