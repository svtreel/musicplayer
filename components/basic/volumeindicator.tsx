// @ts-nocheck
import React, { useEffect, useState } from 'react';
import s from './volumeindicator.module.css'

interface Props {
        volume: number,
        action: Function
}

export default function Component( props: Props ) {

        const [ time, setTime ] = useState<number>( 1 )

        useEffect( ( ) => {
                const countDown = setInterval(async ( ) => {
                        setTime( time -1 )
                }, 1000);
                return () => clearInterval( countDown )
        })

        if (time <= 0) {
                props.action( false )
                setTime( 3 )
        }

        console.log( "time", time )

        // const first = [ s.half, s.first ];
        // const second = [ s.half, s.second ]

        return <>
        <div className={s.container}>
            <div className={s.circle_diagram} 
                style={ { ['--percent']: props.volume }}>
                <div className = {s.text}>{props.volume}</div>
            </div>
            
        </div>
        </>
} 