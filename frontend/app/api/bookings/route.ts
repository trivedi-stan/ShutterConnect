import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PhotoSessionType, BookingStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') as BookingStatus | null
    const role = searchParams.get('role') // 'client' or 'photographer'

    const skip = (page - 1) * limit

    // Build where clause based on user role
    const where: any = {}
    
    if (role === 'photographer') {
      where.photographer = {
        userId: session.user.id,
      }
    } else {
      where.clientId = session.user.id
    }

    if (status) {
      where.status = status
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              phone: true,
            },
          },
          photographer: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  avatar: true,
                  phone: true,
                },
              },
            },
          },
          package: true,
          review: true,
          photos: {
            take: 5,
            orderBy: {
              uploadedAt: 'desc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      bookings,
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
    console.error('Error fetching bookings:', error)
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      photographerId,
      packageId,
      sessionType,
      date,
      startTime,
      endTime,
      location,
      notes,
      totalAmount,
    } = body

    // Validate required fields
    if (!photographerId || !sessionType || !date || !startTime || !endTime || !location || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate session type
    if (!Object.values(PhotoSessionType).includes(sessionType)) {
      return NextResponse.json(
        { error: 'Invalid session type' },
        { status: 400 }
      )
    }

    // Check if photographer exists and is available
    const photographer = await prisma.photographer.findUnique({
      where: { id: photographerId },
      include: {
        user: true,
        availability: {
          where: {
            date: new Date(date),
            isBooked: false,
          },
        },
      },
    })

    if (!photographer) {
      return NextResponse.json(
        { error: 'Photographer not found' },
        { status: 404 }
      )
    }

    if (!photographer.isAvailable) {
      return NextResponse.json(
        { error: 'Photographer is not available' },
        { status: 400 }
      )
    }

    // Check if package exists (if provided)
    let packageData = null
    if (packageId) {
      packageData = await prisma.package.findUnique({
        where: { id: packageId },
      })

      if (!packageData || packageData.photographerId !== photographerId) {
        return NextResponse.json(
          { error: 'Invalid package' },
          { status: 400 }
        )
      }
    }

    // Check for conflicting bookings
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        photographerId,
        date: new Date(date),
        status: {
          in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'],
        },
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'Time slot is already booked' },
        { status: 400 }
      )
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        photographerId,
        packageId,
        sessionType,
        date: new Date(date),
        startTime,
        endTime,
        location,
        notes,
        totalAmount: parseFloat(totalAmount),
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
        photographer: {
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
        },
        package: true,
      },
    })

    // Update availability if it exists
    await prisma.availability.updateMany({
      where: {
        photographerId,
        date: new Date(date),
        startTime: { lte: endTime },
        endTime: { gte: startTime },
      },
      data: {
        isBooked: true,
      },
    })

    // Create notification for photographer
    await prisma.notification.create({
      data: {
        userId: photographer.userId,
        title: 'New Booking Request',
        message: `You have a new booking request from ${session.user.name} for ${sessionType.toLowerCase()} photography.`,
        type: 'booking',
        data: {
          bookingId: booking.id,
          clientName: session.user.name,
          sessionType,
          date,
          location,
        },
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
