import React from 'react'
import { Charge } from './Charge'
import { Climate } from './Climate'

const AtHome = ({state, switchingClimate, climateOn, climateOff}) => 
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Climate switchingClimate={switchingClimate} turnOn={climateOn} turnOff={climateOff} inside={state.state.climate.inside_temp} outside={state.state.climate.outside_temp} isOn={state.state.climate.is_climate_on} />
        <Charge chargeLimit={state.state.charge.charge_limit_soc} batteryLevel={state.state.charge.battery_level} state={state.state.charge.charging_state} power={state.state.charge.charger_power} pluggedIn={state.state.charge.charge_port_door_open && state.state.charge.charge_port_latch==='Engaged'} />
    </div>

export default AtHome
