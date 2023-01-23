import React from 'react';
import s from './title.module.css'

interface Props {
    text: string;
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

    const col1 = props.colourPalette.lightvibrant
    const col2 = props.colourPalette.muted
    const col3 = props.colourPalette.vibrant

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
