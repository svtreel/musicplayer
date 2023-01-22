import React from 'react';
import s from './artist.module.css'

interface Props {
        text: string;
        colour: string | null;
}

export default function Component( props: Props ) {

        const style = props.colour
                ? { color: props.colour }
                : { }

        return <>
                <p className={ s.artist } style = { style }>
                       { props.text }
                </p>
        </>
}