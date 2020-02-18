import React from 'react'
export const Battery = ({ batteryLevel, chargeLimit }) =>
    <div style={{ height: 30, padding: 2, border: '2px solid black' }}>
        <div style={{
            display: 'inline-block',
            width: `${batteryLevel}%`,
            height: '100%',
            background: batteryLevel < 20 ? '#f00' : batteryLevel < chargeLimit ? '#ffbc00' : '#0f0'
        }}></div>
        <div style={{
            display: 'inline-block',
            width: `${chargeLimit - batteryLevel}%`,
            height: '100%',
            borderRight: '1px solid black'
        }}></div>
    </div>
