import React from 'react'

export const Climate = ({ inside, outside, switchingClimate, isOn, turnOn, turnOff }) =>
    <div style={{
        color: switchingClimate ? '#f00' : isOn ? '#009fff' : '#848383',
        fontSize: isOn ? '125%' : '100%',
        fontWeight: isOn ? 'bold' : 'normal',
        padding: 30
    }} onClick={() => switchingClimate || (isOn ? turnOff() : turnOn())}>
        {inside || '--'}&deg;C / {outside || '--'}&deg;C
    </div>;
