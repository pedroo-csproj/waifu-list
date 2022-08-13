-- CreateTable
CREATE TABLE "Waifu" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "lore" TEXT,
    "image" VARCHAR(100),
    "birthDate" TIMESTAMP(3),
    "origin" VARCHAR(40) NOT NULL,
    "myAnimeListUrl" VARCHAR NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Waifu_pkey" PRIMARY KEY ("id")
);
