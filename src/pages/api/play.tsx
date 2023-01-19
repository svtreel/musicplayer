// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  data: object
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
        const url = "http://192.168.0.222:11000/Play"
        const r = fetch(url)
}
