/*
  Warnings:

  - The primary key for the `Rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idOffer` on the `Rate` table. All the data in the column will be lost.
  - Added the required column `idPaintings` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rate" (
    "idUser" INTEGER NOT NULL,
    "idPaintings" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,

    PRIMARY KEY ("idUser", "idPaintings"),
    CONSTRAINT "Rate_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rate_idPaintings_fkey" FOREIGN KEY ("idPaintings") REFERENCES "Paintings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rate" ("createdAt", "idUser", "updateAt", "value") SELECT "createdAt", "idUser", "updateAt", "value" FROM "Rate";
DROP TABLE "Rate";
ALTER TABLE "new_Rate" RENAME TO "Rate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
