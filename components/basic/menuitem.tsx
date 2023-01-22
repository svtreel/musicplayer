import s from './menuitem.module.css'
import React from 'react';

interface Props {
        label: string;
        action: Function;
        colour: string;
        icon: string;
}

export default function Component( props: Props ) {

        const colour = props.colour ? "3px solid" + props.colour : "white"

        return <> 
            <div className={ s.container } onClick = { ( e ) => props.action( props.label ) }>
                {/* <div className="material-icons-outlined"
                        style = {{ border: colour }}>
                    { props.icon }
                </div> */}
                <div>
                    { props.label }
                </div>
            </div>
        </>
}