import React, { useEffect, useMemo, useState } from 'react';
import s from './menu.module.css'
import MenuItem from './menuitem'
import Loader from './loader';

interface Props {
        action: Function;
}

export default function Component( props: Props ) {

    const [ data, setData ] = useState( [] )
    const [ show, setShow ] = useState( "presets" )

    console.log("/api/get"+ show)

    useEffect( ( ) => {
        (
            async ( ) => {
                console.log( "data" )
                const url = "/api/get"+ show
                const r = await fetch( url );
                const data = await r.json( );
                setData( data )
                console.log( data )
            }
        )()
    }, [ show ] )


    return <>
        <link
                href    = "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
                rel     = "stylesheet">
        </link>
        <div className={ s.menucontainer }>
            <MenuItem
                label = "Music"
                icon = "nightlife"
                colour = "#ed64e6"
                action = { props.action }
            />
            <MenuItem
                label = "Presets"
                icon = "star_rate"
                colour = "#8e6ee6"
                action = { props.action }
            />
            <MenuItem
                label = "HDMI"
                icon = "connected_tv"
                colour = "#6ee6ce"
                action = { props.action }
            />
            <MenuItem
                label = "Radio"
                icon = "radio"
                colour = "#e6d86e"
                action = { props.action }
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
                    {React.Children.toArray( data.map( ( el ) => ( <> 
                        <div className={s.selectable}>
                            <img className={s.selectableImage} src = { el.image } ></img>
                            <p> { el.name } </p>
                        </div>
                    </> ) ) ) }
                </>}
            </div>
        </div>
    </>
}