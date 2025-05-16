/**
 * @openapi
 * tags:
 *  - name: Preferências de Usuário
 *    description: Endpoints relacionados às preferências de usuários
 * 
 * /preferences:
 *   get:
 *     tags:
 *       - Preferências de Usuário
 *     summary: Obtém as preferências do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferências retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Preferências não encontradas
 *
 *   post:
 *     tags:
 *       - Preferências de Usuário
 *     summary: Cria ou atualiza as preferências do usuário
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
 *         description: Preferências criadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       200:
 *         description: Preferências atualizadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 * components:
 *   schemas:
 *     UserPreferencesInput:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           enum: [light, dark, system]
 *           example: dark
 *         notifications:
 *           type: boolean
 *           example: true
 *         contentPreferences:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tecnologia", "ciência", "educação"]
 *         language:
 *           type: string
 *           example: pt-BR
 *     UserPreferences:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *         userId:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *         theme:
 *           type: string
 *           enum: [light, dark, system]
 *           example: dark
 *         notifications:
 *           type: boolean
 *           example: true
 *         contentPreferences:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tecnologia", "ciência", "educação"]
 *         language:
 *           type: string
 *           example: pt-BR
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-01-01T12:00:00Z
 */ 