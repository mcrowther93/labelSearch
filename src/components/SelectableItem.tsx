
import * as React from "react";
import * as ReactDOM from "react-dom";

interface IAuthState {
    isHovering: boolean;
}

interface IAuthProps {
    style?: React.CSSProperties,
    placeholder?: string;
    isSelected?:(item) => void;
    itemId: any
}

export class SelectableItem extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.state = {
            isHovering: false
        }
    }
    

    handleChange = (value) => {
        this.setState({
            isHovering: !this.state.isHovering
        })
    }

    onClick = () => {
        this.props.isSelected && this.props.isSelected(this.props.itemId)
    }


    render() {
        return (
            <div onClick={this.onClick} 
                className={'selectablable-item'} 
                style={this.props.style}>
                {this.props.children}
            </div>

        )

    }
}