import React, { useEffect, useState } from 'react';
import s from './artwork.module.css'

interface Props {
  pauseImage: string | null;
  artwork: string | null;
  paused: boolean;
  action: Function;
  progress: number | null;
}

export default function Component( props: Props ) {

        const [show, setShow] = useState<boolean>(false)
        const [style, setstyle] = useState<object>()

        useEffect( ( ) => {
                const to = setTimeout( async ( ) => {
                        setShow(true)
                        if ( props.progress < 90 ) {
                                setstyle({"opacity": "0.2"})
                        } else {
                                setstyle({"opacity": "0"})
                        }
                        
                }, 1000 );

                return () => clearInterval( to );
        }, );

        const IconForPause = <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
                rel="stylesheet">
        </link>;

        return <>

                {IconForPause}

                { props.paused == true && <>
                        <div className = { s.container }>
                                <div 
                                        className = "material-icons-outlined" 
                                        onClick = { ( e ) => props.action( ) }>
                                        pause
                                </div>
                        </div>
                </> }
                { props.artwork != undefined && <>
                        <img 
                                className = { s.artwork }
                                alt = "Artwork"
                                src = { props.artwork } 
                                onClick = { ( e ) => props.action( ) }
                        />

                                
                                        <img 
                                                className = { s.artworkBG }
                                                style = { style }
                                                alt = "Artwork"
                                                src = { props.artwork } 
                                                onClick = { ( e ) => props.action( ) }
                                        />


                </> }
        </>
}