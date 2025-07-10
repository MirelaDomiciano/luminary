import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import contentRoutes from './routes/content.route';
import userRoutes from './routes/user.route';
import userPreferencesRoutes from './routes/userPreferences.route';
import authRoutes from './routes/auth.route';
import genreRoutes from './routes/genre.route';
import personRoutes from './routes/person.route';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Permite Vite e outras origens
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.use('/genres', genreRoutes);
app.use('/persons', personRoutes);

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;