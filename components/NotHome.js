import React, { useContext } from 'react'

import HomeContext from '../context/HomeContext'
import MyMap from './MyMap'
import Eta from './Eta'

const NotHome = ({state, locations}) => {
    const home = useContext(HomeContext)
    return <div>
        <MyMap lat={state.state.drive.latitude} lon={state.state.drive.longitude} locations={locations || []}>
        </MyMap>
        <Eta home={home.info.address} lon={state.state.drive.longitude} lat={state.state.drive.latitude} />
    </div>
}

export default NotHome
