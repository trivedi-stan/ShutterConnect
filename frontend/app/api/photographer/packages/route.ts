import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema for package
const packageSchema = z.object({
  name: z.string().min(3, 'Package name must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  price: z.number().min(25, 'Minimum price is $25').max(10000, 'Maximum price is $10,000'),
  duration: z.number().min(30, 'Minimum duration is 30 minutes').max(480, 'Maximum duration is 8 hours'),
  deliverables: z.array(z.string()).min(1, 'At least one deliverable is required'),
  isActive: z.boolean().optional().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'PHOTOGRAPHER') {
      return NextResponse.json(
        { error: 'Access denied. Photographer role required.' },
        { status: 403 }
      )
    }

    // Get photographer's packages
    const photographer = await prisma.photographer.findUnique({
      where: { userId: session.user.id },
      include: {
        packages: {
          orderBy: { price: 'asc' },
        },
      },
    })

    if (!photographer) {
      return NextResponse.json(
        { error: 'Photographer profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ packages: photographer.packages })
  } catch (error) {
    console.error('Get packages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'PHOTOGRAPHER') {
      return NextResponse.json(
        { error: 'Access denied. Photographer role required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = packageSchema.parse(body)

    // Check if photographer exists
    const photographer = await prisma.photographer.findUnique({
      where: { userId: session.user.id },
    })

    if (!photographer) {
      return NextResponse.json(
        { error: 'Photographer profile not found' },
        { status: 404 }
      )
    }

    // Create package
    const package_ = await prisma.package.create({
      data: {
        photographerId: photographer.id,
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        duration: validatedData.duration,
        deliverables: validatedData.deliverables,
        isActive: validatedData.isActive,
      },
    })

    return NextResponse.json({
      message: 'Package created successfully',
      package: package_,
    })
  } catch (error) {
    console.error('Create package error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
