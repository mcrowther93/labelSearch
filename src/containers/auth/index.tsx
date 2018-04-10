
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import {incrementCounter} from '../../actions'
import {bindActionCreators} from 'redux'

interface IAuthState {
}

interface IAuthProps {
    incrementCounter(): void;
    name: number;

}


class Auth extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state){
        super(props, state);
    }


    render(){
        const {incrementCounter, name} = this.props;
        debugger;
        return(
            <div onClick={incrementCounter}>
                {name}
            </div>
        );
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        incrementCounter,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
      name: state.appReducer.counter
    }
  }

const App2 = connect(mapStateToProps, mapDispatchToProps)(Auth);
export default App2;