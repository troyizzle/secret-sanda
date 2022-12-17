/*
  Warnings:

  - You are about to drop the column `chosenPerson` on the `People` table. All the data in the column will be lost.
  - You are about to drop the `AvailablePeople` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chosenName` to the `People` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "People" DROP COLUMN "chosenPerson",
ADD COLUMN     "chosenName" TEXT NOT NULL;

-- DropTable
DROP TABLE "AvailablePeople";

-- DropTable
DROP TABLE "Example";
