
import * as React from "react";
import * as ReactDOM from "react-dom";

interface IAuthState {
    isHovering: boolean;
}

interface IAuthProps {
    style?: React.CSSProperties,
    placeholder?: string;
    isSelected(album): void;
    itemId: number
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

    renderOnHover = () => {
        this.props.isSelected(this.props.itemId)
    }

    render() {
        const {isSelected } = this.props;
        return (
            <div onClick={this.renderOnHover} className={'album'} style={null}>
                {this.props.children}
            </div>

        )

    }
}