/*
  Warnings:

  - You are about to drop the column `wp_ex_id` on the `workout_plan` table. All the data in the column will be lost.
  - Added the required column `wp_ex_name` to the `workout_plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_plan" DROP COLUMN "wp_ex_id",
ADD COLUMN     "wp_ex_name" TEXT NOT NULL;
