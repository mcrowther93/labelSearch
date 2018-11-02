
import * as React from "react";
import { connect } from 'react-redux'
import { viewDevices, IDevice, setActiveDevice } from '../../actions/Devices'

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

    onItemClick = (ev) => {

        debugger;
        const selectedDevice: any = this.props.devices.availableDevices.filter(d => d.name === ev.target.innerText)

        self.window.localStorage.setItem('deviceId', selectedDevice[0].id)
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
            <div className={'sicky devices'}>
            
                {
                    availableDevices.map((devices, key) => {
                        return <div onClick={this.onItemClick} key={key}> {devices.name} </div>
                    })
                }

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
