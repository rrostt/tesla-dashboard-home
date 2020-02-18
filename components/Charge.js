import React from 'react'
import { FaPlug } from 'react-icons/fa'
import { Battery } from "./Battery"

// eslint-disable-next-line no-unused-vars
export const Charge = ({ batteryLevel, chargeLimit, state, power, pluggedIn }) => <div style={{ width: 200 }}>
    <Battery batteryLevel={batteryLevel} chargeLimit={chargeLimit} />
    <div style={{ textAlign: 'center', marginTop: 8, fontSize: 16 }}>{pluggedIn && <><FaPlug /> {power}W</>}</div>
</div>
