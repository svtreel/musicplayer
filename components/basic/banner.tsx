import React from 'react';
import s from './banner.module.css'

interface Props {
        text: string;
}

export default function Component( props: Props ) {

        return <>
                <div className={ s.container }>
                        <p className={ s.warn }>
                                ⚠
                        </p>
                        <p className={ s.text }>
                                { props.text }
                        </p>
                        </div>
                        <div className={ s.fade } > 
                </div>
        </>
}