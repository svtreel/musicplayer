// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  data: object
}
export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
    const url = "http://192.168.0.31/s/bluesound/displayOff.py"
    const r = await fetch( url )
    res.status( 200 )
    console.log( r )
}
