import Waitscreen from '../../components/basic/waitscreen'
import Playercontainer from '../../components/basic/playercontainer'
import useSwipeDetection from '../../components/helper/useSwipeDetection';
import Vibrant from 'node-vibrant';

import React, { useState, useEffect, useMemo } from 'react'
import { ImageSource } from 'node-vibrant/lib/typing';
import Menu from '../../components/basic/menu';
import Volumeindicator from '../../components/basic/volumeindicator';

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
                        volume: "n/A"
                        }
                )
        const [ isPause, setisPause ] = useState( false )
        const [ increasedTopmarginPlayercontainer, setIncreasedTopmarginPlayercontainer ] = useState( false )
        const [ loading, setloading ] = useState( true )
        const [ lastimageanalysed, setlastimageanalysed] = useState( )
        const [ onswitch, setonswitch ] = useState( false )
        const [ menuitem, setMenuitem ] = useState( "music" )
        const [ showStopOverlay, setShowStopOverlay ] = useState( false )
        const [topMenu, setTopMenu] = useState( false )
        const [ isBeingChecked, setIsBeingChecked ] = useState( false )
        // const [resetBackground, setresetBackground] = useState( false )
        const [ colourPalette, setColourPalette ] = useState( )
        const [ swipeAnimation, setSwipeAnimation ] = useState(
                {
                  direction: "",
                  delta: 0
                }
        )
        const [ waitduration, setwaitduration ] = useState( 1200 )
        const [ countShutdown, setCountShutdown ] = useState( 0 )
        const [ shutDown, setShutdown ] = useState( false )

        const progress = useMemo( ( ) => { 
                return updateProgressCalculation( data.length, data.seconds )
        }, [ data.seconds, data.length ] )

        const volume = useMemo( ( ) => { 
                return showVolumeChange( data.volume )
        }, [  ] )

        function showVolumeChange( vol: number ) {

        }
        
        const updateImageOnDemand = useMemo( ( ) => { 
                const i = data.image !== "n/A" ? data.image : ""
                return updatePaletteFromImage( i )
        }, [ data.image ] )

        useEffect( ( ) => {
                (
                        async ( ) => {
                                if ( shutDown ) {
                                        const url = "/api/shutdown";
                                        const r = await fetch( url );

                                }
                                if ( !shutDown ) {
                                        const url = "/api/turnon";
                                        const r = await fetch( url );

                                }
                        }
                )()
        }, [ shutDown ])

        // const resetAnimationStyle = ( ) => {
        //         setSwipeAnimation({
        //                 direction: "",
        //                 delta: 0
        //         })
        // }

        useEffect( ( ) => {
                const refreshInterval = setInterval(async ( ) => {

                        if ( menuitem === null ) {

                        } else {
                                console.log( "Updating..." )

                                // swipeAnimation.direction == "right" ? resetAnimationStyle() : null
                                // swipeAnimation.direction == "left" ? resetAnimationStyle() : null
                                // swipeAnimation.direction == "up" ? resetAnimationStyle() : null
                                // swipeAnimation.direction == "down" ? resetAnimationStyle() : null
                                
                                if ( isBeingChecked === false ) {
                                        setIsBeingChecked( true );
                                        setonswitch( true )

                                        const url = "/api/getmeta";
                                        const r = await fetch( url );
                                        const playerdata = await r.json( );

                                        if ( playerdata.service === "Capture" ){
                                                setCountShutdown( countShutdown + 12 )
                                        }

                                        if ( playerdata.state === "pause" ){
                                                setisPause( true )
                                                setCountShutdown( countShutdown + 0.25 )
                                        }

                                        if ( playerdata.state === "stop" ) {
                                                setCountShutdown( countShutdown + 1 )
                                        }

                                        if ( playerdata.state === "pause" && playerdata.service === "Capture" && playerdata.state === "stop" ){
                                                setisPause( false )
                                                setShutdown( false )
                                                setCountShutdown( 0 )
                                        }

                                        console.log(countShutdown)

                                        countShutdown >= shutDownWhenStopSeconds 
                                                ? setShowStopOverlay( true ) 
                                                : setShowStopOverlay( false )
                                        countShutdown >= shutDownWhenStopSeconds * 2
                                                ? setShutdown( true ) 
                                                : setShutdown( false )

                                        setdata( playerdata );
                                        setonswitch( true )
                                        setIsBeingChecked( false )
                                        setloading( false )
                                        // setresetBackground( false )
                                }
                        }
                }, waitduration );
                return () => clearInterval( refreshInterval );
        }, );

        const myPalette = new ColourPalette( );

        const makePalette = ( palette ) => {
                try{
                        const vibrantprocessed = 'rgba(' + palette.Vibrant._rgb[ 0 ] + ', ' + palette.Vibrant._rgb[ 1 ] + ', ' + palette.Vibrant._rgb[ 2 ] + ', 100 )'
                        myPalette.appendValueToList( "vibrant", vibrantprocessed )
                }catch( e ){ null }
                try{
                        const darkVibrantProcessed = 'rgba(' + palette.DarkVibrant._rgb[ 0 ] + ', ' + palette.DarkVibrant._rgb[ 1 ] + ', ' + palette.DarkVibrant._rgb[ 2 ] + ', 100 )'
                        myPalette.appendValueToList("darkvibrant", darkVibrantProcessed )
                }catch( e ){ null }
                try{
                        const darkVibrantProcessedLIGHT = 'rgba(' + palette.DarkVibrant._rgb[ 0 ] + ', ' + palette.DarkVibrant._rgb[ 1 ] + ', ' + palette.DarkVibrant._rgb[ 2 ] + ', 0.5 )'
                        myPalette.appendValueToList( "darkvibrantlight", darkVibrantProcessedLIGHT )
                }catch( e ){ null }
                try{
                        const lightMutedProcessed = 'rgba(' + palette.LightMuted._rgb[ 0 ] + ', ' + palette.LightMuted._rgb[ 1 ] + ', ' + palette.LightMuted._rgb[ 2 ] + ', 100 )'
                        myPalette.appendValueToList( "lightmuted", lightMutedProcessed )
                }catch( e ){ null }
                try{
                        const mutedProcessed = 'rgba(' + palette.Muted._rgb[ 0 ] + ', ' + palette.Muted._rgb[ 1 ] + ', ' + palette.Muted._rgb[ 2 ] + ', 100 )'
                        myPalette.appendValueToList( "muted", mutedProcessed )
                }catch( e ){ null }
                setColourPalette( myPalette.colors )
        }

        function updatePaletteFromImage ( image: string ) {
                const v = new Vibrant( image );
                v.getPalette(( err, palette ) => makePalette( palette ));
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
                fetch( "http://192.168.0.222:11000/Action?service=TidalConnect&action=Next" )
        }
        function handleRightSwipe( ) {
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

        useSwipeDetection( handleLeftSwipe, handleRightSwipe, handleUpSwipe, handleDownSwipe, setSwipeAnimation );


        return <>
                {/* <Volumeindicator
                        volume = {20}/>
                         */}
                { showStopOverlay === true &&< >
                        <div 
                                className = { "overlay" }
                                onClick = { ( e ) => {setShowStopOverlay( false ), setShutdown( false ), setCountShutdown( 0 )}  }>
                        </div>
                </>}
                { topMenu === true && <> 
                        <Menu
                                action = { setMenuitem }
                        />
                        <div className = "downshadow"></div>

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

                { loading == false && colourPalette != undefined && data.quality != "n/A" && <>
                        
                        <Playercontainer
                                data              = { data }
                                progress          = { progress }
                                onswitch          = { onswitch }
                                isPause           = { isPause }
                                artwork           = { data.image }
                                colourPalette     = { colourPalette }
                                action_pause      = { handleClickPause }
                                action_play       = { handleClickPlay }
                                // swipeAnimation    = { swipeAnimation }
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