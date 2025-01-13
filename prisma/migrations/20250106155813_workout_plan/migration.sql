-- CreateTable
CREATE TABLE "workout_plan" (
    "wp_id" SERIAL NOT NULL,
    "wp_user_id" TEXT NOT NULL,
    "wp_day" TEXT NOT NULL,
    "wp_ex_id" INTEGER NOT NULL,
    "wp_sets" INTEGER NOT NULL,
    "wp_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_plan_pkey" PRIMARY KEY ("wp_id")
);
