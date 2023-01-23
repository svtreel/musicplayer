import s from './songprogress.module.css'
import React, {useRef} from 'react'

interface Props {
        progress : number;
        songlength: number;
        colourPalette: 
                {    
                        vibrant: string;
                        lightvibrant: string;
                        darkvibrant: string;
                        darkvibrantlight: string;
                        muted: string;
                        lightmuted: string;
                        darkmuted: string;
                }
        tidal: boolean;
}

export default function Component( props: Props ) {

        const { progress = 0 } = props;

        const rprogressbarid = useRef( null ); 

        const calclength = ( value: number ) => {
                const minutes = Math.floor( value / 60 );
                value = value % 60; 
                return `${ minutes }:${ value < 10 ? '0' : ''}${ value }`;
        }

        const styleWrapper = props.colourPalette.darkmuted
                ? { backgroundColor: props.colourPalette.darkmuted }
                : {}
        const stylerprogressbarid = props.colourPalette.lightvibrant
                ? { 
                        width: props.progress + "%", 
                        backgroundColor: props.colourPalette.lightvibrant,
                }
                : {} 
        const styleknob = props.colourPalette.muted
                ? { backgroundColor: props.colourPalette.muted,
                
                        borderTop: "1px solid " + props.colourPalette.lightmuted, }
                : {} 

        return <>
                <div className = { s.container }>
                        <div 
                                className       = { s.wrapper }
                                style           = { styleWrapper } >

                                { props.tidal == false && <> 
                                        <p>
                                                { calclength( props.songlength ) }
                                        </p>
                                </>}
                                <div  
                                        ref             = { rprogressbarid } 
                                        className       = { s.progress }  
                                        style           = { stylerprogressbarid }>
                                        <div 
                                                className       = { s.knob }
                                                style           = { styleknob }>
                                        </div>
                                </div>
                                <div 
                                        className = { s.knob2 }>
                                </div>
                                <div 
                                        className = { s.knob3 }>
                                </div>
                        </div>
                </div>
                </>
}