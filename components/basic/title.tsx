import React from 'react';
import s from './title.module.css'

interface Props {
    text: string | null;
    connecting: boolean | null;
    colour: string | null;
}

export default function Component({ text, connecting, colour }: Props ) {
    const styleofText = connecting 
                                    ? { color: "#888" } 
                                    : colour 
                                        ? { color: colour } 
                                        : {}
    return <>
        <p 
            className = { s.title } 
            style = { styleofText }>
                { text }
        </p>
    </> 
}
