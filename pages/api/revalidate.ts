// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{revalidated: Boolean} | { message: string } | string>
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'invalid token' })
  }
  try {
    await res.revalidate('/');
    return res.json({revalidated: true})
  } catch (error) {
    return res.status(500).send('Error revalidating');
  }
}
