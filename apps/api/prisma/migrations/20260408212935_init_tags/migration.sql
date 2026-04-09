-- CreateTable
CREATE TABLE `tags` (
    `id_tags` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_actived` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_tags`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
