import React, { useEffect, useState } from 'react';
import s from './artwork.module.css'

interface Props {
  pauseImage: string | null;
  artwork: string | null;
  paused: boolean;
  action: Function;
}

export default function Component( props: Props ) {

        const [show, setshow] = useState<boolean>(false);

        useEffect( ( ) => {

                const tO = setTimeout( async ( ) => {

                        setshow( true )
                                
                }, 2000 );
        }, );

        const switchstyles = (v: number) => {
                if ( v === 1 ) {
                        return { 
                                "opacity": "0.2",
                                "transition": "12s"
                        }
                } else {
                        return {
                                "opacity": "0",
                                "transition": "0s"
                        }
                }
        }
        const checkforswitch = () => {
                return show === true ? switchstyles(1) : switchstyles(2)
        }
        

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
                        { show !== false && <>
                                        <img 
                                                className = { s.artworkBG }
                                                alt = "Artwork"
                                                style = { checkforswitch() }
                                                src = { props.artwork } 
                                                onClick = { ( e ) => props.action( ) }
                                        />

                        </>}
                </> }
        </>
}