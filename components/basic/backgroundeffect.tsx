import s from './backgroundeffect.module.css'

interface Props {
        vibrant : string,
        lightvibrant : string,
        darkvibrant : string,
        darkvibrantlight : string,
        muted : string,
        lightmuted : string,
        darkmuted : string
}

export default function Component( props: Props ) {

        const height = 480
        const width  = 800
        let count = 15
        let duration = "8s"
        let blur = "blur(130px)"

        const randomPosition = (f: string) => {

                let value = 0
                f == "top" ? value = Math.floor(Math.random() * height + 1 ) : null
                f == "left"  ? value = Math.floor(Math.random() * width  + 1 ) : null

                return value + "px"

        }
        const randomWidthHeight = (f: string) => {

                let value = 0
                f == "height" ? value = Math.floor(Math.random() * 350 + 1 ) : null
                f == "width"  ? value = Math.floor(Math.random() * 400  + 1 ) : null
                return 100 + value + "px"

        }
        const randomOp = () => {

                let value = 0
                value = Math.floor(Math.random() * 7 )
                return value / 10

        }

        return <>
                <div className = { s.container_static }>

                        <div style = {{ 
                                        position: "absolute",
                                        top: randomPosition("top"),
                                        left: randomPosition("left"),
                                        opacity: randomOp(),
                                        height: randomWidthHeight("height"),
                                        width: randomWidthHeight("width"),
                                        filter: blur,
                                        backgroundColor: props.darkvibrant,
                                        transitionDuration: duration,
                                        borderRadius: "80px"
                                }}>
                        </div>
                        <div style = {{ 
                                        position: "absolute",
                                        top: randomPosition("top"),
                                        left: randomPosition("left"),
                                        opacity: randomOp(),
                                        height: randomWidthHeight("height"),
                                        width: randomWidthHeight("width"),
                                        filter: blur,
                                        backgroundColor: props.vibrant,
                                        transitionDuration: duration,
                                        borderRadius: "80px"
                                }}>
                                
                        </div>
                        <div style = {{ 
                                        position: "absolute",
                                        top: randomPosition("top"),
                                        left: randomPosition("left"),
                                        opacity: randomOp(),
                                        height: randomWidthHeight("height"),
                                        width: randomWidthHeight("width"),
                                        filter: blur,
                                        backgroundColor: props.lightmuted,
                                        transitionDuration: duration,
                                        borderRadius: "80px"
                                }}>
                                
                        </div>

                </div>
        </>
}