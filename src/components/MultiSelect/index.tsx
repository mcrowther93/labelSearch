
import * as React from "react";
import * as ReactDOM from "react-dom";
import { SelectableItem } from "../SelectableItem";

import './styles.css'

interface IAuthState {
    isHovering: boolean;
    selection: string[]
}

interface IAuthProps {
    style?: React.CSSProperties,
    itemStyle?: React.CSSProperties,
    placeholder?: string;
    isSelected(item): void;
    onHover(item): void
    items: any[],
    canSelectMultiple?: boolean,
    selectedStyle?: React.CSSProperties
    type: 'NORMAL' | 'TAG'



}
/**
 * 
 * 
 * 
 */
export class MultiSelect extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.state = {
            isHovering: false,
            selection: []
        }

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = (item) => {

        const { selection } = this.state;
        const { canSelectMultiple } = this.props;

        const isRemovingItem = selection.includes(item);
        let newSelectionState: string[] = [];

        if (canSelectMultiple)
            newSelectionState = isRemovingItem ? selection.filter(select => select !== item) : selection.concat(item)
        else {
            newSelectionState[0] = item
        }

        this.setState({
            selection: newSelectionState
        })

        this.props.isSelected(newSelectionState);

    }

    render = () => {
        const { selection } = this.state

        let selectionItems = this.props.items;
        if (this.props.type === 'TAG') {
            selectionItems = selectionItems.filter(s => !selectionItems.includes(selection))
        }

        return (
            <div>
                <div style={this.props.style} className={'multiselect-wrapper'}>

                    {selectionItems.map((item, key) => {

                        const style: React.CSSProperties = selection.includes(item) ? this.props.selectedStyle : null;
                        return (
                            <div key={key} className={'multiselect-item'}>
                                <SelectableItem style={{ ...this.props.itemStyle, ...style }} itemId={item} isSelected={this.onSelect}>
                                    {item}
                                </SelectableItem>
                            </div>
                        )
                    })
                    }


                </div>


                {this.props.type === 'TAG' &&

                    <div style={{ marginTop: "10px", display: "flex", flexWrap: 'wrap', flexDirection: "row" }} className={'multiselect-tag'}>
                        {selection.map(s =>
                            <SelectableItem style={{ width: 'fit-content', margin: "10px 5px 0 0", borderRadius: "20px", ...this.props.itemStyle, ...this.props.selectedStyle }}
                                isSelected={this.onSelect} itemId={s}> 
                                <div className={'tag'}>{s} </div>
                            </SelectableItem>
                        )}
                    </div>
                }



            </div>
        )


    }




}