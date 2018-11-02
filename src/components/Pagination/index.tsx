
import * as React from "react";
import * as ReactDOM from "react-dom";
import { SelectableItem } from "./../SelectableItem";
import * as _ from 'lodash'

import './style.css';

interface IAuthState {
    currentStep: number
}

interface IAuthProps {
    style?: React.CSSProperties,
    itemStyle?: React.CSSProperties,
    itemsPerStep: number
    numberOfItems: number,
    next(step): void,
    step: number
}
/**
 * 
 * 
 * 
 */
export default class Pagination extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state)
        this.state = ({
            currentStep: 0
        })
    }


    goToStep = (step) => {
        this.props.next(step)

    }

    next = (ev) => {
        this.props.next(++this.state.currentStep)
    }

    previous = (ev) => {
        this.props.next(--this.state.currentStep)
    }

    componentWillReceiveProps = (nextProps) => {

        this.setState({
            currentStep: nextProps.step,
        })

    }



    render = () => {

        const {currentStep} = this.state;

        const pages = Math.ceil(this.props.numberOfItems / this.props.itemsPerStep);

        return(
            <div className={'pagination-wrapper'}>
          
                {this.props.children}

                      <div className={'pagination-steps'}>

<button className={'pagination-previous'} onClick={currentStep > 0 &&  this.previous} > Previous </button>
{
    _.range(0, pages).map((p, index) => {

        const backgroundColour = p === currentStep  && 'rgb(215, 175, 149)'
        
        return <button style={{backgroundColor: backgroundColour}}  
                onClick={() => this.goToStep(p)}>{p+1}</button>
    })
}
<button className={'pagination-next'}  onClick={currentStep + 1 < pages && this.next} > Next </button>

</div>
            </div>
        )


    }

}
