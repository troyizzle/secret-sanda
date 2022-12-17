-- CreateTable
CREATE TABLE "AvailablePeople" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailablePeople_pkey" PRIMARY KEY ("id")
);
