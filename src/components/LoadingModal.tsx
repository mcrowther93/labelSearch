import * as React from "react";
import * as ReactDOM from "react-dom";

this.el = document.createElement('div');

export default () => {
    return ReactDOM.createPortal(
        <div style={{    position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: '#3a3a3a'}} className={"loadingModal"}>
        ... spinnnyy ...
    </div>,
    document.body
    )
}


