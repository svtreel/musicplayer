import s                from './playercontainer.module.css'
import Contentleft      from './contentleft'
import Contentright     from './contentright'
import Service          from './service'

interface Props {
        data: {
                artist: string | boolean | null,
                image: string | null,
                length: number | null,
                quality: string | null,
                seconds: string | null,
                service: string | null,
                serviceIcon: string | null,
                state: string | null,
                title1: string | boolean | null,
                title2: string | boolean | null | undefined, 
                title3: string | boolean | null | undefined,
                volume: string | null 
        }
        colourPalette: {
                muted: string,
                lightvibrant: string,
                vibrant: string,
                darkvibrant: string,
                darkvibrantlight: string,
                lightmuted: string
        } 
        swipeAnimation: {
                direction: string, 
                delta: number,
        }
        onswitch: boolean; 
        artwork: string | null;
        progress: number;
        isPause: boolean;
        action_pause: Function;
        action_play: Function;
        topmarginPlayercontainer: string;
}

export default function Component( props: Props ) {
        const factor = 25
        const cut = props.swipeAnimation.delta <= 200 ? props.swipeAnimation.delta : 200 
        const perspective = props.swipeAnimation.delta != 0 ? 600-cut : 2000
        const left = props.swipeAnimation.direction == "right" ? props.swipeAnimation.delta/factor : null
        const right = props.swipeAnimation.direction == "left" ? props.swipeAnimation.delta/factor : null
        const up = props.swipeAnimation.direction == "up" ? props.swipeAnimation.delta/factor: null
        const down = props.swipeAnimation.direction == "down" ? props.swipeAnimation.delta/factor : null

        const animationDirection_init = () => {
                let animationDirection_style = null

                const ls = left != null ? `perspective(${perspective}px) scale(${perspective/(perspective)}) rotateY(${left}deg)` : null
                const rs = right != null ? `perspective(${perspective}px) scale(${perspective/(perspective)}) rotateY(-${right}deg)` : null
                const us = up != null ? `perspective(${perspective}px) scale(${perspective/(perspective)}) rotateX(${up}deg)` : null
                const ds = down != null ? `perspective(${perspective}px) scale(${perspective/(perspective)}) rotateX(-${down}deg)` : null
                
                left != null ? animationDirection_style = ls : null
                right != null ? animationDirection_style = rs : null
                up != null ? animationDirection_style = us : null
                down != null ? animationDirection_style = ds : null

                return animationDirection_style
        }

        return <>
                { props.data && <>
                        <div className={ s.container } 
                                style = {{
                                        transform: animationDirection_init(),
                                        marginTop: props.topmarginPlayercontainer
                                }}
                        >
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
                                />
                                <Contentright
                                                artist={props.data.artist ? props.data.artist.toString() : null}
                                                title={props.data.title1 ? props.data.title1.toString() : null}
                                                title2={props.data.title2 ? props.data.title2.toString() : null}
                                                album={props.data.title3 ? props.data.title3.toString() : null}
                                                service           = { props.data.service }
                                                state             = { props.data.state }
                                                serviceIcon       = { props.data.serviceIcon }
                                                onswitch          = { props.onswitch }
                                                isPause           = { props.isPause }
                                                artwork           = { props.artwork }
                                                progress          = { props.progress}
                                                songLength        = { props.data.length}
                                                muted             = { props.colourPalette.muted }
                                                lightvibrant      = { props.colourPalette.lightvibrant }
                                                vibrant           = { props.colourPalette.vibrant }
                                                darkvibrant       = { props.colourPalette.darkvibrant }
                                                darkvibrantlight  = { props.colourPalette.darkvibrantlight }
                                                lightmuted        = { props.colourPalette.lightmuted }
                                                connecting        = { props.data.state == "connecting" ? true : false }
                                />

                        </div>
                </>}
        </>
}

  

// <div className = "playerleftcol">
                                                
                                        
                                        
                                        // <Contentright
                                        //         title={data.title1}
                                        //         artist={data.artist}
                                        //         state={data.state}
                                        // />       
                                        //         {data.service != "Capture" && <>
                                        //                 {data.state != "connecting" && <> 
                                        //                         <Title
                                        //                                 data = {data.title1}
                                        //                                 r = {CpaletteHl[0]}
                                        //                                 g = {CpaletteHl[1]}
                                        //                                 b = {CpaletteHl[2]}
                                        //                         />
                                        //                         <Artist
                                        //                                 data = {data.artist}
                                        //                                 r = {CpaletteHl[0]}
                                        //                                 g = {CpaletteHl[1]}
                                        //                                 b = {CpaletteHl[2]}
                                        //                         />
                                        //                         <h2> {data.artist} </h2>
                                        //                 </>}
                                        //                 {data.state == "connecting" && <> 
                                        //                         <Title
                                        //                                 data = {"Connecting"}
                                        //                                 r = {CpaletteHl[0]}
                                        //                                 g = {CpaletteHl[1]}
                                        //                                 b = {CpaletteHl[2]}
                                        //                         />
                                        //                 </>}
                                                        
                                        //         </>}
                                        //         {data.service == "Capture" && <>
                                        //                 <Title 
                                        //                         text={data.title1}
                                        //                 />
                                        //         </>}
                                                
                                        //         {data.title2 && <>
                                        //                 <h2> {data.title2} </h2>
                                        //         </>}
                                        //         {data.title3 && <>
                                        //                 <h3>  {/*• {data.title3} </h3> 
                                        //         </>}
                                        //         {completedPercent <= 100 && data.state != "connecting" && data.service != "TuneIn" && <> 
                                        //                 <ProgressBarNew 
                                        //                         progress={completedPercent} 
                                        //                         r = {CpaletteBar[0]}
                                        //                         g = {CpaletteBar[1]}
                                        //                         b = {CpaletteBar[2]}
                                        //                         rBG = {CpaletteBarBG[0]}
                                        //                         gBG = {CpaletteBarBG[1]}
                                        //                         bBG = {CpaletteBarBG[2]}
                                        //                         rm = {CpaletteHl[0]}
                                        //                         gm = {CpaletteHl[1]}
                                        //                         bm = {CpaletteHl[2]}
                                        //                         l = {data.length}
                                        //                         tidal = {data.service != "TidalConnect"?true:false}
                                        //                 />
                                        //         </>}
                                        //         {data.state == "connecting" && <> 
                                        //                         <Loader/>
                                        //         </>}
                                        // </div>