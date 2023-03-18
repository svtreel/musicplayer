import React from 'react';
import s from './artwork.module.css'

interface Props {
  pauseImage: string | null;
  artwork: string | null;
  paused: boolean;
  action: Function;
}

export default function Component( props: Props ) {

        return <>
                <link
                        href = "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
                        rel = "stylesheet" >
                </link>
                { props.paused == true && <>   
                        <div className = { s.container }>
                                <div className = "material-icons-outlined" onClick = { ( e ) => props.action( ) }>
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
                        <div >
                                <img 
                                        className = { s.artworkBG }
                                        alt = "Artwork"
                                        src = { props.artwork } 
                                        onClick = { ( e ) => props.action( ) }
                                />
                        </div>
                </> }
        </>
}