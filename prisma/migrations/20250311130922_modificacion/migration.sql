/*
  Warnings:

  - Added the required column `expired` to the `Suggestion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Suggestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idUserCreator" INTEGER NOT NULL,
    "idPainting" INTEGER,
    CONSTRAINT "Suggestion_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suggestion_idPainting_fkey" FOREIGN KEY ("idPainting") REFERENCES "Paintings" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Suggestion" ("createdAt", "id", "idPainting", "idUserCreator", "message", "updatedAt") SELECT "createdAt", "id", "idPainting", "idUserCreator", "message", "updatedAt" FROM "Suggestion";
DROP TABLE "Suggestion";
ALTER TABLE "new_Suggestion" RENAME TO "Suggestion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
