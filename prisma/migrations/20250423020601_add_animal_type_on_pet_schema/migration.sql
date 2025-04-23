/*
  Warnings:

  - Added the required column `type` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('CACHORRO', 'GATO');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "type" "AnimalType" NOT NULL;
