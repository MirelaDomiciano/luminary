/**
 * @openapi
 * tags:
 *  - name: Conteúdo
 *    description: Endpoints relacionados ao gerenciamento de conteúdos
 * 
 * /content:
 *   get:
 *     tags:
 *       - Conteúdo
 *     summary: Lista todos os conteúdos
 *     responses:
 *       200:
 *         description: Lista de conteúdos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *
 *   post:
 *     tags:
 *       - Conteúdo
 *     summary: Cadastra um novo conteúdo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentInput'
 *     responses:
 *       201:
 *         description: Conteúdo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 * /content/{id}:
 *   get:
 *     tags:
 *       - Conteúdo
 *     summary: Busca um conteúdo pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do conteúdo
 *     responses:
 *       200:
 *         description: Conteúdo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Conteúdo não encontrado
 *
 *   put:
 *     tags:
 *       - Conteúdo
 *     summary: Atualiza um conteúdo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do conteúdo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentInput'
 *     responses:
 *       200:
 *         description: Conteúdo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Conteúdo não encontrado
 *
 *   delete:
 *     tags:
 *       - Conteúdo
 *     summary: Remove um conteúdo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do conteúdo
 *     responses:
 *       204:
 *         description: Conteúdo removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Conteúdo não encontrado
 *
 * components:
 *   schemas:
 *     ContentInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: Como usar o Swagger
 *         description:
 *           type: string
 *           example: Tutorial sobre como documentar APIs com Swagger
 *         content:
 *           type: string
 *           example: Conteúdo detalhado sobre Swagger...
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["api", "documentação", "swagger"]
 *     Content:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *         title:
 *           type: string
 *           example: Como usar o Swagger
 *         description:
 *           type: string
 *           example: Tutorial sobre como documentar APIs com Swagger
 *         content:
 *           type: string
 *           example: Conteúdo detalhado sobre Swagger...
 *         author:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 60d21b4667d0d8992e610c85
 *             name:
 *               type: string
 *               example: João Silva
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["api", "documentação", "swagger"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-01-01T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-01-02T14:30:00Z
 */ 