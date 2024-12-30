'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/db'

export async function getUsers() {
  return prisma.user.findMany({
  })
}
