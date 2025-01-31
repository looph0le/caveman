"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/app/db";

export async function createTrackerRecord(
  tr_user_id: string,
  tr_ex_name: string,
  tr_set: number,
  tr_rep: number,
  tr_weight: number,
) {
  await prisma.trackerRecord.create({
    data: {
      tr_user_id: tr_user_id,
      tr_ex_name: tr_ex_name,
      tr_set: tr_set,
      tr_rep: tr_rep,
      tr_weight: tr_weight,
    },
  });
  revalidatePath("/tracker");
}

export async function updateTrackerRecord(
  tr_id: number,
  tr_user_id: string,
  tr_ex_name: string,
  tr_set: number,
  tr_rep: number,
  tr_weight: number,
) {
  await prisma.trackerRecord.update({
    where: { tr_id },
    data: {
      tr_user_id: tr_user_id,
      tr_ex_name: tr_ex_name,
      tr_set: tr_set,
      tr_rep: tr_rep,
      tr_weight: tr_weight,
    },
  });
}

export async function getTrackerRecordByUserOfToday(
  tr_user_id: string,
  startOfDay: string,
  endOfDay: string,
) {
  return prisma.trackerRecord.findMany({
    where: {
      tr_user_id: tr_user_id,
      tr_created_at: {
        gte: new Date(startOfDay), // Greater than or equal to the start of the day
        lte: new Date(endOfDay), // Less than or equal to the end of the day
      },
    },
  });
}
