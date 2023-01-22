import React from 'react';
import s from './volumeindicator.module.css'

interface Props {
        volume: number,
}

export default function Component( props: Props ) {

        return <>
                <div className={s.container}>
                        <p>{props.volume}</p>
                </div>
        </>
} 