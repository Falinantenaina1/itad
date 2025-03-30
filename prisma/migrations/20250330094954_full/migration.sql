/*
  Warnings:

  - Added the required column `bath` to the `Trano` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Trano` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toerana` to the `Trano` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trano` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wc` to the `Trano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trano` ADD COLUMN `bath` ENUM('INTERIEUR', 'EXTERIEUR') NOT NULL,
    ADD COLUMN `caution` INTEGER NULL,
    ADD COLUMN `commission` INTEGER NULL,
    ADD COLUMN `desc` VARCHAR(191) NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `toerana` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `wc` ENUM('INTERIEUR', 'EXTERIEUR') NOT NULL,
    ALTER COLUMN `type` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Trano` ADD CONSTRAINT `Trano_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
