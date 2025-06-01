# ShutterConnect Authentication System

## Overview

The ShutterConnect authentication system provides secure user registration, login, email verification, password reset, and role-based access control. Built with NextAuth.js, it supports both credential-based and OAuth authentication.

## Features

### ✅ Implemented Features

1. **User Registration & Login**
   - Email/password registration with validation
   - Secure password hashing with bcrypt
   - Email verification required before access
   - Role selection (Client/Photographer)

2. **Email Verification**
   - Automatic verification email on registration
   - Secure token-based verification
   - Resend verification functionality
   - Token expiration (24 hours)

3. **Password Management**
   - Forgot password with email reset
   - Secure password reset tokens (1 hour expiration)
   - Password strength validation
   - Change password for authenticated users

4. **OAuth Integration**
   - Google OAuth sign-in
   - Automatic account linking
   - Pre-verified OAuth accounts

5. **Security Features**
   - JWT-based sessions
   - Role-based access control
   - Route protection middleware
   - CSRF protection
   - Rate limiting on sensitive endpoints

6. **User Experience**
   - Responsive authentication pages
   - Real-time password strength indicator
   - Form validation with error messages
   - Loading states and success feedback

## File Structure

```
app/
├── auth/
│   ├── signin/page.tsx           # Sign in page
│   ├── signup/page.tsx           # Sign up page
│   ├── verify-email/page.tsx     # Email verification page
│   ├── forgot-password/page.tsx  # Forgot password page
│   └── reset-password/page.tsx   # Reset password page
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   ├── signup/route.ts           # User registration
│   │   ├── verify-email/route.ts     # Email verification
│   │   ├── resend-verification/route.ts # Resend verification
│   │   ├── forgot-password/route.ts  # Password reset request
│   │   └── reset-password/route.ts   # Password reset
│   └── user/
│       ├── profile/route.ts          # User profile management
│       └── change-password/route.ts  # Change password
├── dashboard/page.tsx            # Protected dashboard
└── providers.tsx                 # App providers

lib/
├── auth.ts                       # NextAuth configuration
├── validations/auth.ts           # Zod validation schemas
├── tokens.ts                     # Token generation utilities
└── email.ts                      # Email sending utilities

types/
└── next-auth.d.ts               # NextAuth type definitions

middleware.ts                     # Route protection middleware
```

## API Endpoints

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | User registration |
| `/api/auth/verify-email` | POST/GET | Email verification |
| `/api/auth/resend-verification` | POST | Resend verification email |
| `/api/auth/forgot-password` | POST | Request password reset |
| `/api/auth/reset-password` | POST/GET | Reset password |
| `/api/auth/[...nextauth]` | * | NextAuth endpoints |

### User Management Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/profile` | GET/PUT | User profile management |
| `/api/user/change-password` | POST | Change password |

## Environment Variables

Required environment variables for authentication:

```env
# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (for verification and password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# JWT
JWT_SECRET="your-jwt-secret-here"
```

## Usage Examples

### 1. User Registration

```typescript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    phone: '+1234567890',
    role: 'CLIENT',
    agreeToTerms: true,
  }),
})
```

### 2. Sign In with NextAuth

```typescript
import { signIn } from 'next-auth/react'

const result = await signIn('credentials', {
  email: 'john@example.com',
  password: 'SecurePass123!',
  redirect: false,
})
```

### 3. Google OAuth Sign In

```typescript
import { signIn } from 'next-auth/react'

await signIn('google', { callbackUrl: '/dashboard' })
```

### 4. Check Authentication Status

```typescript
import { useSession } from 'next-auth/react'

function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'unauthenticated') return <p>Not signed in</p>
  
  return <p>Signed in as {session.user.email}</p>
}
```

### 5. Server-side Authentication

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Handle authenticated request
}
```

## Security Considerations

### Password Security
- Minimum 8 characters with complexity requirements
- Bcrypt hashing with salt rounds of 12
- Password strength indicator for user feedback
- Prevention of password reuse

### Token Security
- Verification tokens expire in 24 hours
- Password reset tokens expire in 1 hour
- Secure random token generation
- Tokens are single-use only

### Session Security
- JWT-based sessions with 7-day expiration
- Secure HTTP-only cookies
- CSRF protection enabled
- Session invalidation on password change

### Email Security
- HTML and text email templates
- Secure token embedding in URLs
- Rate limiting on email sending
- Email verification required for account activation

## Role-Based Access Control

### User Roles
- **CLIENT**: Can book photographers and manage bookings
- **PHOTOGRAPHER**: Can offer services and manage portfolio
- **ADMIN**: Full system access (future implementation)

### Route Protection
```typescript
// middleware.ts automatically protects routes based on:
// - Authentication status
// - Email verification status
// - User role
// - Route patterns
```

### Protected Routes
- `/dashboard/*` - Requires authentication and verification
- `/photographer/*` - Requires photographer role
- `/admin/*` - Requires admin role (future)

## Error Handling

### Common Error Responses

```json
{
  "error": "Email and password are required",
  "details": { /* validation errors */ }
}
```

### Error Types
- `ValidationError`: Invalid input data
- `AuthenticationError`: Invalid credentials
- `AuthorizationError`: Insufficient permissions
- `VerificationError`: Email not verified
- `TokenError`: Invalid or expired tokens

## Testing

### Manual Testing Checklist

1. **Registration Flow**
   - [ ] Valid registration creates user
   - [ ] Duplicate email shows error
   - [ ] Password validation works
   - [ ] Verification email is sent
   - [ ] Role selection works

2. **Email Verification**
   - [ ] Valid token verifies email
   - [ ] Expired token shows error
   - [ ] Resend verification works
   - [ ] Already verified shows message

3. **Sign In Flow**
   - [ ] Valid credentials sign in
   - [ ] Invalid credentials show error
   - [ ] Unverified email blocks access
   - [ ] Google OAuth works

4. **Password Reset**
   - [ ] Reset email is sent
   - [ ] Valid token allows reset
   - [ ] Expired token shows error
   - [ ] New password works

5. **Route Protection**
   - [ ] Unauthenticated users redirected
   - [ ] Unverified users redirected
   - [ ] Role-based access works

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check SMTP configuration
   - Verify email credentials
   - Check spam folder

2. **OAuth not working**
   - Verify Google OAuth credentials
   - Check redirect URLs
   - Ensure proper domain configuration

3. **Session issues**
   - Check NEXTAUTH_SECRET
   - Verify JWT_SECRET
   - Clear browser cookies

4. **Database errors**
   - Run Prisma migrations
   - Check database connection
   - Verify schema is up to date

### Debug Mode

Enable debug logging by setting:
```env
NEXTAUTH_DEBUG=true
```

## Future Enhancements

### Planned Features
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Facebook, Apple)
- [ ] Account deactivation/deletion
- [ ] Login attempt monitoring
- [ ] Device management
- [ ] Advanced password policies
- [ ] Account recovery options

### Security Improvements
- [ ] Implement rate limiting
- [ ] Add CAPTCHA for registration
- [ ] Enhanced session management
- [ ] Audit logging
- [ ] Suspicious activity detection

## Support

For authentication-related issues:
1. Check this documentation
2. Review error messages and logs
3. Verify environment variables
4. Test with minimal configuration
5. Contact development team if needed
