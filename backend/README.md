# ShutterConnect Backend

This directory contains the backend services for ShutterConnect, including database schema, migrations, and utility scripts.

## Structure

```
backend/
├── prisma/           # Database schema and migrations
├── scripts/          # Database seeding and utility scripts
├── package.json      # Backend dependencies
└── README.md         # This file
```

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment variables (copy from root .env.local)

3. Generate Prisma client:
   ```bash
   npm run db:generate
   ```

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Seed the database (optional):
   ```bash
   npm run db:seed
   ```

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database and run migrations

## Database

The application uses PostgreSQL with Prisma ORM. The database schema is defined in `prisma/schema.prisma`.

## Environment Variables

Make sure to set up the following environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token generation
- `SMTP_*` - Email configuration for notifications

See `.env.example` in the root directory for all required variables.
