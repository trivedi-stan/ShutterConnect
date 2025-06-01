# ShutterConnect Deployment Guide

## Overview

This guide covers deploying ShutterConnect to production environments using modern cloud infrastructure and best practices.

## Prerequisites

- Node.js 18+ installed locally
- Git repository access
- Domain name configured
- SSL certificate (handled by deployment platform)

## Environment Setup

### Required Environment Variables

Create a `.env.production` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/shutterconnect_prod"

# NextAuth.js
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Service
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"

# SMS Service
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Google Maps
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications with automatic scaling and global CDN.

#### Steps:

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all production environment variables
   - Ensure they're set for "Production" environment

3. **Database Setup**
   ```bash
   # Run database migrations
   npx prisma migrate deploy
   
   # Generate Prisma client
   npx prisma generate
   ```

4. **Domain Configuration**
   - Add custom domain in Vercel Dashboard
   - Configure DNS records as instructed
   - SSL certificate is automatically provisioned

#### Vercel Configuration (`vercel.json`):
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

### Option 2: AWS with Docker

For more control and enterprise requirements, deploy using AWS services.

#### Architecture:
- **ECS Fargate**: Container orchestration
- **RDS PostgreSQL**: Managed database
- **ElastiCache Redis**: Caching layer
- **S3 + CloudFront**: Static assets and CDN
- **Application Load Balancer**: Traffic distribution
- **Route 53**: DNS management

#### Steps:

1. **Build Docker Image**
   ```dockerfile
   # Dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package.json package-lock.json ./
   RUN npm ci --only=production
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   RUN npm run build
   
   # Production image
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Deploy to AWS ECS**
   ```bash
   # Build and push to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
   
   docker build -t shutterconnect .
   docker tag shutterconnect:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/shutterconnect:latest
   docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/shutterconnect:latest
   ```

3. **Infrastructure as Code (Terraform)**
   ```hcl
   # main.tf
   provider "aws" {
     region = "us-east-1"
   }
   
   # VPC and networking
   module "vpc" {
     source = "terraform-aws-modules/vpc/aws"
     
     name = "shutterconnect-vpc"
     cidr = "10.0.0.0/16"
     
     azs             = ["us-east-1a", "us-east-1b"]
     private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
     public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
     
     enable_nat_gateway = true
     enable_vpn_gateway = true
   }
   
   # RDS PostgreSQL
   resource "aws_db_instance" "postgres" {
     identifier = "shutterconnect-db"
     
     engine         = "postgres"
     engine_version = "14.9"
     instance_class = "db.t3.micro"
     
     allocated_storage     = 20
     max_allocated_storage = 100
     
     db_name  = "shutterconnect"
     username = "postgres"
     password = var.db_password
     
     vpc_security_group_ids = [aws_security_group.rds.id]
     db_subnet_group_name   = aws_db_subnet_group.default.name
     
     backup_retention_period = 7
     backup_window          = "03:00-04:00"
     maintenance_window     = "sun:04:00-sun:05:00"
     
     skip_final_snapshot = false
     deletion_protection = true
   }
   
   # ECS Cluster
   resource "aws_ecs_cluster" "main" {
     name = "shutterconnect-cluster"
     
     setting {
       name  = "containerInsights"
       value = "enabled"
     }
   }
   ```

### Option 3: Google Cloud Platform

Deploy using Google Cloud Run for serverless container deployment.

#### Steps:

1. **Build and Deploy**
   ```bash
   # Build and push to Google Container Registry
   gcloud builds submit --tag gcr.io/PROJECT-ID/shutterconnect
   
   # Deploy to Cloud Run
   gcloud run deploy shutterconnect \
     --image gcr.io/PROJECT-ID/shutterconnect \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars DATABASE_URL=$DATABASE_URL,NEXTAUTH_SECRET=$NEXTAUTH_SECRET
   ```

2. **Database Setup**
   ```bash
   # Create Cloud SQL PostgreSQL instance
   gcloud sql instances create shutterconnect-db \
     --database-version=POSTGRES_14 \
     --tier=db-f1-micro \
     --region=us-central1
   ```

## Database Migration

### Production Migration Strategy

1. **Backup Current Database**
   ```bash
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Run Migrations**
   ```bash
   # Deploy schema changes
   npx prisma migrate deploy
   
   # Verify migration
   npx prisma db pull
   ```

3. **Seed Production Data (if needed)**
   ```bash
   npx prisma db seed
   ```

## Monitoring and Logging

### Application Monitoring

1. **Sentry Integration**
   ```typescript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs'
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   })
   ```

2. **Health Check Endpoint**
   ```typescript
   // app/api/health/route.ts
   import { NextResponse } from 'next/server'
   import { prisma } from '@/lib/prisma'
   
   export async function GET() {
     try {
       await prisma.$queryRaw`SELECT 1`
       return NextResponse.json({ status: 'healthy' })
     } catch (error) {
       return NextResponse.json({ status: 'unhealthy' }, { status: 500 })
     }
   }
   ```

### Infrastructure Monitoring

1. **AWS CloudWatch** (for AWS deployment)
2. **Google Cloud Monitoring** (for GCP deployment)
3. **Vercel Analytics** (for Vercel deployment)

## Security Considerations

### SSL/TLS Configuration
- Use HTTPS everywhere
- Configure HSTS headers
- Implement proper CORS policies

### Environment Security
```typescript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## Performance Optimization

### CDN Configuration
- Configure CloudFront (AWS) or Cloud CDN (GCP)
- Set appropriate cache headers
- Optimize image delivery

### Database Optimization
```sql
-- Create indexes for better performance
CREATE INDEX idx_photographers_location ON photographers USING GIN (location gin_trgm_ops);
CREATE INDEX idx_bookings_date ON bookings (date);
CREATE INDEX idx_photos_booking_id ON photos (booking_id);
CREATE INDEX idx_reviews_photographer ON reviews (photographer_id);
```

## Backup and Disaster Recovery

### Database Backups
```bash
# Automated daily backups
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL | gzip > "backup_$DATE.sql.gz"
aws s3 cp "backup_$DATE.sql.gz" s3://shutterconnect-backups/
```

### Application Backups
- Code: Git repository with tags for releases
- Assets: Regular S3/Cloud Storage backups
- Configuration: Infrastructure as Code in version control

## Scaling Considerations

### Horizontal Scaling
- Use load balancers for multiple application instances
- Implement database read replicas
- Consider microservices architecture for high traffic

### Vertical Scaling
- Monitor resource usage and scale instance sizes
- Optimize database queries and indexes
- Implement caching strategies

## Maintenance

### Regular Tasks
- Security updates and patches
- Database maintenance and optimization
- Log rotation and cleanup
- Performance monitoring and optimization
- Backup verification

### Deployment Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Troubleshooting

### Common Issues
1. **Database Connection Errors**: Check connection strings and network access
2. **Environment Variable Issues**: Verify all required variables are set
3. **Build Failures**: Check Node.js version and dependency compatibility
4. **Performance Issues**: Monitor database queries and implement caching

### Support Contacts
- Technical Support: tech-support@shutterconnect.com
- Infrastructure: infrastructure@shutterconnect.com
- Emergency: +1-555-EMERGENCY
