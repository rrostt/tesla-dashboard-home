import React, { useState, useEffect } from 'react'
import AtHome from '../components/AtHome'
import NotHome from '../components/NotHome'
import HomeContext from '../context/HomeContext'

import { API_URL, VIN, HOME_ADDRESS, HOME_LATITUDE, HOME_LONGITUDE } from '../config'

const myHome = {
    latitude: HOME_LATITUDE,
    longitude: HOME_LONGITUDE,
    address: HOME_ADDRESS
}

const isHome = ({longitude, latitude}) => longitude.toFixed(4) === myHome.longitude.toFixed(4) && latitude.toFixed(4) === myHome.latitude.toFixed(4)

const useCarState = () => {
    const [carState, setCarState] = useState(null)
    const [loading, setLoading] = useState(false)
    const [switchingClimate, setSwitchingClimate] = useState(false)

    const update = () =>
        fetch(`${API_URL}/latest?vin=${VIN}`)
            .then(response => response.json())
            .then(state => setCarState(state))
            .catch(() => {})

    useEffect(() => {
        setLoading(true)
        update()
            .then(() => setLoading(false))

        const timeout = setInterval(update, 60000)
        return () => clearInterval(timeout)
    }, [])

    const issueClimateCommand = ({ url, updateUrl, condition }) =>
        fetch(url)
            .then(async () => {
                let count = 4
                while(count-- > 0) {
                    const climate = await fetch(updateUrl).then(response => response.json())
                    if (condition(climate)) {
                        setCarState({...carState, state: {...carState.state, climate}})
                        break
                    }

                    await new Promise((resolve) => setTimeout(resolve, 2500))
                }
            })
            .catch((e) => { console.log('error issuing command', e) })    // silent error

    const climateOn = () => {
        setSwitchingClimate(true)
        issueClimateCommand({
            url: `${API_URL}/vehicle/climateOn`,
            updateUrl: `${API_URL}/vehicle/climate`,
            condition: climate => climate.is_climate_on
        }).then(() => setSwitchingClimate(false))
    }

    const climateOff = () => {
        setSwitchingClimate(true)
        issueClimateCommand({
            url: `${API_URL}/vehicle/climateOff`,
            updateUrl: `${API_URL}/vehicle/climate`,
            condition: climate => !climate.is_climate_on
        }).then(() => setSwitchingClimate(false))
    }

    return {
        state: carState,
        loading,
        climateOn,
        climateOff,
        switchingClimate
    }
}

const Index = () => {
    const carState = useCarState()
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const since = Date.now() - 3600000
        fetch(`${API_URL}/locations?vin=${VIN}&since=${since}`)
            .then(response => response.json())
            .then(data => setLocations(data))
    }, [])

    return <div>
        <HomeContext.Provider value={{ info: myHome, isHome }}>
            {carState.loading && <>Loading</>}
            {carState.state && <>
                {isHome({longitude: carState.state.state.drive.longitude, latitude: carState.state.state.drive.latitude}) ?
                <AtHome
                    state={carState.state}
                    switchingClimate={carState.switchingClimate}
                    climateOn={carState.climateOn}
                    climateOff={carState.climateOff}/> : 
                <NotHome state={carState.state} locations={locations} />}
            </>}
        </HomeContext.Provider>
        <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          font-size: 26px;
        }
        `}</style>
    </div>
}

export default Index
