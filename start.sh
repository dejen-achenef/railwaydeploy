#!/bin/sh
# Run migrations before starting the server
echo "Running database migrations..."
npm run migrate || echo "Migration failed, continuing anyway..."

echo "Starting server..."
npm start

