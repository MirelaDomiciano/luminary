/*
  Warnings:

  - A unique constraint covering the columns `[contentId,seasonNumber,episodeNumber]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId]` on the table `Recommendation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserPreferences` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contentId]` on the table `ViewHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Episode_contentId_seasonNumber_episodeNumber_key" ON "Episode"("contentId", "seasonNumber", "episodeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_contentId_key" ON "Rating"("userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_userId_contentId_key" ON "Recommendation"("userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ViewHistory_userId_contentId_key" ON "ViewHistory"("userId", "contentId");
