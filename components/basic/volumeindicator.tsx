// @ts-nocheck
import React, { useEffect, useState } from 'react';
import s from './volumeindicator.module.css'

interface Props {
        volume: number,
        action: Function
}

export default function Component( props: Props ) {

        const [ time, setTime ] = useState<number>( 3 )
        const [ fadeout, setFadeout ] = useState<number>( 0 )
        const [ stylesForOverlay, setStylesForOverlay ] = useState<object>( { opacity: "1" } )



        useEffect( ( ) => {
                const countDown = setInterval( async ( ) => {

                        setTime( time -1 )

                        setFadeout( 
                                0
                        )
                        setStylesForOverlay( { opacity: fadeout } )
                }, 1000);
                return () => clearInterval( countDown )
        })

        if ( time < 0 ) {
                props.action( false )
        }

        return <>
                <div className={ s.container } style={ stylesForOverlay }>
                <div className={ s.circle_diagram } 
                        style={ { ['--percent']: props.volume }}>
                        <div className = { s.text }>{ props.volume }</div>
                </div>
                
                </div>
        </>
} 