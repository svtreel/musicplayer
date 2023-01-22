import React from 'react';
import s from './menu.module.css'
import MenuItem from './menuitem'

interface Props {
        action: Function;
}

export default function Component( props: Props ) {

        return <>
            <div className={s.container}>
                <MenuItem
                    label = "Music"
                    icon = "nightlife"
                    colour = "#ed64e6"
                    action = { props.action }
                />
                <MenuItem
                    label = "Presets"
                    icon = "star_rate"
                    colour = "#8e6ee6"
                    action = { props.action }
                />
                <MenuItem
                    label = "Radio"
                    icon = "radio"
                    colour = "#6ee6ce"
                    action = { props.action }
                />
                <MenuItem
                    label = "Clock"
                    icon = "schedule"
                    colour = "#e6d86e"
                    action = { props.action }
                />
                <MenuItem
                    label = "Off"
                    icon = "power_settings_new"
                    colour = "#eee"
                    action = { props.action }
                />
            </div>
        </>
}