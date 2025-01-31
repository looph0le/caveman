-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "tracker_record" (
    "tr_id" SERIAL NOT NULL,
    "tr_user_id" TEXT NOT NULL,
    "tr_ex_name" TEXT NOT NULL,
    "tr_set" INTEGER NOT NULL,
    "tr_rep" INTEGER NOT NULL,
    "tr_weight" DOUBLE PRECISION NOT NULL,
    "tr_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracker_record_pkey" PRIMARY KEY ("tr_id")
);
