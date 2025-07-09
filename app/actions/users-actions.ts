'use server'

import { prisma } from '@/app/db'

export async function getUsers() {
  return prisma.user.findMany({
  })
}
