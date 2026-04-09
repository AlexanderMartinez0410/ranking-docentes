-- CreateTable
CREATE TABLE `periods` (
    `id_periods` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id_periods`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_users` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `id_person` INTEGER NOT NULL,
    `id_attachments` INTEGER NULL,
    `id_rol` INTEGER NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_id_person_key`(`id_person`),
    PRIMARY KEY (`id_users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id_reviews` INTEGER NOT NULL AUTO_INCREMENT,
    `valuation` DECIMAL(4, 2) NOT NULL,
    `opinion` VARCHAR(255) NOT NULL,
    `is_anonimys` BOOLEAN NOT NULL DEFAULT false,
    `id_user` INTEGER NOT NULL,
    `id_teacher` INTEGER NOT NULL,
    `id_periods` INTEGER NOT NULL,

    UNIQUE INDEX `reviews_id_user_id_teacher_id_periods_key`(`id_user`, `id_teacher`, `id_periods`),
    PRIMARY KEY (`id_reviews`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_person_fkey` FOREIGN KEY (`id_person`) REFERENCES `person`(`id_person`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_attachments_fkey` FOREIGN KEY (`id_attachments`) REFERENCES `attachments`(`id_attachments`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id_rol`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_users`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_id_teacher_fkey` FOREIGN KEY (`id_teacher`) REFERENCES `teachers`(`id_teachers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_id_periods_fkey` FOREIGN KEY (`id_periods`) REFERENCES `periods`(`id_periods`) ON DELETE RESTRICT ON UPDATE CASCADE;
