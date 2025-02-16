/*
  Warnings:

  - You are about to drop the `Offerts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Offerts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Paintings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactEmail" TEXT,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" DATETIME NOT NULL,
    "idCategory" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Paintings_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rate" (
    "idUser" INTEGER NOT NULL,
    "idOffer" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,

    PRIMARY KEY ("idUser", "idOffer"),
    CONSTRAINT "Rate_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rate_idOffer_fkey" FOREIGN KEY ("idOffer") REFERENCES "Paintings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rate" ("createdAt", "idOffer", "idUser", "updateAt", "value") SELECT "createdAt", "idOffer", "idUser", "updateAt", "value" FROM "Rate";
DROP TABLE "Rate";
ALTER TABLE "new_Rate" RENAME TO "Rate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
