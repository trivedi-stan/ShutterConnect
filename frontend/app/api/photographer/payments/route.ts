import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get photographer
    const photographer = await prisma.photographer.findUnique({
      where: { userId: session.user.id },
    })

    if (!photographer) {
      return NextResponse.json(
        { error: 'Photographer profile not found' },
        { status: 404 }
      )
    }

    const periodDays = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    // Get payments for the period
    const payments = await prisma.payment.findMany({
      where: {
        booking: {
          photographerId: photographer.id,
        },
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        booking: {
          include: {
            client: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            package: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    // Get total count for pagination
    const totalPayments = await prisma.payment.count({
      where: {
        booking: {
          photographerId: photographer.id,
        },
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
        },
      },
    })

    // Calculate earnings summary
    const earningsSummary = await prisma.payment.aggregate({
      where: {
        booking: {
          photographerId: photographer.id,
        },
        status: 'COMPLETED',
        createdAt: {
          gte: startDate,
        },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    // Get all-time earnings
    const allTimeEarnings = await prisma.payment.aggregate({
      where: {
        booking: {
          photographerId: photographer.id,
        },
        status: 'COMPLETED',
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    // Get pending payments
    const pendingPayments = await prisma.payment.aggregate({
      where: {
        booking: {
          photographerId: photographer.id,
        },
        status: {
          in: ['PENDING', 'PROCESSING'],
        },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    })

    // Calculate monthly earnings for chart data
    const monthlyEarnings = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', p.created_at) as month,
        SUM(p.amount) as total_amount,
        COUNT(p.id) as payment_count
      FROM payments p
      INNER JOIN bookings b ON p.booking_id = b.id
      WHERE b.photographer_id = ${photographer.id}
        AND p.status = 'COMPLETED'
        AND p.created_at >= ${startDate}
      GROUP BY DATE_TRUNC('month', p.created_at)
      ORDER BY month DESC
    `

    const totalPages = Math.ceil(totalPayments / limit)

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total: totalPayments,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      summary: {
        period: {
          days: periodDays,
          totalEarnings: earningsSummary._sum.amount || 0,
          totalPayments: earningsSummary._count.id || 0,
        },
        allTime: {
          totalEarnings: allTimeEarnings._sum.amount || 0,
          totalPayments: allTimeEarnings._count.id || 0,
        },
        pending: {
          totalAmount: pendingPayments._sum.amount || 0,
          totalPayments: pendingPayments._count.id || 0,
        },
        monthlyEarnings,
      },
    })
  } catch (error) {
    console.error('Get payments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
