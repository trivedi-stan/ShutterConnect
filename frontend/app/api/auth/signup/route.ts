import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signUpSchema } from '@/lib/validations/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Signup API called')
    const body = await request.json()
    console.log('📝 Request body received:', { ...body, password: '[HIDDEN]', confirmPassword: '[HIDDEN]' })

    // Validate input
    const validatedData = signUpSchema.parse(body)
    console.log('✅ Data validation passed')
    const { firstName, lastName, email, password, phone, role } = validatedData

    // Check if user already exists
    console.log('🔍 Checking if user exists:', email.toLowerCase())
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      console.log('❌ User already exists')
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    console.log('✅ User does not exist, proceeding with creation')

    // Hash password
    console.log('🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('✅ Password hashed successfully')

    // Generate verification token
    console.log('🎫 Generating verification token...')
    const verificationToken = generateVerificationToken()
    console.log('✅ Verification token generated')

    // Create user
    console.log('👤 Creating user in database...')
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        role,
        isVerified: false,
        isActive: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    })
    console.log('✅ User created successfully:', user.id)

    // Store verification token (you might want to create a separate table for this)
    console.log('💾 Storing verification token...')
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token: verificationToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    })
    console.log('✅ Verification token stored successfully')

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken, firstName)
      console.log('✅ Verification email sent successfully')
    } catch (emailError) {
      console.error('⚠️ Failed to send verification email:', emailError)
      // Don't fail the registration if email fails - this is expected in development
      console.log('📧 Email sending failed but user registration continues...')
    }

    return NextResponse.json(
      {
        message: 'Account created successfully. Please check your email to verify your account.',
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
