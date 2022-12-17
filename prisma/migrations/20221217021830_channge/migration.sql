/*
  Warnings:

  - You are about to drop the column `person` on the `People` table. All the data in the column will be lost.
  - Added the required column `name` to the `People` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "People" DROP COLUMN "person",
ADD COLUMN     "name" TEXT NOT NULL;
