import React from 'react';
import s from './title.module.css'

interface Props {
    text: string;
    service: string;
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


    const styleofText = {
        "backgroundImage": "linear-gradient(116deg, "+ col1 +","+ col2 +", "+ col3 +")",
    }

    return <>
        <p 
            className = { s.title } 
            style = { styleofText }>
                { props.text }
        </p>
    </> 
}
