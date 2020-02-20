import React from 'react'

import { GOOGLE_MAPS_KEY } from '../config'

import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'

const MyMapContainer = ({google, lat, lon: lng, children, locations}) =>
    <Map google={google}
        zoom={14}
        style={{width: '100%', height: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        center={{lat, lng}}
        mapTypeControl={false}
        scaleControl={false}
        fullscreenControl={false}
        streetViewControl={false}
        zoomControl={false}
    >
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
