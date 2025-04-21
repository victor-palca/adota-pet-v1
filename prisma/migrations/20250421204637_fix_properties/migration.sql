/*
  Warnings:

  - Changed the type of `animalSex` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AnimalSex" AS ENUM ('MACHO', 'FEMEA');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "animalSex",
ADD COLUMN     "animalSex" "AnimalSex" NOT NULL;
