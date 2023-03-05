import { builtinModules } from 'module';
import s from './backgroundeffect.module.css'

import React, { useEffect, useState } from 'react'

interface Props {
        vibrant : string,
        lightvibrant : string,
        darkvibrant : string,
        darkvibrantlight : string,
        muted : string,
        lightmuted : string,
        darkmuted : string,
        reload : boolean
}

class RecList {
        public recs: any;
        constructor( ) {
                this.recs = [ ];
        }
        appendValueToList( obj: Object ) {
            this.recs.push( obj );
        }

        resetRecs () {
                this.recs = [ ];
        }

        getRecs( ) {
            return this.recs;
        }
}

class Rec {
        public top : string;
        public left : string;
        public opacity : Number;
        public height : string;
        public width : string;
        public color : string;

        constructor( ) {
                this.top = "";
                this.left = "";
                this.opacity = 0;
                this.height = "";
                this.width = "";
                this.color = "";
        }

        getRec( ) {
                return {
                        "top": this.top, 
                        "left": this.left, 
                        "opacity": this.opacity,
                        "height": this.height,
                        "width": this.width,
                        "color": this.color
                }
        }
}

const myRecs = new RecList( );

export default function Component( props: Props ) {

        const [ recs, setRecs ] = useState( false )

        const height = 480
        const width  = 800
        let duration = "5s"
        let delay = "2s"
        let blur = "blur(50px)"

        const addPX = (v: Number) => {
                return v+"px"
        }

        useEffect( ( ) => {

                myRecs.resetRecs()

                for ( let i = 0 ; i < 5 ; i++ ) {

                        let myRec = new Rec( );

                        let opacity = ( Math.floor( Math.random( ) * 7 ) / 9 )
                        let temp_height = Math.floor( Math.random( ) * 350     + 1 )
                        let temp_width = Math.floor( Math.random( )  * 400     + 1 )
                        let temp_top = Math.floor( Math.random( )    * height  + 1 )
                        let temp_left = Math.floor( Math.random( )   * width   + 1 )
                        let colors = [
                                        props.vibrant,
                                        props.vibrant,
                                        props.vibrant,
                                        props.vibrant,
                                        props.vibrant,
                                        props.vibrant,
                                        props.lightmuted,
                                        props.lightvibrant,
                                        props.lightvibrant,
                                        props.lightvibrant,
                                        props.darkvibrant,
                                        props.darkvibrant,
                                        props.muted,
                                        props.muted,
                                        props.muted,
                                        props.muted,
                                        props.muted,
                                        props.lightvibrant,
                                        props.lightvibrant,
                                        props.lightvibrant,
                                        props.lightvibrant,
                                        props.darkvibrantlight
                        ]
                        let randomIndex = Math.floor(Math.random() * colors.length);
                        let color = colors[randomIndex];

                        temp_width < 100 ? temp_width += 100 : null
                        temp_height < 100 ? temp_height += 100 : null

                        if ( ( temp_top + temp_height ) > height ) {
                                temp_top -= (temp_top + temp_height ) - height
                        }
                        if ( ( temp_left + temp_width ) > height ) {
                                temp_left -= (temp_left + temp_width ) - width
                        }

                        myRec.opacity = opacity
                        myRec.top = addPX( temp_top )
                        myRec.left = addPX( temp_left )
                        myRec.height = addPX( temp_height )
                        myRec.width = addPX( temp_width )
                        myRec.color = color

                        myRecs.appendValueToList( myRec.getRec( ) )

                        setRecs( true )

                }

        }, [ props.reload ] )

        const loadedList = myRecs.getRecs()

        console.log( loadedList )

        return <>
                
                        <div className = { s.container_static }>

                                {recs == true && <>
                                        {React.Children.toArray( loadedList.map( ( rec: Object ) => ( <> 
                                                <div style = {{ 
                                                                position: "absolute",
                                                                filter: blur,
                                                                transitionDuration: duration,
                                                                transitionDelay: delay,
                                                                borderRadius: "80px",
                                                                top: rec.top,
                                                                left: rec.left,
                                                                opacity: rec.opacity,
                                                                height: rec.height,
                                                                width: rec.width,
                                                                backgroundColor: rec.color
                                                        }}>
                                                </div>
                                                </>
                                        )))}
                                </>}

                        </div>
                
        </>
}