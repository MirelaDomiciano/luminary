import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import contentRoutes from './routes/content.route';
import userRoutes from './routes/user.route';
import userPreferencesRoutes from './routes/userPreferences.route';
import authRoutes from './routes/auth.route';

const app = express();
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Luminary API',
      version: '1.0.0',
      description: 'API para gerenciamento de conteúdo e usuários do Luminary',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/schemas/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// Rotas da API
app.use('/content', contentRoutes);
app.use('/users', userRoutes);
app.use('/preferences', userPreferencesRoutes);
app.use('/auth', authRoutes);

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;