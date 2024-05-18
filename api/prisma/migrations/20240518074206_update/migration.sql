/*
  Warnings:

  - Added the required column `genreId` to the `Novel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Novel` ADD COLUMN `genreId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Novel` ADD CONSTRAINT `Novel_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
