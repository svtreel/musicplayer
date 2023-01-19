import s from './waitscreen.module.css'
import Loader from './loader'

export default function Component( props: object ) {

        return <> 
                <div className = { s.container }>
                        <Loader/>      
                </div>
        </>
}