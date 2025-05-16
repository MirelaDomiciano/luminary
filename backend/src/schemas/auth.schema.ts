/**
 * @openapi
 * tags:
 *  - name: Authentication
 *    description: Endpoints related to login and token issuance
 * 
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Performs login and generates a JWT token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Successful login, returns the JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid data (missing email or password)
 *       401:
 *         description: User not found or invalid password
 * 
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: password123
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login successful!
 *         token:
 *           type: string
 *           example: eyJhbGciOiJzI1NiIsInRCIjoiS...
 */ 