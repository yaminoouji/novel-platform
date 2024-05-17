/*
  Warnings:

  - Added the required column `chapterNumber` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chapter` ADD COLUMN `chapterNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Novel` ADD COLUMN `customOrdering` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` MODIFY `location` VARCHAR(191) NULL,
    MODIFY `profilePicture` VARCHAR(191) NULL,
    MODIFY `coverPicture` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CustomChapterOrdering` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `novelId` INTEGER NOT NULL,
    `order` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomChapterOrdering` ADD CONSTRAINT `CustomChapterOrdering_novelId_fkey` FOREIGN KEY (`novelId`) REFERENCES `Novel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
