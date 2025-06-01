# ShutterConnect Frontend

This directory contains the frontend application for ShutterConnect, built with Next.js, React, and Tailwind CSS.

## Structure

```
frontend/
├── app/              # Next.js App Router pages and layouts
├── components/       # Reusable React components
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
├── middleware.ts     # Next.js middleware
├── package.json      # Frontend dependencies
└── README.md         # This file
```

## Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables (copy from root .env.local)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- **Authentication**: NextAuth.js with email/password and OAuth
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Tailwind CSS with custom components
- **Forms**: React Hook Form with Zod validation
- **File Upload**: Cloudinary integration
- **Payments**: Stripe integration
- **Real-time**: Socket.io for messaging
- **Email**: Nodemailer for notifications

## Key Pages

- `/` - Homepage with photographer showcase
- `/auth/signup` - User registration
- `/auth/signin` - User login
- `/dashboard` - User dashboard (role-based)
- `/photographers` - Browse photographers
- `/booking` - Booking system
- `/messages` - Real-time messaging

## Environment Variables

Make sure to set up the following environment variables:

- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - NextAuth secret
- `DATABASE_URL` - PostgreSQL connection string
- `CLOUDINARY_*` - Image upload configuration
- `STRIPE_*` - Payment processing
- `SMTP_*` - Email configuration

See `.env.example` in the root directory for all required variables.
