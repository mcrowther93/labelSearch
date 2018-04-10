
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'
import {incrementCounter, decrementCounter} from '../../actions'
import {bindActionCreators} from 'redux'

interface IAuthState {
}

interface IAuthProps {
    incrementCounter(): void;
    decrementCounter(): void;
    name: number;

}


class Auth extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state){
        super(props, state);
    }


    render(){
        const {decrementCounter, name, incrementCounter} = this.props;
        debugger;
        return(
            <div>
            <div onClick={decrementCounter}> Decrease </div>
            <div onClick={incrementCounter}> Increase </div>

                {name}

                </div>
        );
    }

}

function mapStateToProps(state) {
    return {
      name: state.appReducer.counter
    }
  }

const App2 = connect(mapStateToProps, {incrementCounter,decrementCounter})(Auth);

export default App2;