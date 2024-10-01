/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToGameText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToGameText" DROP CONSTRAINT "_CategoryToGameText_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToGameText" DROP CONSTRAINT "_CategoryToGameText_B_fkey";

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "GameText";

-- DropTable
DROP TABLE "_CategoryToGameText";

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToQuote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToQuote_AB_unique" ON "_CategoryToQuote"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToQuote_B_index" ON "_CategoryToQuote"("B");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToQuote" ADD CONSTRAINT "_CategoryToQuote_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToQuote" ADD CONSTRAINT "_CategoryToQuote_B_fkey" FOREIGN KEY ("B") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
