/*
  Warnings:

  - You are about to alter the column `image` on the `Waifu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(40)`.

*/
-- AlterTable
ALTER TABLE "Waifu" ALTER COLUMN "image" SET DATA TYPE VARCHAR(40);
