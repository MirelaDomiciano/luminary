/**
 * @openapi
 * tags:
 *  - name: User Preferences
 *    description: Endpoints related to user preferences
 * 
 * /preferences:
 *   get:
 *     tags:
 *       - User Preferences
 *     summary: Gets the logged-in user's preferences
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferences returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPreferences'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Preferences not found
 *
 *   post:
 *     tags:
 *       - User Preferences
 *     summary: Creates preferences for logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreferencesInput'
 *     responses:
 *       201:
 *         description: Preferences created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       409:
 *         description: User already has preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already has preferences"
 *                 preferenceId:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *
 *   patch:
 *     tags:
 *       - User Preferences
 *     summary: Updates preferences for logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreferencesInput'
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or preferences not found
 *
 *   delete:
 *     tags:
 *       - User Preferences
 *     summary: Deletes preferences for logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferences deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or preferences not found
 * 
 * components:
 *   schemas:
 *     UserPreferencesInput:
 *       type: object
 *       properties:
 *         genreIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["550e8400-e29b-41d4-a716-446655440001", "550e8400-e29b-41d4-a716-446655440002"]
 *         actorIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["550e8400-e29b-41d4-a716-446655440003", "550e8400-e29b-41d4-a716-446655440004"]
 *         directorIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["550e8400-e29b-41d4-a716-446655440005", "550e8400-e29b-41d4-a716-446655440006"]
 *     UserPreferences:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         userId:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         genres:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *           example: [{"id": "550e8400-e29b-41d4-a716-446655440001", "name": "Action"}, {"id": "550e8400-e29b-41d4-a716-446655440002", "name": "Comedy"}]
 *         actors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *           example: [{"id": "550e8400-e29b-41d4-a716-446655440003", "name": "Tom Hanks"}, {"id": "550e8400-e29b-41d4-a716-446655440004", "name": "Leonardo DiCaprio"}]
 *         directors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *           example: [{"id": "550e8400-e29b-41d4-a716-446655440005", "name": "Christopher Nolan"}, {"id": "550e8400-e29b-41d4-a716-446655440006", "name": "Quentin Tarantino"}]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00Z"
 */ 