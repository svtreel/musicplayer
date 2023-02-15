import Waitscreen from '../../components/basic/waitscreen'
import Playercontainer from '../../components/basic/playercontainer'
import useSwipeDetection from '../../components/helper/useSwipeDetection';
import Vibrant from 'node-vibrant';

import React, { useState, useEffect, useMemo } from 'react'
import { ImageSource } from 'node-vibrant/lib/typing';
import Menu from '../../components/basic/menu';
import Volumeindicator from '../../components/basic/volumeindicator';
import { Empty } from 'antd';

class ColourPalette {
        public colors: any;
        constructor( ) {
            this.colors = { };
        }

        appendValueToList( type: string, value: any ) {
            this.colors[ type ] = value;
        }

        getColors( ) {
            return this.colors;
        }
}

export default function Home( ) {

        const shutDownWhenStopSeconds = 120

        const [ data, setdata ] = useState(
                {
                        artist: "n/A",
                        image: "n/A",
                        length: 0,
                        quality: "n/A",
                        seconds: 0,
                        service: "n/A",
                        serviceIcon: "n/A",
                        state: "n/A",
                        title1: "n/A",
                        title2: "n/A",
                        title3: "n/A",
                        volume: 0,
                        error: undefined
                        }
                )
        const [ context, setContext ] = useState<string>( "music" )
        const [ isPause, setisPause ] = useState( false )
        const [ increasedTopmarginPlayercontainer, setIncreasedTopmarginPlayercontainer ] = useState( false )
        const [ loading, setloading ] = useState( true )
        const [ onswitch, setonswitch ] = useState( false )
        const [ blackout, setBlackout ] = useState( false )
        const [ showStopOverlay, setShowStopOverlay ] = useState( false )
        const [ topMenu, setTopMenu] = useState( false )
        const [ isBeingChecked, setIsBeingChecked ] = useState( false )
        const [ colourPalette, setColourPalette ] = useState( 
                {
                        "vibrant": "rgba( 255, 255, 255, 1 )",
                        "lightvibrant": "rgba( 255, 255, 255, 1 )",
                        "darkvibrant": "rgba( 255, 255, 255, 1 )",
                        "darkvibrantlight": "rgba( 255, 255, 255, 1 )",
                        "muted": "rgba( 255, 255, 255, 1 )",
                        "lightmuted": "rgba( 255, 255, 255, 1 )",
                        "darkmuted": "rgba( 255, 255, 255, 1 )",
                } 
        )
        const [ waitduration, setwaitduration ] = useState<number>( 1300 )
        const [ volumeOverlay, setVolumeOverlay ] = useState( false )
        const [ volumeValue, setVolumeValue ] = useState<number>( 0 )
        const [ fadeout, setFadeout ] = useState<boolean>( false )
        const [ triggerDistance, setTriggerdistance ]   = useState<number>( 150 )

        const progress = useMemo( ( ) => { 
                return updateProgressCalculation( data.length, data.seconds )
        }, [ data.seconds, data.length ] )

        const volumeUpdate = useMemo( ( ) => { 
                return showVolumeChange( data.volume )
        }, [ data.volume ] )

        function showVolumeChange( vol: number ) {
                setVolumeOverlay( true )
                setVolumeValue( vol )
        }
        
        const updateImageOnDemand = useMemo( ( ) => { 

                setonswitch( false )
                setFadeout( false )

                const i = data.image !== "n/A" ? data.image : ""

                const v = new Vibrant( i );
                v.getPalette(( err, palette ) => makePalette( palette ));

        }, [ data.image ] )

        useEffect( ( ) => {

                const refreshInterval = setInterval( async ( ) => {
                                
                                if ( isBeingChecked === false ) {

                                        setonswitch( true )
                                        setFadeout( true )
                                        setIsBeingChecked( true )

                                        const url = "/api/getmeta"
                                        const r = await fetch( url )
                                        const playerdata = await r.json( )

                                        if ( playerdata.data.error === undefined ) {

                                                if ( playerdata.data.service === "Capture" ) {
                                                        setBlackout( true )
                                                } else {
                                                        setBlackout( false )
                                                }
                                                if ( playerdata.data.state === "pause" ) {
                                                        setisPause( true )
                                                } else {
                                                        setisPause( false )
                                                }

                                                setdata( playerdata.data )
                                                setIsBeingChecked( false )
                                                setloading( false )
                                        }

                                }
                }, waitduration );
                return () => clearInterval( refreshInterval );
        }, );

        const myPalette = new ColourPalette( );

        const makePalette = ( palette ) => {
                setonswitch( true )
                setFadeout( true )

                // * Results into:

                // * Vibrant
                // * Muted
                // * DarkVibrant
                // * DarkMuted
                // * LightVibrant
                // * LightMuted

                try{
                        const vibrant = 'rgba(' + palette.Vibrant._rgb[ 0 ] + ', ' + palette.Vibrant._rgb[ 1 ] + ', ' + palette.Vibrant._rgb[ 2 ] + ', 1 )'
                        myPalette.appendValueToList( "vibrant", vibrant )
                }catch( e ){ null }
                try{
                        const darkvibrant = 'rgba(' + palette.DarkVibrant._rgb[ 0 ] + ', ' + palette.DarkVibrant._rgb[ 1 ] + ', ' + palette.DarkVibrant._rgb[ 2 ] + ', 1 )'
                        myPalette.appendValueToList("darkvibrant", darkvibrant )
                }catch( e ){ null }
                try{
                        const darkvibrantlight = 'rgba(' + palette.DarkVibrant._rgb[ 0 ] + ', ' + palette.DarkVibrant._rgb[ 1 ] + ', ' + palette.DarkVibrant._rgb[ 2 ] + ', 0.5 )'
                        myPalette.appendValueToList( "darkvibrantlight", darkvibrantlight )
                }catch( e ){ null }
                try{
                        const lightmuted = 'rgba(' + palette.LightMuted._rgb[ 0 ] + ', ' + palette.LightMuted._rgb[ 1 ] + ', ' + palette.LightMuted._rgb[ 2 ] + ', 1 )'
                        myPalette.appendValueToList( "lightmuted", lightmuted )
                }catch( e ){ null }
                try{
                        const muted = 'rgba(' + palette.Muted._rgb[ 0 ] + ', ' + palette.Muted._rgb[ 1 ] + ', ' + palette.Muted._rgb[ 2 ] + ', 1 )'
                        myPalette.appendValueToList( "muted", muted )
                }catch( e ){ null }
                try{
                        const darkmuted = 'rgba(' + palette.DarkMuted._rgb[ 0 ] + ', ' + palette.DarkMuted._rgb[ 1 ] + ', ' + palette.DarkMuted._rgb[ 2 ] + ', 1 )'
                        myPalette.appendValueToList( "darkmuted", darkmuted )
                }catch( e ){ null }
                try{
                        const lightvibrant = 'rgba(' + palette.LightVibrant._rgb[ 0 ] + ', ' + palette.LightVibrant._rgb[ 1 ] + ', ' + palette.LightVibrant._rgb[ 2 ] + ', 1 )'
                        myPalette.appendValueToList( "lightvibrant", lightvibrant )
                }catch( e ){ null }

                setColourPalette( myPalette.colors )
                setonswitch( true )
        }

 

        function updateProgressCalculation ( lengthOfSong: number, secondsOfSong: number ) {
                return Math.round(( 100 / lengthOfSong ) * secondsOfSong + 1 );
        }
   
        const handleClickPause = ( ) => {
                setisPause( true )
                fetch( "http://192.168.0.222:11000/Pause" )
        };
        const handleClickPlay = ( event ) => {
                setisPause( false )
                fetch( "http://192.168.0.222:11000/Play" )
        }
        function handleLeftSwipe( ) {
                setonswitch( true )
                setFadeout( true )
                fetch( "http://192.168.0.222:11000/Action?service=TidalConnect&action=Next" )
        }
        function handleRightSwipe( ) {
                setonswitch( true )
                setFadeout( true )
                fetch( "http://192.168.0.222:11000/Action?service=TidalConnect&action=Previous" )
        }
        function handleUpSwipe( ) {
                setTopMenu( false )
                setIncreasedTopmarginPlayercontainer( false )
        }
        function handleDownSwipe( ) {
                setTopMenu( true )
                setIncreasedTopmarginPlayercontainer( true )
        }

        useSwipeDetection( handleLeftSwipe, handleRightSwipe, handleUpSwipe, handleDownSwipe, triggerDistance, setTriggerdistance);
        
       
        
        return <>
                { blackout === true  && data.title1 !== "Bluetooth" && <>

                        <div className =" blackout "></div>

                        </>}
                { context === "stopscreen" && <>
                {/* <MainMenu
                                action = { setTopMenu }
                                action2 = { setIncreasedTopmarginPlayercontainer }
                                swipeDistance = { setTriggerdistance }
                        /> */}
                </>}
                { context === "music" && volumeOverlay === true && loading === false && <> 
                        <Volumeindicator
                                state  = { volumeOverlay }
                                volume = { volumeValue }
                                action = { setVolumeOverlay }/>
                </>}

                { topMenu === true && <> 
                        <Menu
                                action = { setTopMenu }
                                action2 = { setIncreasedTopmarginPlayercontainer }
                                swipeDistance = { setTriggerdistance }
                        />
                        <div className = "downshadow" ></div>

                        <div 
                                className = { "overlay" }>
                        </div>
                        <div 
                                className = { "overlay" }>
                        </div>

                </> }

                { loading == true && <>
                        <Waitscreen />
                </> }
                
                { context == "music" && loading == false && colourPalette != undefined && data.quality != "n/A" && <>
                        
                        <Playercontainer
                                data              = { data }
                                progress          = { progress }
                                onswitch          = { onswitch }
                                isPause           = { isPause }
                                artwork           = { data.image }
                                colourPalette     = { colourPalette }
                                action_pause      = { handleClickPause }
                                action_play       = { handleClickPlay }
                                fadeout           = { fadeout }

                                increasedTopmarginPlayercontainer = { increasedTopmarginPlayercontainer }
                        />
                </>}                    
        </>
        }



{/* <Backgroundeffect
    r = {CpaletteBar[0]?CpaletteBar[0]:null}
    g = {CpaletteBar[1]?CpaletteBar[1]:null}
    b = {CpaletteBar[2]?CpaletteBar[2]:null}
    rh = {CpaletteHl[0]?CpaletteHl[0]:null}
    gh = {CpaletteHl[1]?CpaletteHl[1]:null}
    bh = {CpaletteHl[2]?CpaletteHl[2]:null}
    rBG = {CpaletteBarBG[0]?CpaletteBarBG[0]:null}
    gBG = {CpaletteBarBG[1]?CpaletteBarBG[1]:null}
    bBG = {CpaletteBarBG[2]?CpaletteBarBG[2]:null}
    rm = {Cpalettem[0]?Cpalettem[0]:null}
    gm = {Cpalettem[1]?Cpalettem[1]:null}
    bm = {Cpalettem[2]?Cpalettem[2]:null}/> 
*/}