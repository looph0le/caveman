-- CreateTable
CREATE TABLE "Weight" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "kg" DOUBLE PRECISION NOT NULL,
    "lbs" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);