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


// Get tracker Record by User of Date(Now)
export async function getTrackerRecordByUserOfToday(
  tr_user_id: string,
  startOfDay: string,
  endOfDay: string,
) {
  return prisma.trackerRecord.findMany({
    where: {
      tr_user_id: tr_user_id,
      tr_created_at: {
        gte: new Date(startOfDay),
        lte: new Date(endOfDay),
      },
    },
  });
}


// Get Week Comparison Chart Data
export async function getWeeklyComparisonChartData(tr_user_id: string) {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );

  const weeklyData = await prisma.trackerRecord.findMany({
    where: {
      tr_user_id: tr_user_id,
      tr_created_at: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const weeklyDataByDay = days.map((day) => {
    return weeklyData.filter((record) => {
      const recordDay = new Date(record.tr_created_at).getDay();
      return days[recordDay] === day;
    });
  });

  const data: { day: string; duration: number }[] = [];
  weeklyDataByDay.forEach((dayData, i) => {
    if (dayData.length > 1) {
      const startTime = new Date(dayData[0].tr_created_at);
      const endTime = new Date(dayData[dayData.length - 1].tr_created_at);
      const diffMs = Math.abs(endTime.getTime() - startTime.getTime());
      const diffSeconds = Math.floor((diffMs / 1000) % 60);
      const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      // convert duration in hours decimal
      const duration = diffHours + diffMinutes / 60 + diffSeconds / 3600;

      data.push({
        day: days[new Date(dayData[0].tr_created_at).getDay()],
        duration,
      });
    } else {
      data.push({
        day: days[i],
        duration: 0,
      });
    }
  });

  return data;
}

export async function getMonthlyDayWiseData(tr_user_id: string) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const uniqueDays = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => i + 1,
  ).map((day) => ({
    day,
    color: "gray", // default color
  }));
  // get tracker records for the month
  const trackerRecords = await prisma.trackerRecord.findMany({
    where: {
      tr_user_id: tr_user_id,
      tr_created_at: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  // map tracker records to unique days
  trackerRecords.forEach((record) => {
    const recordDay = new Date(record.tr_created_at).getDate();
    const dayIndex = uniqueDays.findIndex((day) => day.day === recordDay);
    if (dayIndex !== -1) {
      uniqueDays[dayIndex].color = "green"; // set color to green if data is present
    }
  });
  // return the unique days with color
  return uniqueDays;
}
