# ShutterConnect API Documentation

## Overview

The ShutterConnect API provides a comprehensive set of endpoints for managing users, photographers, bookings, photos, and payments in the photography marketplace platform.

## Base URL
```
Production: https://shutterconnect.com/api
Development: http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

## Authentication Endpoints

### POST /api/auth/signin
User authentication

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CLIENT"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /api/auth/signup
User registration

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

### POST /api/auth/forgot-password
Password reset request

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

## User Management Endpoints

### GET /api/users/profile
Get current user profile (Authenticated)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatar": "avatar_url",
    "role": "CLIENT",
    "isVerified": true,
    "createdAt": "2023-01-01T00:00:00Z"
  }
}
```

### PUT /api/users/profile
Update user profile (Authenticated)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "avatar": "avatar_url"
}
```

## Photographer Endpoints

### GET /api/photographers
List photographers with filters

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `category` (string): Photography category filter
- `location` (string): Location filter
- `minPrice` (number): Minimum hourly rate
- `maxPrice` (number): Maximum hourly rate
- `rating` (number): Minimum rating
- `q` (string): Search query

**Response:**
```json
{
  "success": true,
  "data": {
    "photographers": [
      {
        "id": "photographer_id",
        "user": {
          "firstName": "Jane",
          "lastName": "Smith",
          "avatar": "avatar_url"
        },
        "bio": "Professional photographer...",
        "hourlyRate": 150,
        "location": "San Francisco, CA",
        "specialties": ["WEDDING", "PORTRAIT"],
        "rating": 4.9,
        "totalReviews": 127,
        "portfolio": ["image_url_1", "image_url_2"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "totalPages": 9,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /api/photographers/:id
Get photographer details

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "photographer_id",
    "user": {
      "firstName": "Jane",
      "lastName": "Smith",
      "avatar": "avatar_url",
      "email": "jane@example.com"
    },
    "bio": "Professional photographer with 10+ years experience...",
    "experience": 10,
    "hourlyRate": 150,
    "location": "San Francisco, CA",
    "specialties": ["WEDDING", "PORTRAIT"],
    "equipment": ["Canon 5D Mark IV", "Sony A7R III"],
    "languages": ["English", "Spanish"],
    "portfolio": ["image_url_1", "image_url_2"],
    "rating": 4.9,
    "totalReviews": 127,
    "totalBookings": 89,
    "packages": [
      {
        "id": "package_id",
        "name": "Wedding Package",
        "description": "Full day wedding coverage",
        "price": 2500,
        "duration": 8,
        "deliverables": ["300+ edited photos", "Online gallery"]
      }
    ]
  }
}
```

### POST /api/photographers
Create photographer profile (Authenticated)

**Request Body:**
```json
{
  "bio": "Professional photographer...",
  "experience": 10,
  "hourlyRate": 150,
  "location": "San Francisco, CA",
  "specialties": ["WEDDING", "PORTRAIT"],
  "equipment": ["Canon 5D Mark IV"],
  "languages": ["English"],
  "portfolio": ["image_url_1", "image_url_2"]
}
```

## Booking Endpoints

### GET /api/bookings
List user bookings (Authenticated)

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Booking status filter
- `role` (string): 'client' or 'photographer'

**Response:**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "booking_id",
        "sessionType": "WEDDING",
        "date": "2023-12-25T00:00:00Z",
        "startTime": "10:00",
        "endTime": "18:00",
        "location": "Golden Gate Park, SF",
        "totalAmount": 2500,
        "status": "CONFIRMED",
        "paymentStatus": "COMPLETED",
        "client": {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com"
        },
        "photographer": {
          "user": {
            "firstName": "Jane",
            "lastName": "Smith"
          }
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### POST /api/bookings
Create new booking (Authenticated)

**Request Body:**
```json
{
  "photographerId": "photographer_id",
  "packageId": "package_id",
  "sessionType": "WEDDING",
  "date": "2023-12-25",
  "startTime": "10:00",
  "endTime": "18:00",
  "location": "Golden Gate Park, SF",
  "notes": "Special requirements...",
  "totalAmount": 2500
}
```

### PUT /api/bookings/:id
Update booking (Authenticated)

**Request Body:**
```json
{
  "status": "CONFIRMED",
  "notes": "Updated notes..."
}
```

## Photo Endpoints

### GET /api/photos
List photos (Authenticated)

**Query Parameters:**
- `bookingId` (string): Filter by booking
- `isPortfolio` (boolean): Portfolio photos only
- `page` (number): Page number
- `limit` (number): Items per page

### POST /api/photos/upload
Upload photos (Authenticated - Photographer only)

**Request Body (multipart/form-data):**
- `files`: Photo files
- `bookingId`: Associated booking ID
- `title`: Photo title
- `description`: Photo description
- `tags`: Comma-separated tags
- `isPortfolio`: Boolean for portfolio inclusion

## Payment Endpoints

### POST /api/payments/create-intent
Create payment intent (Authenticated)

**Request Body:**
```json
{
  "bookingId": "booking_id",
  "amount": 2500
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx"
  }
}
```

### POST /api/payments/confirm
Confirm payment (Authenticated)

**Request Body:**
```json
{
  "paymentIntentId": "pi_xxx",
  "bookingId": "booking_id"
}
```

## Review Endpoints

### GET /api/reviews
List reviews

**Query Parameters:**
- `photographerId` (string): Filter by photographer
- `page` (number): Page number
- `limit` (number): Items per page

### POST /api/reviews
Create review (Authenticated)

**Request Body:**
```json
{
  "bookingId": "booking_id",
  "rating": 5,
  "comment": "Amazing photographer!",
  "isPublic": true
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Invalid or missing authentication token |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `VALIDATION_ERROR` | Invalid request data |
| `CONFLICT` | Resource conflict (e.g., time slot already booked) |
| `PAYMENT_ERROR` | Payment processing failed |
| `UPLOAD_ERROR` | File upload failed |
| `RATE_LIMIT` | Too many requests |

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute
- Upload endpoints: 10 requests per minute

## Webhooks

### Stripe Webhooks
Endpoint: `/api/webhooks/stripe`

Supported events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.dispute.created`

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @shutterconnect/api-client
```

### Python
```bash
pip install shutterconnect-api
```

### PHP
```bash
composer require shutterconnect/api-client
```

## Support

For API support, contact:
- Email: api-support@shutterconnect.com
- Documentation: https://docs.shutterconnect.com
- Status Page: https://status.shutterconnect.com
