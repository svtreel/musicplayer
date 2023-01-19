import s from './service.module.css'
import Image from 'next/image'

interface Props {
    service: string;
    serviceIcon: string;
}

export default function Component( props: Props ) {

        return <>
                <div className={ s.container }>
                        <img className={ s.icon }
                                src = { "http://192.168.0.222:11000" + props.serviceIcon }
                                alt = "ServiceIcon"
                        />
                        <span className={ s.text }> { props.service } </span>
                </div>
        </>
}