import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

const { sequelize } = db;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User-Video Management API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login'
      },
      users: {
        getAll: 'GET /users (protected)',
        getById: 'GET /users/:id (protected)',
        update: 'PUT /users/:id (protected)',
        delete: 'DELETE /users/:id (protected)',
        uploadAvatar: 'POST /users/:id/avatar (protected)'
      },
      videos: {
        create: 'POST /videos (protected)',
        getAll: 'GET /videos?search=&category=',
        getById: 'GET /videos/:id'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database connection with retry logic
async function connectDatabase(retries = 5, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✓ Database connection established successfully.');
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1}/${retries} failed:`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Unable to connect to the database after all retries:', error);
        return false;
      }
    }
  }
  return false;
}

// Run migrations programmatically using Sequelize
async function runMigrations() {
  try {
    console.log('Checking if migrations are needed...');
    
    // Check if users table exists
    const [tables] = await sequelize.query("SHOW TABLES LIKE 'users'");
    if (tables.length > 0) {
      console.log('✓ Database tables already exist');
      return true;
    }

    console.log('Tables not found, running migrations...');
    
    // Import and run migrations directly
    const createUsers = (await import('./migrations/20240101000001-create-users.mjs')).default;
    const createVideos = (await import('./migrations/20240101000002-create-videos.mjs')).default;
    
    const queryInterface = sequelize.getQueryInterface();
    const Sequelize = sequelize.constructor;
    
    await createUsers.up(queryInterface, Sequelize);
    console.log('✓ Created users table');
    
    await createVideos.up(queryInterface, Sequelize);
    console.log('✓ Created videos table');
    
    console.log('✓ All migrations completed successfully');
    return true;
  } catch (error) {
    console.error('⚠️  Migration error:', error.message);
    console.error(error.stack);
    
    // Check if tables exist despite error
    try {
      const [tables] = await sequelize.query("SHOW TABLES LIKE 'users'");
      if (tables.length > 0) {
        console.log('✓ Tables exist despite migration error, continuing...');
        return true;
      }
    } catch (e) {
      // Ignore check error
    }
    
    return false;
  }
}

// Database connection and server start
async function startServer() {
  try {
    // Connect to database with retries
    const dbConnected = await connectDatabase();
    
    if (!dbConnected) {
      console.error('Failed to connect to database. Server will not start.');
      process.exit(1);
    }

    // Run migrations if tables don't exist
    const tablesExist = await sequelize.query('SHOW TABLES LIKE "users"')
      .then(([results]) => results.length > 0)
      .catch(() => false);

    if (!tablesExist) {
      console.log('Tables not found, running migrations...');
      const migrationsSuccess = await runMigrations();
      if (!migrationsSuccess) {
        console.error('Failed to run migrations. Server will not start.');
        process.exit(1);
      }
    }

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ API available at http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✓ Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

startServer();

export default app;