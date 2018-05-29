
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux'

interface IAuthState {
    isHovering: boolean;
}

interface IAuthProps {

}

export class Player extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (
         <div>
             wooooaahhh.
        </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        user: state.authorisation,
    }
}

export default connect(mapStateToProps, null)(Player);
