
import * as React from "react";
import { connect } from 'react-redux'
import { viewDevices, IDevice, setActiveDevice } from '../../actions/Devices'

import {MultiSelect} from '../../components/MultiSelect'
import './style.css'


import * as _ from 'lodash'

interface IAuthState {
    isVisible: boolean,
    devicePlaying: string
}

interface IAuthProps {
    viewDevices(): void
    setActiveDevice(): void
    devices: IDevice
}

class StickyHeader extends React.Component<IAuthProps, IAuthState>{

    constructor(props, state) {
        super(props, state);
        this.state = {
            isVisible: false,
            devicePlaying: ''
        };
    }

    onBannerClick = () => {
        const {isVisible} = this.state

        if(!isVisible){
            this.props.viewDevices();
        }

        this.setState({
            isVisible: !isVisible
        })
    }

    onItemClick = (deviceName) => {

        const selectedDevice: any = this.props.devices.availableDevices.filter(d => {
            return d.name === deviceName[0]
        })

        self.window.localStorage.setItem('deviceId', selectedDevice)
        this.props.setActiveDevice();

    }

    componentWillReceiveProps = (props:IAuthProps) => {
        this.setState({
            devicePlaying: props.devices.activeDevice
        })
    }

    stickyDevices = () => {

        const {devices :{availableDevices}} = this.props
        
        return(
            <div className={'sticky devices'}>
                
                <h3 onClick={this.onBannerClick}>View Devices</h3>
                <img src={'https://vectr.com/mcrowther/a75ktiBOXl.svg?width=597&height=430&select=a75ktiBOXlpage0'} />
                {this.state.isVisible &&

                    <MultiSelect 
                        style={{ maxHeight: "150px", overflowY: "scroll", backgroundColor: "white", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                        itemStyle={{ padding: "5px 5px" }}
                        selectedStyle={{backgroundColor: 'rgb(215, 175, 149)', color: "white"}}
                        isSelected={this.onItemClick}
                        onHover={null}
                        items={availableDevices.map(devices => devices.name)}
                        canSelectMultiple={false}
                        type={'NORMAL'}
                    />
             
                }
                <h3 onClick={this.onBannerClick}>My Labels</h3>
            </div>
        )
    }


    render() {

        return (
            <div>
                {this.stickyDevices()}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        devices: state.devices
    }
}

export default connect(mapStateToProps, { viewDevices, setActiveDevice })(StickyHeader);
