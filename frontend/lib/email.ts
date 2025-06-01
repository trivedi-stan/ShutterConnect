import nodemailer from 'nodemailer'

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig)

// Verify transporter configuration
transporter.verify((error: any, success: any) => {
  if (error) {
    console.error('Email transporter configuration error:', error)
  } else {
    console.log('Email server is ready to send messages')
  }
})

/**
 * Send verification email
 */
export async function sendVerificationEmail(
  email: string,
  token: string,
  firstName: string
): Promise<void> {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`

  const mailOptions = {
    from: `"ShutterConnect" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify Your Email Address - ShutterConnect',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📸 ShutterConnect</h1>
              <h2>Welcome to ShutterConnect!</h2>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Thank you for signing up for ShutterConnect! To complete your registration and start connecting with professional photographers, please verify your email address.</p>
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </p>
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">${verificationUrl}</p>
              <p><strong>This verification link will expire in 24 hours.</strong></p>
              <p>If you didn't create an account with ShutterConnect, you can safely ignore this email.</p>
              <p>Best regards,<br>The ShutterConnect Team</p>
            </div>
            <div class="footer">
              <p>© 2023 ShutterConnect. All rights reserved.</p>
              <p>If you have any questions, contact us at support@shutterconnect.com</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${firstName},
      
      Thank you for signing up for ShutterConnect! To complete your registration, please verify your email address by clicking the link below:
      
      ${verificationUrl}
      
      This verification link will expire in 24 hours.
      
      If you didn't create an account with ShutterConnect, you can safely ignore this email.
      
      Best regards,
      The ShutterConnect Team
    `,
  }

  await transporter.sendMail(mailOptions)
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  token: string,
  firstName: string
): Promise<void> {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

  const mailOptions = {
    from: `"ShutterConnect" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Your Password - ShutterConnect',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📸 ShutterConnect</h1>
              <h2>Password Reset Request</h2>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>We received a request to reset your password for your ShutterConnect account. If you made this request, click the button below to reset your password:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </p>
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">${resetUrl}</p>
              <div class="warning">
                <p><strong>⚠️ Important Security Information:</strong></p>
                <ul>
                  <li>This password reset link will expire in 1 hour</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>For security, this link can only be used once</li>
                </ul>
              </div>
              <p>If you continue to have problems, please contact our support team at support@shutterconnect.com</p>
              <p>Best regards,<br>The ShutterConnect Team</p>
            </div>
            <div class="footer">
              <p>© 2023 ShutterConnect. All rights reserved.</p>
              <p>This email was sent because a password reset was requested for your account.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${firstName},
      
      We received a request to reset your password for your ShutterConnect account. If you made this request, click the link below to reset your password:
      
      ${resetUrl}
      
      This password reset link will expire in 1 hour.
      
      If you didn't request this reset, please ignore this email.
      
      Best regards,
      The ShutterConnect Team
    `,
  }

  await transporter.sendMail(mailOptions)
}

/**
 * Send welcome email after successful verification
 */
export async function sendWelcomeEmail(
  email: string,
  firstName: string,
  role: string
): Promise<void> {
  const dashboardUrl = `${process.env.NEXTAUTH_URL}/dashboard`

  const mailOptions = {
    from: `"ShutterConnect" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to ShutterConnect! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ShutterConnect</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .feature { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📸 ShutterConnect</h1>
              <h2>Welcome to the Community!</h2>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>🎉 Congratulations! Your email has been verified and your ShutterConnect account is now active.</p>
              
              ${role === 'CLIENT' ? `
                <div class="feature">
                  <h3>🔍 Find Perfect Photographers</h3>
                  <p>Browse our network of verified professional photographers and find the perfect match for your needs.</p>
                </div>
                <div class="feature">
                  <h3>⚡ Book in Seconds</h3>
                  <p>Our streamlined booking process lets you secure your photography session in under 60 seconds.</p>
                </div>
                <div class="feature">
                  <h3>💬 Direct Communication</h3>
                  <p>Chat directly with photographers to discuss your vision and requirements.</p>
                </div>
              ` : `
                <div class="feature">
                  <h3>📈 Grow Your Business</h3>
                  <p>Connect with clients looking for professional photography services and grow your business.</p>
                </div>
                <div class="feature">
                  <h3>💼 Professional Tools</h3>
                  <p>Manage your portfolio, availability, and bookings all in one place.</p>
                </div>
                <div class="feature">
                  <h3>💰 Secure Payments</h3>
                  <p>Get paid securely and on time with our integrated payment system.</p>
                </div>
              `}
              
              <p style="text-align: center;">
                <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
              </p>
              
              <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team at support@shutterconnect.com</p>
              
              <p>Welcome aboard!<br>The ShutterConnect Team</p>
            </div>
            <div class="footer">
              <p>© 2023 ShutterConnect. All rights reserved.</p>
              <p>Follow us on social media for tips and inspiration!</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(
  email: string,
  firstName: string,
  bookingDetails: any
): Promise<void> {
  // Implementation for booking confirmation email
  // This will be used later when implementing the booking system
}

/**
 * Send notification email
 */
export async function sendNotificationEmail(
  email: string,
  subject: string,
  message: string
): Promise<void> {
  const mailOptions = {
    from: `"ShutterConnect" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `ShutterConnect - ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📸 ShutterConnect</h1>
            </div>
            <div class="content">
              <p>${message}</p>
              <p>Best regards,<br>The ShutterConnect Team</p>
            </div>
            <div class="footer">
              <p>© 2023 ShutterConnect. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: message,
  }

  await transporter.sendMail(mailOptions)
}
