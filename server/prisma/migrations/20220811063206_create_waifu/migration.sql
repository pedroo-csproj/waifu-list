-- CreateTable
CREATE TABLE "Waifu" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Waifu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Waifu_id_idx" ON "Waifu"("id");
