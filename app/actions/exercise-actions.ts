"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/app/db";

export async function createExercise(data: { name: string; type: string }) {
  await prisma.exercise.create({
    data: {
      name: data.name,
      type: data.type,
    },
  });
  revalidatePath("/admin/exercise");
}

export async function updateExercise(
  id: number,
  data: { name: string; type: string },
) {
  await prisma.exercise.update({
    where: { id },
    data: {
      name: data.name,
      type: data.type,
    },
  });
}

export async function deleteExercise(id: number) {
  await prisma.exercise.delete({ where: { id } });
  revalidatePath("/admin/exercise");
}

export async function getExercise() {
  return prisma.exercise.findMany({
    orderBy: { id: "desc" },
  });
}
