import axios from 'axios'
import { takeEvery, put, call, take, select, takeLatest } from 'redux-saga/effects'

async function getAccessToken() {
  const lol = await select((state: any) => state.authorisation);

  return lol;
}

class ApiAction {

  private instance;
  private accessToken;
  private static baseUrl = `https://api.spotify.com/v1/`;

  constructor() {
    this.instance = axios.create();
    this.instance.interceptors.request.use(this.requestInterceptor);
    this.instance.interceptors.response.use(this.requestInterceptor);
  }

  requestInterceptor = (config) => {

    const accessToken = self.window.localStorage.getItem('accessToken');

    config.headers = {
      Authorization: `Bearer ${accessToken}`
    }


    return config;
  }

  responseInterceptor = (response) => {

  }

  searchLabel = async (searchTerm, url)=> {

    const newRequest = `${ApiAction.baseUrl}search?q=${encodeURIComponent("label:" + searchTerm)}&type=Album&offset=0&limit=20&next`;
    const finalUrl = url ? url : newRequest;
    return await this.instance.get(finalUrl);
    
  }
}

export default ApiAction;