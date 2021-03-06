import React, { useState, useEffect } from 'react'

import { API_URL } from '../config'

import { cacheFetch } from '../hooks/useCacheFetch'

const useEta = ({lon, lat, home}) => {
    const [eta, setEta] = useState(-1)

    const updateEta = () => {
        cacheFetch({
            url: `${API_URL}/eta?origin=${lat},${lon}&destination=${encodeURI(home)}`,
            timeout: 1000*60*10
        })
            .then(eta => console.log('got eta') || setEta(eta.seconds))
    }

    useEffect(() => {
        updateEta()

        const timeout = setInterval(() => {
            updateEta()
        }, 6000) // update ETA every 1 minutes when out and about

        return () => clearInterval(timeout)
    }, [])

    return eta
}

const pad = (s, l, c) => ([...Array(l)].map(() => c).join('') + s).substr(s.toString().length)

const Eta = ({lon,lat, home}) => {
    const eta = useEta({ lon, lat, home })

    const minutes = s => pad(Math.floor(s/60)%60, 2, '0')
    const hours = s => Math.floor(s/3600)

    return <div style={{ textAlign: 'center' }}>
        { eta < 0 && <>N/A</> }
        { eta === 0 && <>Home!</> }
        { eta > 0 && <>Home in {hours(eta)}:{minutes(eta)}</> }
    </div>
}

export default Eta
