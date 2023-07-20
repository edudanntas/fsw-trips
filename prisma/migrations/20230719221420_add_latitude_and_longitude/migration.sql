/*
  Warnings:

  - Added the required column `latitude` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0;
