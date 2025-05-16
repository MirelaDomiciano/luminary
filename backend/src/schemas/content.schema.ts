/**
 * @openapi
 * tags:
 *  - name: Content
 *    description: Endpoints related to content management
 * 
 * /content:
 *   get:
 *     tags:
 *       - Content
 *     summary: List all contents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contents returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       401:
 *         description: Unauthorized
 *
 * /content/movies:
 *   post:
 *     tags:
 *       - Content
 *     summary: Create a new movie
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *
 * /content/series:
 *   post:
 *     tags:
 *       - Content
 *     summary: Create a new series
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeriesInput'
 *     responses:
 *       201:
 *         description: Series created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *
 * /content/{id}:
 *   get:
 *     tags:
 *       - Content
 *     summary: Search a content by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Content found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 *
 *   patch:
 *     tags:
 *       - Content
 *     summary: Update a content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentInput'
 *     responses:
 *       200:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 *
 *   delete:
 *     tags:
 *       - Content
 *     summary: Remove a content
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content ID
 *     responses:
 *       204:
 *         description: Content removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 *
 * components:
 *   schemas:
 *     ContentInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: "Game of Thrones"
 *         description:
 *           type: string
 *           example: "A Game of Thrones is a fantasy novel written by George R. R. Martin. It is the first book in the A Song of Ice and Fire series."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["fantasy_id", "drama_id", "adventure_id"]
 *     MovieInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - releaseDate
 *         - duration
 *         - rating
 *         - studio
 *         - boxOffice
 *         - directorId
 *       properties:
 *         title:
 *           type: string
 *           example: "Interstellar"
 *         description:
 *           type: string
 *           example: "In a future where the Earth is becoming uninhabitable, a group of astronauts travels through a wormhole in search of a new home for humanity."
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           example: "2014-11-07T00:00:00.000Z"
 *         duration:
 *           type: number
 *           example: 169
 *         rating:
 *           type: number
 *           example: 8.7
 *         studio:
 *           type: string
 *           example: "Paramount Pictures"
 *         boxOffice:
 *           type: number
 *           example: 701800000
 *         directorId:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
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
 *     SeriesInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - releaseDate
 *         - duration
 *         - rating
 *         - numberOfSeasons
 *         - currentStatus
 *         - directorId
 *       properties:
 *         title:
 *           type: string
 *           example: "Stranger Things"
 *         description:
 *           type: string
 *           example: "When a boy disappears, a small town discovers a mystery involving secret experiments, terrifying supernatural forces, and an unusual girl."
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           example: "2016-07-15T00:00:00.000Z"
 *         duration:
 *           type: number
 *           example: 50
 *         rating:
 *           type: number
 *           example: 8.7
 *         numberOfSeasons:
 *           type: number
 *           example: 4
 *         currentStatus:
 *           type: string
 *           example: "In production"
 *         directorId:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
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
 *     Content:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f89a2c7b91c20a3e8f5d21"
 *         title:
 *           type: string
 *           example: "Interstellar"
 *         description:
 *           type: string
 *           example: "In a future where the Earth is becoming uninhabitable, a group of astronauts travels through a wormhole in search of a new home for humanity."
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           example: "2014-11-07T00:00:00.000Z"
 *         duration:
 *           type: number
 *           example: 169
 *         rating:
 *           type: number
 *           example: 8.7
 *         type:
 *           type: string
 *           enum: [MOVIE, SERIES]
 *           example: "MOVIE"
 *         studio:
 *           type: string
 *           example: "Paramount Pictures"
 *         boxOffice:
 *           type: number
 *           example: 701800000
 *         numberOfSeasons:
 *           type: number
 *           example: null
 *         currentStatus:
 *           type: string
 *           example: null
 *         director:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *             name:
 *               type: string
 *               example: "Christopher Nolan"
 *         genres:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440001"
 *               name:
 *                 type: string
 *                 example: "Ficção Científica"
 *         actors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440003"
 *               name:
 *                 type: string
 *                 example: "Matthew McConaughey"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-09-06T09:48:12Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-09-10T14:23:05Z"
 */ 