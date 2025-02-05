/*
  Warnings:

  - You are about to drop the column `name` on the `Offerts` table. All the data in the column will be lost.
  - Added the required column `author` to the `Offerts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Offerts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offerts" (
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
    CONSTRAINT "Offerts_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Offerts" ("active", "contactEmail", "createdAt", "description", "expired", "id", "idCategory", "published", "updateAt") SELECT "active", "contactEmail", "createdAt", "description", "expired", "id", "idCategory", "published", "updateAt" FROM "Offerts";
DROP TABLE "Offerts";
ALTER TABLE "new_Offerts" RENAME TO "Offerts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
