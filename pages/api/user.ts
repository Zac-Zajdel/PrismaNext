import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(_: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findFirst()
  res.json(user)
}
