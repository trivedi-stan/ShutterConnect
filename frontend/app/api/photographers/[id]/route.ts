import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const photographerId = params.id

    const photographer = await prisma.photographer.findUnique({
      where: { id: photographerId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            createdAt: true,
          },
        },
        packages: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        availability: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          orderBy: { date: 'asc' },
          take: 30, // Next 30 days
        },
        bookings: {
          where: {
            status: 'CONFIRMED',
            date: {
              gte: new Date(),
            },
          },
          select: {
            date: true,
            startTime: true,
            endTime: true,
          },
        },
        reviews: {
          include: {
            client: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!photographer) {
      return NextResponse.json(
        { error: 'Photographer not found' },
        { status: 404 }
      )
    }

    // Check if photographer is available and active
    if (!photographer.isAvailable || !photographer.user) {
      return NextResponse.json(
        { error: 'Photographer is not available' },
        { status: 404 }
      )
    }

    return NextResponse.json({ photographer })
  } catch (error) {
    console.error('Get photographer error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
