import s from './songprogress.module.css'
import React, {useState, useEffect, useRef} from 'react'

interface Props {
        progress : number;
        songlength: number;
        color : string | null;
        muted : string | null;
        vibrant : string | null;
        lightvibrant : string | null;
        darkvibrant : string | null;
        darkvibrantlight : string | null;
        lightmuted : string | null;
        tidal: boolean;
}

export default function Component( props: Props ) {

        const { progress = 0 } = props;

        const color = props.color?props.color:null
        const rprogressbarid = useRef(null);

        // const changeWidth = () => {
        //          if (rprogressbarid != null && rprogressbarid.current && typeof props.progress === 'number'){
        //                 rprogressbarid.current.style.width = props.progress + "%";
        //         }
        // }

        const calclength = ( value: number ) => {
                const minutes = Math.floor( value / 60);
                value = value % 60; 
                return `${ minutes }:${ value < 10 ? '0' : ''}${ value }`;
        }

        const styleWrapper = props.darkvibrantlight
                ? {backgroundColor: props.darkvibrantlight}
                : {}
        const stylerprogressbarid = props.vibrant
                ? {width: props.progress + "%",backgroundColor: props.vibrant}
                : {} 
        const styleknob = props.lightvibrant
                ? {backgroundColor: props.lightvibrant}
                : {} 

        return <>
                <div className={ s.container }>
                        <div 
                                className={ s.wrapper }
                                style= { styleWrapper }>
                                {props.tidal == false && <> 
                                        <p>
                                                { calclength( props.songlength ) }
                                        </p>
                                </>}
                                <div  
                                        ref = { rprogressbarid } 
                                        className = { s.progress }  
                                        style = { stylerprogressbarid }>
                                        <div 
                                                className={ s.knob }
                                                style= { styleknob }>
                                        </div>
                                </div>
                                <div 
                                        className={ s.knob2 }>
                                </div>
                                <div 
                                        className={ s.knob3 }>
                                </div>
                        </div>
                </div>
                </>
}