import React from 'react';
import s from './artwork.module.css'
// import Image from "next/image"

interface Props {
  pauseImage: string | null;
  artwork: string | null;
  paused: boolean | null;
  action: Function;
}

export default function Component( props: Props ) {

        return <>
                { props.paused == true && <> 
                        <link
                                href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
                                rel="stylesheet">

                        </link>
                        <div className = { s.container }>
                                <div className="material-icons-outlined" onClick = { (e)=>props.action() }>
                                        pause
                                </div>
                        </div>
                </> }
                { props.artwork != undefined && <>
                        <img 
                                className = { s.artwork }
                                alt = "Artwork"
                                src = { props.artwork } 
                                onClick = { (e)=>props.action() }
                        />
                </> }
        </>
}