'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/db'

export async function createWeight(data: { type: string; kg: number }) {
  const lbs = data.kg * 2.20462
  await prisma.weight.create({
    data: {
      type: data.type,
      kg: data.kg,
      lbs: parseFloat(lbs.toFixed(2)),
    },
  })
  revalidatePath('/weights')
}

export async function updateWeight(id: string, data: { type: string; kg: number }) {
  const lbs = data.kg * 2.20462
  await prisma.weight.update({
    where: { id },
    data: {
      type: data.type,
      kg: data.kg,
      lbs: parseFloat(lbs.toFixed(2)),
    },
  })
  revalidatePath('/weights')
}

export async function deleteWeight(id: string) {
  await prisma.weight.delete({ where: { id } })
  revalidatePath('/weights')
}

export async function getWeights() {
  return prisma.weight.findMany({
    orderBy: { kg: 'desc' },
  })
}

