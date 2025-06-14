-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('PUPPY');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('LOW');

-- CreateEnum
CREATE TYPE "PetIndependence" AS ENUM ('SMALL');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('WIDE');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "PetAge" NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy" "PetEnergy" NOT NULL,
    "independence" "PetIndependence" NOT NULL,
    "environment" "PetEnvironment" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
