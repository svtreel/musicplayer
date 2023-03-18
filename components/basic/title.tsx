import React, { useRef, useEffect, useState } from "react";
import s from './title.module.css'

interface Props {
    text: string;
    service: string;
    onswitch: boolean;
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
}

export default function Component( props: Props ) {

    const col1 = props.service !== "Capture" ? props.colourPalette.lightvibrant : "rgb(121,121,121)"
    const col2 = props.service !== "Capture" ? props.colourPalette.muted : "rgb(233,233,233)"
    const col3 = props.service !== "Capture" ? props.colourPalette.vibrant : "rgb(111,111,111)"
    const col4 = props.service !== "Capture" ? props.colourPalette.lightvibrant : "rgb(121,121,121)"
    
    const titleHeight = useRef(null);
    const [isOversize, setOversize] = useState<boolean>(false);
    const [isSize, setSize] = useState<number>(0);

    useEffect( ( ) => {

        const timeout = setTimeout( async ( ) => {

            setSize( titleHeight.current.clientHeight )

            if ( isSize > 130 ) {
                setOversize( true )
            } else {
                setOversize( false )
            }

        }, 1000 );
    }, [ props.text ]);


    const getStyles = () => {
        const styleofText = {
            "backgroundImage": "linear-gradient(116deg, "+ col1 +","+ col2 +", "+ col3 +", "+ col4 +")"
        }

        return styleofText
        
    }

    return <>
        {/* { isOversize === true && <> 
            <p>
            asd
            </p>
        </> } */}

            
        <div className = { s.titlewrapper }>
            <div>
                { props.onswitch === true && <>
                    <p 
                        className = { s.title } 
                        ref = { titleHeight }
                        style = { getStyles() }>
                            { props.text }
                    </p>
                </>}
            </div>
        </div>
    </> 
}
