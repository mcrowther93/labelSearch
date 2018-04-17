
import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactSelect from 'react-select'

interface IAuthState {
    value: string;
}

interface IAuthProps {
    style?: React.CSSProperties,
    placeholder?: string;
    onValueChange(value): void;
}

export class TextBox extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.state = {
            value: ""
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.onValueChange(event.target.value );
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
                style={this.props.style}
            />
        )

    }
}