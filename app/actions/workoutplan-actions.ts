'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/app/db'

export async function createWorkoutplan(wp_user_id: string, wp_day: string, wp_ex_name: string, wp_sets: number) {
  await prisma.workoutPlan.create({
    data: {
      wp_user_id: wp_user_id,
      wp_day: wp_day,
      wp_ex_name: wp_ex_name,
      wp_sets: wp_sets
    },
  })
  revalidatePath('/workoutplan')
}

export async function updateWorkoutplan(wp_id: number, wp_user_id: string, wp_day: string, wp_ex_name: string, wp_sets: number) {
  await prisma.workoutPlan.update({
    where: { wp_id },
    data: {
      wp_user_id: wp_user_id,
      wp_day: wp_day,
      wp_ex_name: wp_ex_name,
      wp_sets: wp_sets
    },
  })
}

export async function deleteWorkoutplan(wp_id: number) {
  await prisma.workoutPlan.delete({ where: { wp_id } })
  revalidatePath('/workoutplan')
}

export async function getWorkoutplan() {
  return prisma.workoutPlan.findMany({
    orderBy: { wp_id: 'desc' },
  })
}

export async function getWorkoutPlanByUser(wp_user_id: string){
  return prisma.workoutPlan.findMany({
    where: { wp_user_id: wp_user_id },
  })
}

export async function getWorkoutPlanByDay(wp_user_id: string, wp_day: string){
  return prisma.workoutPlan.findMany({
    where: { wp_day: wp_day, wp_user_id: wp_user_id },
  })
}
