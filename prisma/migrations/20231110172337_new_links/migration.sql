/*
  Warnings:

  - You are about to drop the `_GroupToLinks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToLinks" DROP CONSTRAINT "_GroupToLinks_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToLinks" DROP CONSTRAINT "_GroupToLinks_B_fkey";

-- DropTable
DROP TABLE "_GroupToLinks";

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
