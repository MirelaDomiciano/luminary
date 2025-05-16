# Luminary

Luminary is a personalized recommendation system for movies and series. It helps users discover new content tailored to their individual tastes, saving them time and effort in finding something great to watch. The system provides recommendations based on user preferences, viewing history, ratings, and other criteria.

## Features

- Personalized movie and series recommendations
- User preference tracking
- Rating system for content
- Discovery of new content based on viewing history
- User-friendly interface
- Content management (movies and series)
- User authentication and authorization with JWT
- API documentation with Swagger

## Technologies

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger UI with swagger-jsdoc
- **Containerization**: Docker and Docker Compose

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose 
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository
   ```
   git clone https://github.com/MirelaDomiciano/luminary.git
   cd luminary
   ```

2. Install dependencies
   ```
   # Install backend dependencies
   cd backend
   npm install
   ```

3. Configure the application
   ```
   # Create environment file
   cp .env.example .env
   
   # Edit the .env file with your configurations:
   # - Set PostgreSQL connection string
   # - Configure JWT secret for authentication
   ```

4. Setup database
   ```
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database with initial data
   npx prisma db seed
   ```

### Running the application

1. Using npm
    ```
    # Development mode
    npm run dev
    ```

2. Using Docker
    ```
    # Build the Docker images
    docker compose build
    
    # Start the services
    docker compose up
    
    # Run in detached mode (background)
    docker compose up -d
    ```

### API Documentation

The API documentation is available via Swagger UI at:
```
http://localhost:3000/docs
```

You can explore and test all API endpoints directly from this interface.

## Data Models

Luminary uses the following main data models:

- **User**: User accounts and authentication
- **Content**: Movies and series information
- **Rating**: User ratings for content
- **Recommendation**: Personalized content recommendations
- **Genre**: Content categories
- **Person**: Actors and directors
- **UserPreferences**: User genre, actor, and director preferences
- **ViewHistory**: User content viewing history
- **Episode**: Series episodes information

## Project Structure

```
luminary/
├── README.md           # Project documentation
├── LICENSE             # License information
├── .gitignore          # Git ignore file
├── docker-compose.yaml # Docker compose configuration
├── package.json        # Root package configuration
├── backend/            # Backend application
│   ├── src/            # Source code
│   │   ├── server.ts           # Server entry point
│   │   ├── controllers/        # Request handlers
│   │   ├── middlewares/        # Express middlewares
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   ├── schemas/            # Validation schemas
│   │   ├── repositories/       # Data access layer
│   │   └── types/              # TypeScript type definitions
│   ├── prisma/         # Database ORM configuration
│   │   ├── schema.prisma       # Database models
│   │   ├── seed.ts             # Seed data script
│   │   └── migrations/         # Database migrations
│   ├── package.json    # Backend dependencies
│   └── tsconfig.json   # TypeScript configuration
├── docs/               # Documentation files
└── volumes/            # Docker volumes
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

