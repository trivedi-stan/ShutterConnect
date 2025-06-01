import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { generateResetToken } from '@/lib/tokens'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const { email } = forgotPasswordSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success message for security (don't reveal if user exists)
    const successMessage = 'If an account with this email exists, a password reset link has been sent.'

    if (!user) {
      return NextResponse.json(
        { message: successMessage },
        { status: 200 }
      )
    }

    // Check for existing reset token
    const existingToken = await prisma.passwordResetToken.findFirst({
      where: { 
        email: email.toLowerCase(),
        expires: { gt: new Date() }
      },
    })

    // If there's a recent token (less than 5 minutes old), don't send another
    if (existingToken && existingToken.expires.getTime() - Date.now() > 55 * 60 * 1000) {
      return NextResponse.json(
        { error: 'A password reset email was recently sent. Please check your inbox or wait a few minutes before requesting another.' },
        { status: 429 }
      )
    }

    // Delete any existing reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: email.toLowerCase() },
    })

    // Generate reset token
    const resetToken = generateResetToken()

    // Store reset token
    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase(),
        token: resetToken,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    })

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken, user.firstName)
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: successMessage },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)

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
