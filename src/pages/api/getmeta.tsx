// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data: object
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    try {

        const url = "http://0.0.0.0/s/bluesound/nodemeta.py"
        const r = await fetch( url )
        const data = await r.json().then( ( data ) => (
          res.status( 200 ).json( { data } )
        ))

    } catch ( err ) {

        const data = { error: 'failed to load data' }
        res.status( 500 ).json( { data } )
        console.log( data )

    }

}