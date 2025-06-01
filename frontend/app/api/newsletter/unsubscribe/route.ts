import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = unsubscribeSchema.parse(body)

    // Find the subscriber
    const subscriber = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      )
    }

    if (!subscriber.isActive) {
      return NextResponse.json(
        { error: 'Email is already unsubscribed' },
        { status: 400 }
      )
    }

    // Unsubscribe the email
    await prisma.newsletter.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date()
      }
    })

    return NextResponse.json({
      message: 'Successfully unsubscribed from newsletter',
      email
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Find the subscriber
    const subscriber = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      )
    }

    if (!subscriber.isActive) {
      return NextResponse.json(
        { message: 'Email is already unsubscribed' },
        { status: 200 }
      )
    }

    // Unsubscribe the email
    await prisma.newsletter.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date()
      }
    })

    // Return a simple HTML page
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed - ShutterConnect</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            .container { background: #f9f9f9; padding: 40px; border-radius: 10px; }
            h1 { color: #333; }
            p { color: #666; line-height: 1.6; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Successfully Unsubscribed</h1>
            <p>You have been successfully unsubscribed from the ShutterConnect newsletter.</p>
            <p>We're sorry to see you go! If you change your mind, you can always subscribe again on our website.</p>
            <a href="${process.env.NEXTAUTH_URL}" class="button">Return to ShutterConnect</a>
          </div>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error - ShutterConnect</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            .container { background: #f9f9f9; padding: 40px; border-radius: 10px; }
            h1 { color: #e74c3c; }
            p { color: #666; line-height: 1.6; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Unsubscribe Failed</h1>
            <p>We encountered an error while trying to unsubscribe your email. Please try again later or contact support.</p>
            <a href="${process.env.NEXTAUTH_URL}" class="button">Return to ShutterConnect</a>
          </div>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }
}
