/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Waifu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Waifu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Waifu" ADD COLUMN     "userId" VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Waifu_id_key" ON "Waifu"("id");

-- AddForeignKey
ALTER TABLE "Waifu" ADD CONSTRAINT "Waifu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
