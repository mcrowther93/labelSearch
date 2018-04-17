import axios from 'axios'

class ApiAction {

    private instance;
    private accessToken;
    private static baseUrl = `https://api.spotify.com/v1/`;

    public ApiAction(){
        this.instance = axios.create();
        this.instance.interceptors.request.use(this.requestInterceptor);
        this.instance.interceptors.response(this.requestInterceptor);
    }

    requestInterceptor = (req) => {

    }

    responseInterceptor = (response) => {

    }

    searchLabel(accessToken, searchTerm, url) {

        let response = null;
        const finalUrl = url ? url : `${ApiAction.baseUrl}/search?q=label:"${encodeURIComponent(searchTerm)}"&type=Album&offset=0&limit=20&next`
      
        return this.instance.get(finalUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      
      }

}