import React, { useContext } from 'react'

import HomeContext from '../context/HomeContext'
import MyMap from './MyMap'
import Eta from './Eta'
import { Battery } from './Battery'

const NotHome = ({state, locations}) => {
    const home = useContext(HomeContext)
    return <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, position: 'relative' }}>
            <MyMap lat={state.state.drive.latitude} lon={state.state.drive.longitude} locations={locations || []}>
            </MyMap>
        </div>
        <div style={{ height: 100, display: 'flex', alignItems: 'center' }}>
            <div style={{width: '100%'}}>
                <Eta home={home.info.address} lon={state.state.drive.longitude} lat={state.state.drive.latitude} />
            </div>
            <div style={{width: 50, padding: 20}}>
                <Battery batteryLevel={state.state.charge.battery_level} chargeLimit={state.state.charge.charge_limit_soc} />
            </div>
        </div>
    </div>
}

export default NotHome
