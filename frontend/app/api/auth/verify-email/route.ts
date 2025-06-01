import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyEmailSchema } from '@/lib/validations/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const { token } = verifyEmailSchema.parse(body)

    // Find verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      })
      
      return NextResponse.json(
        { error: 'Verification token has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.isVerified) {
      // Delete token since user is already verified
      await prisma.verificationToken.delete({
        where: { token },
      })
      
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 200 }
      )
    }

    // Update user verification status
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isVerified: true,
      },
    })

    // Delete verification token
    await prisma.verificationToken.delete({
      where: { token },
    })

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        user: updatedUser,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Validate and verify email using the same logic as POST
    const result = await POST(
      new NextRequest(request.url, {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      })
    )

    return result
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
