import React, { useEffect, useMemo, useState } from 'react';
import s from './menu.module.css'
import MenuItem from './menuitem'
import Loader from './loader';

interface Props {
    action: Function;
    action2: Function;
    swipeDistance: Function;
}

export default function Component( props: Props ) {

    const [ data, setData ] = useState( [] )
    const [ loading, setLoading ] = useState<boolean>( true )
    const [ show, setShow ] = useState<string>( "playlists" )
    const [ request, setRequest ] = useState<string>(  )

    props.swipeDistance(300)

    useEffect( ( ) => {
        (
            async ( ) => {
                if ( loading === true ) {
                    const url = "/api/get"+ show
                    const r = await fetch( url );
                    const data = await r.json( );
                    setData( data )
                    setLoading( false )
                }
            }
        )()
    }, [ show, loading ] )

    const showUpdate = ( arg: string ) => {
        setData( [ ] )
        setLoading( true )
        setShow( arg )
    }

    useEffect( ( ) => {
        (
            async ( ) => {
                if ( request != undefined ){
                    const url = "http://192.168.0.222:11000" + request
                    const r = await fetch( url );
                    props.action( false )
                    props.action2( false )
                }
            }
        )()
    }, [ request, props ] )

    const getServiceURL = ( el: {id: number, url: string} ) => {
        if ( show == "presets" ){
            return `/Preset?id=${el.id}`
        } else {
            return `${el.url}`
        }
    }


    return <>
        <link
                href    = "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
                rel     = "stylesheet">
        </link>
        <div className={ s.menucontainer }>
            <MenuItem
                label = "Playlists"
                icon = "nightlife"
                colour = "#ed64e6"
                action = { () => showUpdate( "playlists" ) }
            />
            <MenuItem
                label = "Presets"
                icon = "star_rate"
                colour = "#8e6ee6"
                action = { () => showUpdate( "presets" ) }
            />
            <MenuItem
                label = "HDMI"
                icon = "connected_tv"
                colour = "#6ee6ce"
                action = { () => setRequest( "/Preset?id=5" ) }
            />
            <MenuItem
                label = "Off"
                icon = "power_settings_new"
                colour = "#eee"
                action = { props.action }
            />
            <div className = { s.content }>
                { data.length == 0 && <> 
                    <Loader></Loader>
                </>}
                { data.length >= 1 &&  <> 
                    {React.Children.toArray( data.map( ( el : {
                        url: string | null;
                        image: string;
                        id: number | null;
                        name: string;
                    } ) => ( <> 
                        <div 
                            className = { s.selectable }
                            onClick = { ( ) => setRequest( getServiceURL( el ) ) } >
                            <img 
                                className   = { s.selectableImage } 
                                src         = { el.image } >
                                alt         = { el.image }
                            </img>
                            <p> 
                                { el.name } 
                            </p>
                        </div>
                    </> ) ) ) }
                </>}
            </div>
        </div>
    </>
}