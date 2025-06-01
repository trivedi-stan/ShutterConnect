import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendNotificationEmail } from '@/lib/email'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('website')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = subscribeSchema.parse(body)

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { error: 'Email is already subscribed to our newsletter' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email },
          data: {
            isActive: true,
            subscribedAt: new Date(),
            unsubscribedAt: null,
            source
          }
        })
      }
    } else {
      // Create new subscription
      await prisma.newsletter.create({
        data: {
          email,
          source,
          isActive: true
        }
      })
    }

    // Send welcome email
    try {
      await sendWelcomeNewsletterEmail(email)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      email
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

async function sendWelcomeNewsletterEmail(email: string): Promise<void> {
  const subject = 'Welcome to ShutterConnect Newsletter! 📸'
  const message = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Welcome to ShutterConnect! 📸</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Thank you for subscribing!</h2>
        
        <p style="color: #666; line-height: 1.6;">
          You're now part of the ShutterConnect community! Here's what you can expect from our newsletter:
        </p>
        
        <ul style="color: #666; line-height: 1.8;">
          <li>📸 Latest photography tips and techniques</li>
          <li>🎯 Platform updates and new features</li>
          <li>💰 Exclusive offers and discounts</li>
          <li>🌟 Success stories from our photographers</li>
          <li>📅 Upcoming photography events and workshops</li>
        </ul>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="color: #333; margin-top: 0;">Get Started Today</h3>
          <p style="color: #666; margin-bottom: 15px;">
            Ready to find your perfect photographer or start earning as a photographer?
          </p>
          <a href="${process.env.NEXTAUTH_URL}/photographers" 
             style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Find Photographers
          </a>
          <a href="${process.env.NEXTAUTH_URL}/auth/signup" 
             style="display: inline-block; background: #764ba2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-left: 10px;">
            Join as Photographer
          </a>
        </div>
        
        <p style="color: #999; font-size: 14px; margin-top: 30px;">
          You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.
        </p>
      </div>
    </div>
  `

  await sendNotificationEmail(email, subject, message)
}

export async function GET() {
  return NextResponse.json({ message: 'Newsletter API endpoint' })
}
