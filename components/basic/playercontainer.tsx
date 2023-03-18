import s                from './playercontainer.module.css'
import Contentleft      from './contentleft'
import Contentright     from './contentright'
import Service          from './service'
import React from 'react'
 
interface Props {
        data: {
                artist: string,
                image: string | null,
                length: number,
                quality: string | null,
                seconds: number,
                service: string | null,
                serviceIcon: string,
                state: string | null,
                title1: string | boolean | null,
                title2: string | boolean | null | undefined, 
                title3: string | boolean | null | undefined,
                volume: number 
        }
        colourPalette: {
                vibrant: string;
                lightvibrant: string;
                darkvibrant: string;
                darkvibrantlight: string;
                muted: string;
                lightmuted: string;
                darkmuted: string;
        } 
        // swipeAnimation: {
        //         direction: string, 
        //         delta: number,
        // }
        onswitch: boolean; 
        artwork: string | null;
        progress: number;
        isPause: boolean;
        action_pause: Function;
        action_play: Function;
        fadeout: boolean;
        increasedTopmarginPlayercontainer: boolean;
}

export default function Component( props: Props ) {

        const topmargin_init = props.increasedTopmarginPlayercontainer === true ? s.increasedMargin : s.notIncreasedMargin

        return <>
                { props.data && <>
                        <div className = {  s.container +" "+ topmargin_init  }>
                                { props.data && props.data.service && props.data.service !== "Capture" && <>
                                        <Service
                                                service          = { props.data.service }
                                                serviceIcon      = { props.data.serviceIcon }
                                        /> 
                                </>}  
                                <Contentleft
                                                service           = { props.data.service }
                                                serviceIcon       = { props.data.serviceIcon }
                                                onswitch          = { props.onswitch }
                                                isPause           = { props.isPause }
                                                artwork           = { props.artwork }
                                                action_pause      = { props.action_pause}
                                                action_play       = { props.action_play}
                                                fadeout           = { props.fadeout }
                                />
                                <Contentright
                                                artist            = { props.data.artist ? props.data.artist.toString() : "" }
                                                title             = { props.data.title1 ? props.data.title1.toString() : "" }
                                                title2            = { props.data.title2 ? props.data.title2.toString() : "" }
                                                album             = { props.data.title3 ? props.data.title3.toString() : "" }
                                                service           = { props.data.service }
                                                state             = { props.data.state }
                                                serviceIcon       = { props.data.serviceIcon }
                                                fadeout           = { props.fadeout }
                                                onswitch          = { props.onswitch }
                                                isPause           = { props.isPause }
                                                artwork           = { props.artwork }
                                                progress          = { props.progress}
                                                songLength        = { props.data.length}
                                                colourPalette     = { props.colourPalette }
                                                connecting        = { props.data.state == "connecting" ? true : false }
                                />

                        </div>
                </>}
        </>
}