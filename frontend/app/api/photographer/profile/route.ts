import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const photographerProfileSchema = z.object({
  bio: z.string().min(50).max(1000),
  experience: z.number().min(0).max(50),
  hourlyRate: z.number().min(25).max(1000),
  location: z.string().min(5),
  specialties: z.array(z.string()).min(1),
  equipment: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  portfolio: z.array(z.string()).optional(),
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

    // Get photographer profile
    const photographer = await prisma.photographer.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
        packages: true,
        availability: true,
      },
    })

    return NextResponse.json({ photographer })
  } catch (error) {
    console.error('Get photographer profile error:', error)
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
    const validatedData = photographerProfileSchema.parse(body)

    // Check if photographer profile already exists
    const existingPhotographer = await prisma.photographer.findUnique({
      where: { userId: session.user.id },
    })

    if (existingPhotographer) {
      return NextResponse.json(
        { error: 'Photographer profile already exists. Use PUT to update.' },
        { status: 400 }
      )
    }

    // Create photographer profile
    const photographer = await prisma.photographer.create({
      data: {
        userId: session.user.id,
        bio: validatedData.bio,
        experience: validatedData.experience,
        hourlyRate: validatedData.hourlyRate,
        location: validatedData.location,
        specialties: validatedData.specialties,
        equipment: validatedData.equipment,
        languages: validatedData.languages,
        portfolio: validatedData.portfolio || [],
        isAvailable: true,
        rating: 0,
        totalReviews: 0,
        totalBookings: 0,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: 'Photographer profile created successfully',
      photographer,
    })
  } catch (error) {
    console.error('Create photographer profile error:', error)

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

export async function PUT(request: NextRequest) {
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
    const validatedData = photographerProfileSchema.parse(body)

    // Update photographer profile
    const photographer = await prisma.photographer.upsert({
      where: { userId: session.user.id },
      update: {
        bio: validatedData.bio,
        experience: validatedData.experience,
        hourlyRate: validatedData.hourlyRate,
        location: validatedData.location,
        specialties: validatedData.specialties,
        equipment: validatedData.equipment,
        languages: validatedData.languages,
        portfolio: validatedData.portfolio || [],
      },
      create: {
        userId: session.user.id,
        bio: validatedData.bio,
        experience: validatedData.experience,
        hourlyRate: validatedData.hourlyRate,
        location: validatedData.location,
        specialties: validatedData.specialties,
        equipment: validatedData.equipment,
        languages: validatedData.languages,
        portfolio: validatedData.portfolio || [],
        isAvailable: true,
        rating: 0,
        totalReviews: 0,
        totalBookings: 0,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: 'Photographer profile updated successfully',
      photographer,
    })
  } catch (error) {
    console.error('Update photographer profile error:', error)

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
