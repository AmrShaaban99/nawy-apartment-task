#!/bin/sh
set -e

echo "Applying migrations..."
npm run migration:run:prod

echo "Seeding data..."
npm run seed:prod

exec "$@" 