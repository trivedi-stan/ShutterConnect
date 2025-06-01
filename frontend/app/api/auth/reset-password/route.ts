import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { resetPasswordSchema } from '@/lib/validations/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const { token, password } = resetPasswordSchema.parse(body)

    // Find reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: { token },
      })
      
      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new password reset.' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Delete reset token
    await prisma.passwordResetToken.delete({
      where: { token },
    })

    // Delete all other reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: resetToken.email },
    })

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)

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
        { error: 'Reset token is required' },
        { status: 400 }
      )
    }

    // Find reset token to validate it
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid reset token', valid: false },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: { token },
      })
      
      return NextResponse.json(
        { error: 'Reset token has expired', valid: false },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Reset token is valid', valid: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Validate reset token error:', error)
    return NextResponse.json(
      { error: 'Internal server error', valid: false },
      { status: 500 }
    )
  }
}
