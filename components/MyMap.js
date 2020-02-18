import React from 'react'

import { GOOGLE_MAPS_KEY } from '../config'

import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'

const MyMapContainer = ({google, lat, lon: lng, children, locations}) =>
    <Map google={google} zoom={14} initialCenter={{lat, lng}}>
        <Marker
        name={'Car'}
        position={{lat, lng}} />
        {locations.map((l, i) => <Marker
            key={`location_marker_${i}`} 
            position={{lat: l.latitude, lng: l.longitude}}
            icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 2,
                strokeColor: 'red',
            }}
            />)}
        {children}
    </Map>

const MyMap = GoogleApiWrapper({apiKey: GOOGLE_MAPS_KEY})(MyMapContainer)

export default MyMap
