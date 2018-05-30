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

    const newRequest = `${ApiAction.baseUrl}search?q=${encodeURIComponent("label:" + searchTerm)}&type=Album&offset=0&limit=20&next`;
    const finalUrl = url ? url : newRequest;
    return await this.instance.get(finalUrl);
    
  }


  getAlbums = async (albumsIds)=> {

    if(albumsIds.length < 1){
      return;
    }

    const url = `https://api.spotify.com/v1/albums/?ids=${albumsIds.join(",")}`;
    return await this.instance.get(url);

  }

  playTrack = async (trackId) => {
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${window.localStorage.getItem('deviceId')}`;
    return await this.instance.put(url, {
      'context_uri': `spotify:album:${trackId}`,
      'offset': {'position': 0}
    });
  }

  callMeEndpoint = async () => {
      return this.instance.get('https://api.spotify.com/v1/me')
  }
    

}


const apiAction = new ApiAction();
export default apiAction;