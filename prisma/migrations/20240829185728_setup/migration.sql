-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameText" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "GameText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToGameText" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGameText_AB_unique" ON "_CategoryToGameText"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGameText_B_index" ON "_CategoryToGameText"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToGameText" ADD CONSTRAINT "_CategoryToGameText_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGameText" ADD CONSTRAINT "_CategoryToGameText_B_fkey" FOREIGN KEY ("B") REFERENCES "GameText"("id") ON DELETE CASCADE ON UPDATE CASCADE;
