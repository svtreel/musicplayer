import React from 'react'
import styles from './loader.module.css'

export default function Loader( props: object ) {

    return <>
        <div className={styles.loader+" loadingspinnerIdentifier"}></div>
    </>
}