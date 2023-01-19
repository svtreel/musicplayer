import s from './artwork.module.css'
import pauseImage from '/src/images/pause.png'
import Image from "next/image"

interface Props {
  pauseImage: string | null;
  artwork: string | null;
  paused: boolean | null;
  action: Function;
}

export default function Component( props: Props ) {

        return<>
                { props.paused == true && <> 
                        {/* <div className={s.pauseContainer}> */}
                                <Image
                                        src = { pauseImage} 
                                        alt = "Pause"
                                        width = { 350 }
                                        height = { 350 }
                                        className = { s.pause }
                                        style = {{
                                                opacity: "1"
                                        }}
                                        onClick = { (e)=> props.action() }
                                />
                        {/* </div> */}
                </>}
                {props.artwork != undefined && <>
                        <img 
                                className = { s.artwork }
                                alt = "Artwork"
                                src = { props.artwork } 
                                onClick = { (e)=>props.action() }
                        />
                </>}
        </>
}