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
}

export default function Component( props: Props ) {

        const fadeoutValue = props.fadeout === true ? "1" : "0"

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
                                        />
                                        <Loader/>
                                </> }
                                </> }
                                < div style = {{ opacity : fadeoutValue }} >
                                        { props.onswitch == true && <>
                                                { props.isPause === true && <> 
                                                        <Artwork
                                                                artwork         = { props.artwork }
                                                                action          = { props.action_play }
                                                                pauseImage      = { "not required" }
                                                                paused          = { true }
                                                        />
                                                </>} 
                                                { props.isPause === false && <> 
                                                        <Artwork
                                                                artwork         = { props.artwork }
                                                                action          = { props.action_pause }
                                                                pauseImage      = { "not required" }
                                                                paused          = { false }
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
                                        pauseImage      = {"not required"}
                                        action          = { () => {} }
                                />
                        </>}                  
                </div>
        </>
}