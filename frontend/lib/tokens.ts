import crypto from 'crypto'

/**
 * Generate a secure random verification token
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Generate a secure random password reset token
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Generate a secure random session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Generate a secure random API key
 */
export function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Generate a secure random string of specified length
 */
export function generateSecureRandom(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate a numeric OTP code
 */
export function generateOTP(length: number = 6): string {
  const digits = '0123456789'
  let otp = ''
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)]
  }
  
  return otp
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(length: number = 12): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const allChars = lowercase + uppercase + numbers + symbols
  let password = ''
  
  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

/**
 * Hash a token for secure storage
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * Verify a token against its hash
 */
export function verifyToken(token: string, hash: string): boolean {
  const tokenHash = hashToken(token)
  return crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(hash))
}

/**
 * Generate a JWT-like token (simple implementation)
 */
export function generateJWTToken(payload: Record<string, any>, secret: string): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url')
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url')
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

/**
 * Verify a JWT-like token (simple implementation)
 */
export function verifyJWTToken(token: string, secret: string): Record<string, any> | null {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.')
    
    if (!encodedHeader || !encodedPayload || !signature) {
      return null
    }
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url')
    
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null
    }
    
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString())
    
    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null
    }
    
    return payload
  } catch (error) {
    return null
  }
}

/**
 * Generate a time-based token that expires
 */
export function generateTimedToken(expiresInMinutes: number = 60): {
  token: string
  expires: Date
} {
  const token = generateSecureRandom()
  const expires = new Date(Date.now() + expiresInMinutes * 60 * 1000)
  
  return { token, expires }
}

/**
 * Generate a URL-safe token
 */
export function generateUrlSafeToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let token = ''
  
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  
  return token
}
