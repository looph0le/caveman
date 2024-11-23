import { getServerSession } from 'next-auth'
import db from '../index'
import { PrismaClient } from '@prisma/client'

const session = getServerSession(PrismaClient);

function getUserData() {
  const user = await db.user.findUnique({
    where: {
      email: 'session.user.name',
    },
  })
}
