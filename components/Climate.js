import React from 'react'
import { GiCampfire } from 'react-icons/gi'
import { FaHourglassHalf } from 'react-icons/fa'

export const Climate = ({ inside, outside, switchingClimate, isOn, turnOn, turnOff }) =>
    <div style={{
        position: 'relative',
        color: isOn ? '#009fff' : '#848383',
        opacity: switchingClimate ? '30%' : '100%',
        fontSize: isOn ? '125%' : '100%',
        fontWeight: isOn ? 'bold' : 'normal',
        padding: 30
    }} onClick={() => switchingClimate || (isOn ? turnOff() : turnOn())}>
        {inside || '--'}&deg;C / {outside || '--'}&deg;C
        <div style={{
                position: 'absolute',
                top: -70,
                fontSize: 68,
                left: 0,
                right: 0,
                width: '100%',
                textAlign: 'center'
        }}>
            { (isOn && !switchingClimate) && <GiCampfire /> }
            { switchingClimate && <FaHourglassHalf /> }
        </div>
    </div>;
