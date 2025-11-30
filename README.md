# User-Video Management API (test1)

A RESTful API built with Node.js, Express, MySQL, and Sequelize for managing users and videos.

## Features

- **Authentication**: JWT-based authentication with register and login endpoints
- **User Management**: Full CRUD operations for users with avatar upload support
- **Video Management**: Create and retrieve video metadata with search and category filtering
- **Database**: MySQL with Sequelize ORM
- **Validation**: Request validation using Joi
- **File Upload**: Avatar image upload using Multer

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=video_learning
   DB_USER=root
   DB_PASSWORD=your_password
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   ```

3. Run migrations:
   ```bash
   npm run migrate
   ```

4. (Optional) Seed database:
   ```bash
   npm run seed
   ```

5. Start server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users (Protected)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/avatar` - Upload user avatar

### Videos
- `POST /videos` - Create a new video (protected)
- `GET /videos?search=&category=` - Get all videos with optional filters
- `GET /videos/:id` - Get video by ID
- `PUT /videos/:id` - Update video (protected)
- `DELETE /videos/:id` - Delete video (protected)

### Health Check
- `GET /health` - Health check endpoint

## Project Structure

```
test1/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, upload middleware
├── migrations/      # Database migrations
├── models/          # Sequelize models
├── routes/          # API routes
├── seeders/         # Database seeders
├── services/        # Business logic
├── scripts/         # Utility scripts
├── uploads/         # Uploaded files
├── server.js        # Application entry point
└── package.json     # Dependencies
```

## Deployment

### Railway
See `railway.json` for configuration. Deploy from GitHub with root directory set to `test1`.

### Render
See `render.yaml` for configuration. Note: Render uses PostgreSQL by default.

## Documentation

- **API Endpoints:** See API Endpoints section above
- **Health Check:** `GET /health` - Check if server is running

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```
