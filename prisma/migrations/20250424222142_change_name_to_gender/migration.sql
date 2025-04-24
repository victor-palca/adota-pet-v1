/*
  Warnings:

  - You are about to drop the column `animalSex` on the `pets` table. All the data in the column will be lost.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MACHO', 'FEMEA');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "animalSex",
ADD COLUMN     "gender" "GenderType" NOT NULL;

-- DropEnum
DROP TYPE "AnimalSex";
