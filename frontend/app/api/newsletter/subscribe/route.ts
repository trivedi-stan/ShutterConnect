import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import { sendNotificationEmail } from '@/lib/email'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('website')
})

// Simple file-based storage for now (will be replaced with database later)
const NEWSLETTER_FILE = path.join(process.cwd(), 'newsletter-subscribers.json')

function getSubscribers(): any[] {
  try {
    if (fs.existsSync(NEWSLETTER_FILE)) {
      const data = fs.readFileSync(NEWSLETTER_FILE, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading subscribers file:', error)
    return []
  }
}

function saveSubscribers(subscribers: any[]): void {
  try {
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2))
  } catch (error) {
    console.error('Error saving subscribers file:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Newsletter subscription request received')

    const body = await request.json()
    console.log('Request body:', body)

    const { email, source } = subscribeSchema.parse(body)
    console.log('Parsed email:', email, 'source:', source)

    // Get existing subscribers
    const subscribers = getSubscribers()
    console.log('Current subscribers count:', subscribers.length)

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === email)
    console.log('Existing subscriber:', existingSubscriber)

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        console.log('Email already subscribed')
        return NextResponse.json(
          { error: 'Email is already subscribed to our newsletter' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        console.log('Reactivating subscription...')
        existingSubscriber.isActive = true
        existingSubscriber.subscribedAt = new Date().toISOString()
        existingSubscriber.unsubscribedAt = null
        existingSubscriber.source = source
        saveSubscribers(subscribers)
        console.log('Subscription reactivated')
      }
    } else {
      // Create new subscription
      console.log('Creating new subscription...')
      const newSubscriber = {
        id: Date.now().toString(),
        email,
        source,
        isActive: true,
        subscribedAt: new Date().toISOString(),
        unsubscribedAt: null
      }
      subscribers.push(newSubscriber)
      saveSubscribers(subscribers)
      console.log('New subscription created')
    }

    // Send welcome email (optional - don't fail if this fails)
    try {
      console.log('Attempting to send welcome email...')
      await sendWelcomeNewsletterEmail(email)
      console.log('Welcome email sent successfully')
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail the subscription if email fails
    }

    console.log('Newsletter subscription successful')
    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      email
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)

    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Return more specific error information
    return NextResponse.json(
      {
        error: 'Failed to subscribe to newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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
