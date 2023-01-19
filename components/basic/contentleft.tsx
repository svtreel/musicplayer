import s from './contentleft.module.css'
import Artwork from './artwork'
import Image from 'next/image'
import Loader from './loader'

interface Props {
        serviceIcon: string | null;
        artwork: string | null;
        service: string | null;
        onswitch: boolean;
        isPause: boolean;
        action_play: Function;
        action_pause: Function;
}

export default function Component( props: Props ) {

        return <>
                <div className={ s.container }>
                
                        { props.serviceIcon && <>
                                { props.onswitch == false && <>
                                        {/* ################ LOADING */}
                                        <Artwork
                                                artwork = {"/src/images/blackpixel.png"}
                                                paused = {false}
                                                pauseImage = {"not required"}
                                                action = {() => {}}
                                        />
                                        <Loader/>
                                </>}
                                { props.onswitch == true && <>
                                        { props.isPause == true && <> 
                                                {/* ################ PAUSED */}
                                                <Artwork
                                                        artwork  = { props.artwork }
                                                        action  = { props.action_play }
                                                        pauseImage = {"not required"}
                                                        paused = { true }
                                                />
                                                
                                        </>} 
                                </>}  
                                { props.isPause == false && <> 
                                        <Artwork
                                                artwork  = { props.artwork }
                                                action  = { props.action_pause }
                                                pauseImage = { "not required" }
                                                paused = { false }
                                        />
                                </>}           
                        </>}    
                        { !props.serviceIcon && <>
                                {/* ################ ONLY HDMI  */}
                                <Artwork
                                        artwork  = { props.artwork }
                                        paused = { false }
                                        pauseImage = {"not required"}
                                        action = { () => {} }
                                />
                        </>}                  
                </div>
        </>
}