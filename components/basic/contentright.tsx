import s from './contentright.module.css'
import Loader from './loader'
import Artist from './artist'
import Album from './album'
import Title from './title'
import Songprogress from './songprogress'
import React from 'react'

interface Props {
        artist: string ;
        state: string | null;
        service: string;
        artwork: string | null; 
        title: string;
        title2: string | null;
        serviceIcon: string | null;
        connecting: boolean;
        fadeout: boolean;
        album: string | null;
        colourPalette: 
                {    
                        vibrant: string;
                        lightvibrant: string;
                        darkvibrant: string;
                        darkvibrantlight: string;
                        muted: string;
                        lightmuted: string;
                        darkmuted: string;
                }
        songLength: number;
        progress: number;
        onswitch: boolean;
        isPause: boolean;
}

export default function Component( props: Props ) {

        const fadeoutValue = props.fadeout === true ? "1" : "0"

        return <>

                        <div 
                                className = { s.container }>

                                <Title 
                                        text            = { props.title }
                                        colourPalette   = { props.colourPalette }
                                        service         = { props.service }
                                />
                                { props.state != "connecting" && <>
                                        <Artist 
                                                text    = { props.artist }
                                                colour  = { props.colourPalette.lightmuted }
                                        />
                                        <Album 
                                                text    = { props.album }
                                        />
                                </> }
                                { props.progress <= 100 && 
                                        props.state != "connecting" && 
                                        props.service != "TuneIn" && 
                                        props.service != "Capture" && <> 

                                        <Songprogress 
                                                progress         = { props.progress } 
                                                colourPalette    = { props.colourPalette } 
                                                songlength       = { props.songLength }
                                                tidal            = { props.service != "TidalConnect" ? true : false }
                                        />
                                </> }
                                { props.state == "connecting" && props.service != "Capture" && <> 
                                        <Loader/>
                                </> }
                        </div>

        </>
}