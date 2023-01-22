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
        service: string | null;
        artwork: string | null; 
        title: string | null;
        title2: string | null;
        serviceIcon: string | null;
        connecting: boolean;
        album: string | null;
        lightmuted: string | null;
        lightvibrant: string | null;
        vibrant: string | null;
        muted: string | null;
        darkvibrant: string | null;
        darkvibrantlight: string | null;
        songLength: number;
        progress: number;
        onswitch: boolean;
        isPause: boolean;
}

export default function Component( props: Props ) {

        return <>
                <div 
                        className = { s.container }>

                        <Title 
                                text            = { props.title }
                                colour          = { props.vibrant ? props.vibrant : null }
                                connecting      = { props.connecting ? true : false }
                        />
                        { props.state != "connecting" && <>
                                <Artist 
                                        text    = { props.artist }
                                        colour  = { props.lightmuted ? props.lightmuted : null }
                                />
                                <Album 
                                        text    = { props.album }
                                />
                        </> }
                        { props.progress <= 100 && props.state != "connecting" && props.service != "TuneIn" && <> 
                                <Songprogress 
                                        progress         = { props.progress } 
                                        color            = { null }
                                        muted            = { props.muted } 
                                        vibrant          = { props.vibrant }
                                        lightvibrant     = { props.lightvibrant }
                                        darkvibrant      = { props.darkvibrant }
                                        darkvibrantlight = { props.darkvibrantlight }
                                        lightmuted       = { props.lightmuted }
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