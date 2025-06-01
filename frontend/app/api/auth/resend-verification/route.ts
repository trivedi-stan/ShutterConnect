import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resendVerificationSchema } from '@/lib/validations/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const { email } = resendVerificationSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with this email exists, a verification email has been sent.' },
        { status: 200 }
      )
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      )
    }

    // Check for existing verification token
    const existingToken = await prisma.verificationToken.findFirst({
      where: { 
        identifier: email.toLowerCase(),
        expires: { gt: new Date() }
      },
    })

    // If there's a recent token (less than 5 minutes old), don't send another
    if (existingToken && existingToken.expires.getTime() - Date.now() > 23 * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: 'A verification email was recently sent. Please check your inbox or wait a few minutes before requesting another.' },
        { status: 429 }
      )
    }

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email.toLowerCase() },
    })

    // Generate new verification token
    const verificationToken = generateVerificationToken()

    // Store new verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken, user.firstName)
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Verification email sent successfully. Please check your inbox.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resend verification error:', error)

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
