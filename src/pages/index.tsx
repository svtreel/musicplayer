import Loader from '../../components/basic/loader'
import Waitscreen from '../../components/basic/waitscreen'
import Playercontainer from '../../components/basic/playercontainer'
import Head from 'next/head'
import Menu from '../../components/basic/menu'
// import Controller from '../../components/basic/controller'

import useSwipeDetection from '../../components/helper/useSwipeDetection';
import Vibrant from 'node-vibrant';

import React, {useState, useEffect, useRef} from 'react'

export default function Home() {

        const refreshRate = 1200
        const shutDownWhenStopSeconds = 2

        const [data, setdata] = useState(
          {
                artist: "n/A",
                image: "n/A",
                length: 0,
                quality: "n/A",
                seconds: "n/A",
                service: "n/A",
                serviceIcon: "n/A",
                state: "n/A",
                title1: "n/A",
                title2: "n/A",
                title3: "n/A",
                volume: "n/A"
                }
        )
        const [isPause, setisPause] = useState(false)
        const [topmarginPlayercontainer, setTopmarginPlayercontainer] = useState("0rem")
        const [loading, setloading] = useState(true)
        const [progress, setProgress] = useState(0)
        const [lastimageanalysed, setlastimageanalysed] = useState()
        const [onswitch, setonswitch] = useState( false )
        const [menuitem, setMenuitem] = useState( "music" )
        const [showStopOverlay, setShowStopOverlay] = useState( false )
        const [topMenu, setTopMenu] = useState( false )
        const [isBeingChecked, setIsBeingChecked] = useState( false )
        const [resetBackground, setresetBackground] = useState( false )
        const [colourPalette, setColourPalette] = useState()
        const [swipeAnimation, setSwipeAnimation] = useState(
                {
                  direction: "",
                  delta: 0
                }
        )
        const [waitduration, setwaitduration] = useState( refreshRate )
        const [waitdurationUntilShutDown, setwaitdurationUntilShutDown] = useState( shutDownWhenStopSeconds )
        const [countShutdown, setCountShutdown] = useState( 0 )
        const [shutDown, setShutdown] = useState( false )


        useEffect(() => {
                (
                        async () => {
                                if (shutDown) {
                                        const url = "/api/shutdown";
                                        const r = await fetch( url );
                                }
                                if (!shutDown) {
                                        const url = "/api/turnon";
                                        const r = await fetch( url );
                                }
                        }
                )()
        }, [shutDown])

        const resetAnimationStyle = ( direction: string ) => {
                setSwipeAnimation({
                        direction: "",
                        delta: 0
                })
        }

        useEffect(() => {
                const refreshInterval = setInterval(async () => {

                        if ( menuitem === null ) {

                        } else {
                                console.log( "Updating..." )

                                swipeAnimation.direction == "right" ? resetAnimationStyle("right") : null
                                swipeAnimation.direction == "left" ? resetAnimationStyle("left") : null
                                swipeAnimation.direction == "up" ? resetAnimationStyle("up") : null
                                swipeAnimation.direction == "down" ? resetAnimationStyle("down") : null
                                
                                if ( isBeingChecked === false ) {
                                        setIsBeingChecked( true );
                                        setonswitch( true )

                                        const url = "/api/getmeta";
                                        const r = await fetch( url );
                                        const playerdata = await r.json();

                                        if (playerdata.state === "pause"){
                                                setisPause( true )
                                                setCountShutdown( countShutdown + 0.25 )
                                        } else {
                                                setisPause( false )
                                                setShutdown( false )
                                        }

                                        if (playerdata.state === "stop") {
                                                setCountShutdown( countShutdown + 1 )
                                        } else {
                                                if (playerdata.state !== "pause") {
                                                        setCountShutdown( 0 )
                                                }     
                                        }
                                        // countShutdown >= shutDownWhenStopSeconds 
                                        //         ? console.log("showing overlay") 
                                        //         : null
                                        // countShutdown >= shutDownWhenStopSeconds * 2
                                        //         ? console.log("must shutdown display") 
                                        //         : null
                                        countShutdown >= shutDownWhenStopSeconds 
                                                ? setShowStopOverlay( true ) 
                                                : setShowStopOverlay( false )
                                        countShutdown >= shutDownWhenStopSeconds * 2
                                                ? setShutdown( true ) 
                                                : setShutdown( false )

                                        if ( lastimageanalysed !== playerdata.image && playerdata.state != "connecting" ) {
                                                const v = new Vibrant( playerdata.image );
                                                v.getPalette(( err, palette ) => makePalette( palette ));
                                                setlastimageanalysed( playerdata.image );
                                        }

                                        setdata(playerdata);

                                        const calcPercentProgress = () => {
                                                if ( playerdata.length ) {
                                                        return Math.round(( 100 / playerdata.length) * playerdata.seconds + 1 );
                                                } else {
                                                        return 100;
                                                }
                                        }
                                        setonswitch( true )
                                        setProgress( calcPercentProgress() ) 
                                        setIsBeingChecked( false )
                                        setresetBackground( false )
                                        setloading( false )

                                }
                        }
                }, waitduration);
                return () => clearInterval( refreshInterval );
        }, );



        class ColourPalette {
            public colors: any;
            constructor() {
                this.colors = {};
            }

            appendValueToList( type: string, value: any ) {
                this.colors[ type ] = value;
            }

            getColors() {
                return this.colors;
            }
        }

        const myPalette = new ColourPalette();

        const makePalette = ( palette ) => {
          try{
                const vibrantprocessed = 'rgba(' + palette.Vibrant._rgb[0] + ', ' + palette.Vibrant._rgb[1] + ', ' + palette.Vibrant._rgb[2] + ', 100)'
                myPalette.appendValueToList("vibrant", vibrantprocessed)
          }catch(e){null}
          try{
                const darkVibrantProcessed = 'rgba(' + palette.DarkVibrant._rgb[0] + ', ' + palette.DarkVibrant._rgb[1] + ', ' + palette.DarkVibrant._rgb[2] + ', 100)'
                myPalette.appendValueToList("darkvibrant", darkVibrantProcessed)
          }catch(e){null}
          try{
                const darkVibrantProcessedLIGHT = 'rgba(' + palette.DarkVibrant._rgb[0] + ', ' + palette.DarkVibrant._rgb[1] + ', ' + palette.DarkVibrant._rgb[2] + ', 0.5)'
                myPalette.appendValueToList("darkvibrantlight", darkVibrantProcessedLIGHT)
          }catch(e){null}
          try{
                const lightMutedProcessed = 'rgba(' + palette.LightMuted._rgb[0] + ', ' + palette.LightMuted._rgb[1] + ', ' + palette.LightMuted._rgb[2] + ', 100)'
                myPalette.appendValueToList("lightmuted", lightMutedProcessed)
          }catch(e){null}
          try{
                const mutedProcessed = 'rgba(' + palette.Muted._rgb[0] + ', ' + palette.Muted._rgb[1] + ', ' + palette.Muted._rgb[2] + ', 100)'
                myPalette.appendValueToList("muted", mutedProcessed)
          }catch(e){null}
                setColourPalette(myPalette.colors)
        }
   
        const handleClickPause = () => {
                setisPause(true)
                fetch("http://192.168.0.222:11000/Pause")
        };
        const handleClickPlay = ( event ) => {
                setisPause( false )
                fetch( "http://192.168.0.222:11000/Play" )
        }
        function handleLeftSwipe() {
                fetch( "http://192.168.0.222:11000/Action?service=TidalConnect&action=Next" )
        }
        function handleRightSwipe() {
                fetch( "http://192.168.0.222:11000/Action?service=TidalConnect&action=Previous" )
        }
        function handleUpSwipe() {
                setTopMenu( false )
                setTopmarginPlayercontainer("0rem")
        }
        function handleDownSwipe() {
                setTopMenu( true )
                setTopmarginPlayercontainer("10rem")
        }

        useSwipeDetection( handleLeftSwipe, handleRightSwipe, handleUpSwipe, handleDownSwipe, setSwipeAnimation );


        return <>
                { showStopOverlay === true &&<>
                        <div 
                                className = { "overlay" }
                                onClick = { (e)=> {setShowStopOverlay( false ), setShutdown( false ), setCountShutdown( 0 )}  }>
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
                        <Waitscreen/>
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
                                swipeAnimation    = { swipeAnimation }
                                topmarginPlayercontainer = { topmarginPlayercontainer }
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