#!/bin/sh
# Debug environment variables
echo "=== Debugging Environment Variables ==="
node debug-env.js

# Run migrations before starting the server
echo "Running database migrations..."
NODE_ENV=production npm run migrate
MIGRATION_EXIT_CODE=$?

if [ $MIGRATION_EXIT_CODE -ne 0 ]; then
  echo "⚠️  Migration failed with exit code $MIGRATION_EXIT_CODE"
  echo "Attempting to continue anyway..."
else
  echo "✓ Migrations completed successfully"
fi

echo "Starting server..."
npm start

