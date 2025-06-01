# 📸 ShutterConnect - Professional Photography Marketplace

A modern, full-stack photography marketplace that connects clients with verified professional photographers. Built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### Core Platform Features
- **User Authentication & Profiles** - Secure login/signup with NextAuth.js
- **Photographer Discovery** - Advanced search and filtering system
- **Booking System** - Real-time availability and instant booking
- **Payment Processing** - Secure payments with Stripe integration
- **Photo Management** - Upload, organize, and deliver photos
- **Review & Rating System** - Build trust through verified reviews
- **Real-time Messaging** - Direct communication between clients and photographers
- **Admin Dashboard** - Platform management and analytics

### User Types
1. **Clients** - Book photography sessions
2. **Photographers** - Offer services and manage bookings
3. **Admins** - Platform oversight and management

### Photography Categories
- Wedding Photography
- Portrait & Headshots
- Event Photography
- Commercial & Product
- Family Photography
- Newborn & Maternity
- Fashion Photography
- Real Estate & Architecture

## 🛠 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Hook Form** - Form management
- **Zustand** - State management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system
- **bcryptjs** - Password hashing

### Third-party Services
- **Stripe** - Payment processing
- **Cloudinary** - Image storage and optimization
- **Socket.io** - Real-time messaging
- **Google Maps API** - Location services

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- Cloudinary account (for image storage)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shutterconnect.git
cd shutterconnect
```

### 2. Environment Setup
Copy the example environment file and configure your variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables (see `.env.example` for all required variables):
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shutterconnect"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# And other required variables...
```

### 3. Backend Setup
```bash
cd backend

# Install backend dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:push

# (Optional) Seed the database
npm run db:seed
```

### 4. Frontend Setup
```bash
cd frontend

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔐 Authentication Features

ShutterConnect includes a comprehensive authentication system:

### ✅ Implemented Features
- **User Registration** - Email/password with role selection
- **Email Verification** - Required before account access
- **Password Reset** - Secure token-based password recovery
- **Google OAuth** - Sign in with Google account
- **Role-based Access** - Client/Photographer/Admin roles
- **Route Protection** - Middleware-based route security
- **Session Management** - JWT-based sessions with NextAuth.js

### 🚀 Quick Test
1. Visit `/auth/signup` to create an account
2. Check your email for verification link
3. Sign in at `/auth/signin`
4. Access your dashboard at `/dashboard`

For detailed authentication documentation, see [Authentication Guide](docs/AUTHENTICATION_GUIDE.md).

## 📁 Project Structure

```
shutterconnect/
├── frontend/              # Frontend application (Next.js)
│   ├── app/              # Next.js 14 App Router
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # User dashboard
│   │   ├── photographers/ # Photographer listings
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── layout/      # Layout components
│   │   └── home/        # Homepage components
│   ├── lib/             # Utility libraries
│   │   ├── prisma.ts    # Database client
│   │   ├── auth.ts      # Auth configuration
│   │   └── utils.ts     # Helper functions
│   ├── types/           # TypeScript type definitions
│   ├── middleware.ts    # Next.js middleware
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend documentation
├── backend/             # Backend services
│   ├── prisma/         # Database schema and migrations
│   │   └── schema.prisma # Prisma schema
│   ├── scripts/        # Database seeding and utility scripts
│   ├── package.json    # Backend dependencies
│   └── README.md       # Backend documentation
├── docs/               # Project documentation
├── .env.example        # Environment variables template
├── .env.local          # Local environment variables
├── .gitignore          # Git ignore rules
└── README.md           # Main project documentation
```

## 🗄 Database Schema

### Core Models
- **User** - Base user information
- **Photographer** - Photographer profiles and settings
- **Booking** - Photography session bookings
- **Photo** - Uploaded photos and galleries
- **Review** - Client reviews and ratings
- **Message** - Real-time messaging
- **Package** - Photography service packages
- **Availability** - Photographer availability slots

### Key Relationships
- Users can be Clients, Photographers, or Admins
- Photographers have multiple Packages and Availability slots
- Bookings connect Clients with Photographers
- Photos belong to Photographers and can be linked to Bookings
- Reviews are tied to completed Bookings

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout

### Photographers
- `GET /api/photographers` - List photographers with filters
- `POST /api/photographers` - Create photographer profile
- `GET /api/photographers/[id]` - Get photographer details
- `PUT /api/photographers/[id]` - Update photographer profile

### Bookings
- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get booking details
- `PUT /api/bookings/[id]` - Update booking status

### Photos
- `GET /api/photos` - List photos
- `POST /api/photos` - Upload new photo
- `DELETE /api/photos/[id]` - Delete photo

### Reviews
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/[id]` - Update review

## 🎨 UI Components

### Layout Components
- **Navbar** - Main navigation with user menu
- **Footer** - Site footer with links and newsletter
- **Sidebar** - Dashboard navigation

### UI Components
- **Button** - Customizable button component
- **Input** - Form input fields
- **Modal** - Overlay dialogs
- **Card** - Content containers
- **Badge** - Status indicators

### Feature Components
- **PhotographerCard** - Photographer listing item
- **BookingForm** - Session booking interface
- **PhotoGallery** - Image gallery with lightbox
- **ReviewCard** - Review display component
- **MessageThread** - Chat interface

## 🔒 Security Features

- **Authentication** - Secure user authentication with NextAuth.js
- **Authorization** - Role-based access control
- **Data Validation** - Input validation on client and server
- **SQL Injection Protection** - Prisma ORM prevents SQL injection
- **XSS Protection** - React's built-in XSS protection
- **CSRF Protection** - NextAuth.js CSRF protection
- **Secure Headers** - Security headers configuration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Docker
```bash
# Build Docker image
docker build -t shutterconnect .

# Run container
docker run -p 3000:3000 shutterconnect
```

## 📊 Performance Optimization

- **Image Optimization** - Next.js Image component with Cloudinary
- **Code Splitting** - Automatic code splitting with Next.js
- **Caching** - API response caching and static generation
- **Database Optimization** - Efficient queries with Prisma
- **CDN** - Static asset delivery via CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@shutterconnect.com or join our Discord community.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Stripe](https://stripe.com/) - Payment processing
- [Cloudinary](https://cloudinary.com/) - Image management
