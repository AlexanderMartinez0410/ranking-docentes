/*
  Warnings:

  - You are about to drop the column `is_actived` on the `tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tags` DROP COLUMN `is_actived`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `person` (
    `id_person` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_person`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `id_attachments` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_attachments`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id_teachers` INTEGER NOT NULL AUTO_INCREMENT,
    `id_attachments` INTEGER NULL,
    `is_active` BOOLEAN NOT NULL,
    `id_person` INTEGER NOT NULL,

    UNIQUE INDEX `teachers_id_person_key`(`id_person`),
    PRIMARY KEY (`id_teachers`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_id_person_fkey` FOREIGN KEY (`id_person`) REFERENCES `person`(`id_person`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_id_attachments_fkey` FOREIGN KEY (`id_attachments`) REFERENCES `attachments`(`id_attachments`) ON DELETE SET NULL ON UPDATE CASCADE;
