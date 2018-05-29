
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import {setAuthInfo} from '../../actions/Authorisation'
import {bindActionCreators} from 'redux'

import getQueryParams from '../../utilites/StringToObject'


interface IAuthState {
}

interface IAuthProps {
    setAuthInfo(params): void;
    history: any
}


class Auth extends React.Component<IAuthProps, IAuthState>{

    private spotifyAuth = 'https://accounts.spotify.com/authorize?' + 
   'client_id=b26546b8389b4256b77be170b06bff52&' + 
    'redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&' + 
    'scope=user-read-private%20user-read-email%20user-modify-playback-state%20streaming&' + 
    'response_type=token&' + 
    'state=123';

    constructor(props, state){
        super(props, state);
    }

    componentDidMount() {

        if(self.window.location.href.includes('access_token')){
            const params: any = getQueryParams(self.window.location.hash);
            const accessToken = params.access_token;
            self.window.localStorage.setItem('accessToken', accessToken)
            this.props.setAuthInfo(params);
            this.props.history.push('/');
        }
        else{
            // ask user to reauthenticate.
            self.window.location.href = this.spotifyAuth;
        }
    }


    render(){
        return(
            <div>
                No Authorisated if not redirected please click <div> here </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
      name: state.authorisation
    }
  }

const App2 = connect(null, {setAuthInfo})(Auth);

export default App2;