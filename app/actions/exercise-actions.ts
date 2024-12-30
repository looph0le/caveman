'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/db'

export async function createExercise(data: { name: string }) {
  await prisma.exercise.create({
    data: {
      name: data.name,
    },
  })
  revalidatePath('/admin/exercise')
}

export async function updateExercise(id: string, data: { name: string }) {
  await prisma.exercise.update({
    where: { id },
    data: {
      name: data.name,
    },
  })
}

export async function deleteExercise(id: string) {
  await prisma.exercise.delete({ where: { id } })
  revalidatePath('/admin/exercise')
}

export async function getExercise() {
  return prisma.exercise.findMany({
    orderBy: { id: 'desc' },
  })
}

