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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const packageId = params.id

    // Get package and verify ownership
    const package_ = await prisma.package.findFirst({
      where: {
        id: packageId,
        photographer: {
          userId: session.user.id,
        },
      },
    })

    if (!package_) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ package: package_ })
  } catch (error) {
    console.error('Get package error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const packageId = params.id
    const body = await request.json()
    
    // Validate input
    const validatedData = packageSchema.parse(body)

    // Check if package exists and belongs to photographer
    const existingPackage = await prisma.package.findFirst({
      where: {
        id: packageId,
        photographer: {
          userId: session.user.id,
        },
      },
    })

    if (!existingPackage) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Update package
    const package_ = await prisma.package.update({
      where: { id: packageId },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        duration: validatedData.duration,
        deliverables: validatedData.deliverables,
        isActive: validatedData.isActive,
      },
    })

    return NextResponse.json({
      message: 'Package updated successfully',
      package: package_,
    })
  } catch (error) {
    console.error('Update package error:', error)

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const packageId = params.id

    // Check if package exists and belongs to photographer
    const existingPackage = await prisma.package.findFirst({
      where: {
        id: packageId,
        photographer: {
          userId: session.user.id,
        },
      },
    })

    if (!existingPackage) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Check if package has active bookings
    const activeBookings = await prisma.booking.count({
      where: {
        packageId: packageId,
        status: {
          in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'],
        },
      },
    })

    if (activeBookings > 0) {
      return NextResponse.json(
        { error: 'Cannot delete package with active bookings' },
        { status: 400 }
      )
    }

    // Delete package
    await prisma.package.delete({
      where: { id: packageId },
    })

    return NextResponse.json({
      message: 'Package deleted successfully',
    })
  } catch (error) {
    console.error('Delete package error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
