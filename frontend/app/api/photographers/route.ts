import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PhotoSessionType } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category') as PhotoSessionType | null
    const specialty = searchParams.get('specialty') as PhotoSessionType | null
    const location = searchParams.get('location')
    const state = searchParams.get('state')
    const city = searchParams.get('city')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const minRating = searchParams.get('minRating')
    const search = searchParams.get('search') // search query

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isAvailable: true,
      user: {
        isActive: true,
        isVerified: true,
      },
    }

    // Specialty filter
    if (category || specialty) {
      where.specialties = {
        has: category || specialty,
      }
    }

    // Location filters (temporarily disabled until database migration)
    // if (state) {
    //   where.state = {
    //     equals: state,
    //     mode: 'insensitive',
    //   }
    // }

    // if (city) {
    //   where.city = {
    //     equals: city,
    //     mode: 'insensitive',
    //   }
    // }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.hourlyRate = {}
      if (minPrice) where.hourlyRate.gte = parseFloat(minPrice)
      if (maxPrice) where.hourlyRate.lte = parseFloat(maxPrice)
    }

    // Rating filter
    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating),
      }
    }

    // Search filter
    if (search) {
      where.OR = [
        {
          user: {
            firstName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            lastName: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          bio: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          location: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]
    }

    const [photographers, total] = await Promise.all([
      prisma.photographer.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              email: true,
            },
          },
          packages: {
            where: {
              isActive: true,
            },
            orderBy: {
              price: 'asc',
            },
            take: 3,
          },
          _count: {
            select: {
              bookings: true,
            },
          },
        },
        orderBy: [
          { rating: 'desc' },
          { totalReviews: 'desc' },
          { totalBookings: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.photographer.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      photographers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching photographers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      bio,
      experience,
      hourlyRate,
      location,
      latitude,
      longitude,
      radius,
      specialties,
      equipment,
      languages,
      portfolio,
    } = body

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user exists and is not already a photographer
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { photographer: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.photographer) {
      return NextResponse.json(
        { error: 'User is already a photographer' },
        { status: 400 }
      )
    }

    // Create photographer profile
    const photographer = await prisma.photographer.create({
      data: {
        userId,
        bio,
        experience: experience ? parseInt(experience) : null,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        radius: radius ? parseInt(radius) : null,
        specialties: specialties || [],
        equipment: equipment || [],
        languages: languages || [],
        portfolio: portfolio || [],
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    })

    // Update user role to photographer
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'PHOTOGRAPHER' },
    })

    return NextResponse.json(photographer, { status: 201 })
  } catch (error) {
    console.error('Error creating photographer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
