import React from 'react';
import s from './album.module.css'

interface Props {
  text: string | null;
}

export default function Component( props: Props ) {

        return <>
                <p className = { s.album }>
                        { props.text }
                </p>
        </>
} 