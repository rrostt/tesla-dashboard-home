import React from 'react'

export const Climate = ({ inside, outside, switchingClimate, isOn, turnOn, turnOff }) =>
    <div style={{
        color: switchingClimate ? '#f00' : isOn ? '#9797ff' : '#848383',
        padding: 30
    }} onClick={() => switchingClimate || (isOn ? turnOff() : turnOn())}>
        {inside || '--'}&deg;C / {outside || '--'}&deg;C
    </div>;
