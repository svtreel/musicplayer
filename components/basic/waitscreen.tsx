import s from './waitscreen.module.css'
import Loader from './loader'
import React from 'react'

export default function Component( props: object ) {

        return <> 
                <div className = { s.container }>
                        <Loader/>      
                </div>
        </>
}