import s from './contentleft.module.css'
import Artwork from './artwork'
import Loader from './loader'
import React from 'react';

interface Props {
        serviceIcon: string | null;
        artwork: string | null;
        service: string | null;
        onswitch: boolean;
        isPause: boolean;
        action_play: Function;
        action_pause: Function;
        fadeout: boolean;
        progress: number;
}

export default function Component( props: Props ) {

        const fadeoutValue = props.fadeout === true ? "1" : "0"
        const transitionConf = props.fadeout === true ? "1s" : "0s"
        const delayConf = props.fadeout === true ? "0s" : "0s"
        const scaleConf = props.fadeout === true ? "1" : "0.96"

        const styleObjectForFade = { 
                opacity : fadeoutValue,
                transition : transitionConf,
                transitionDelay : delayConf,
                transform : "scale(" + scaleConf + ")",
        }

        return <>
                <div className={ s.container }>
                
                         { props.serviceIcon && <>
                                { props.onswitch == false && <>
                                        { props.isPause === false && <> 
                                                <Artwork
                                                        artwork         = { "/blackpixel.png" }
                                                        paused          = { false }
                                                        pauseImage      = { "not required" }
                                                        action          = { ( ) => { } }
                                                        progress        = { props.progress }
                                                />

                                                        <Loader/>

                                        </> }
                                        
                                </> }

                                < div 
                                        className = { s.fade } 
                                        style = { styleObjectForFade }
                                        >
                                        { props.onswitch == true && <>
                                                { props.isPause === true && <> 
                                                        <Artwork
                                                                artwork         = { props.artwork }
                                                                action          = { props.action_play }
                                                                pauseImage      = { "not required" }
                                                                paused          = { true }
                                                                progress        = { props.progress }
                                                        />
                                                </>} 
                                                { props.isPause === false && <> 
                                                        <Artwork
                                                                artwork         = { props.artwork }
                                                                action          = { props.action_pause }
                                                                pauseImage      = { "not required" }
                                                                paused          = { false }
                                                                progress        = { props.progress }
                                                        />
                                                </> }     
                                        </> }  
                                </div>
                        </> }    
                        { !props.serviceIcon && <>
                                {/* ################ ONLY HDMI  */}
                                <Artwork
                                        artwork         = { props.artwork }
                                        paused          = { false }
                                        pauseImage      = { "not required" }
                                        action          = { () => {} }
                                        progress        = { props.progress }
                                />
                        </>}                  
                </div>
        </>
}