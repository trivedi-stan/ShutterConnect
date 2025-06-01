'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Camera, CheckCircle, XCircle, Mail, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else if (!email) {
      setStatus('error')
      setMessage('Invalid verification link')
    }
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(result.message)
        toast.success('Email verified successfully!')
        
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          router.push('/auth/signin?message=email-verified')
        }, 3000)
      } else {
        if (result.error.includes('expired')) {
          setStatus('expired')
        } else {
          setStatus('error')
        }
        setMessage(result.error)
      }
    } catch (error) {
      console.error('Email verification error:', error)
      setStatus('error')
      setMessage('An error occurred while verifying your email')
    }
  }

  const resendVerification = async () => {
    if (!email) {
      toast.error('Email address is required to resend verification')
      return
    }

    setIsResending(true)
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Verification email sent! Please check your inbox.')
        setStatus('loading')
        setMessage('A new verification email has been sent to your inbox.')
      } else {
        toast.error(result.error || 'Failed to resend verification email')
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      toast.error('An error occurred while resending verification email')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Camera className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">ShutterConnect</span>
          </Link>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-soft p-8">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Your Email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                {message || 'Your email has been verified. You can now sign in to your account.'}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/auth/signin')}
                  className="w-full"
                  size="lg"
                >
                  Continue to Sign In
                </Button>
                <p className="text-sm text-gray-500">
                  Redirecting automatically in 3 seconds...
                </p>
              </div>
            </div>
          )}

          {status === 'expired' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Link Expired
              </h2>
              <p className="text-gray-600 mb-6">
                {message || 'Your verification link has expired. Please request a new one.'}
              </p>
              <div className="space-y-3">
                {email && (
                  <Button
                    onClick={resendVerification}
                    loading={isResending}
                    disabled={isResending}
                    className="w-full"
                    size="lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </Button>
                )}
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full" size="lg">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {message || 'We could not verify your email address. The link may be invalid or expired.'}
              </p>
              <div className="space-y-3">
                {email && (
                  <Button
                    onClick={resendVerification}
                    loading={isResending}
                    disabled={isResending}
                    className="w-full"
                    size="lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </Button>
                )}
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full" size="lg">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Email Pending Verification */}
          {!token && email && (
            <div className="text-center">
              <Mail className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to <strong>{email}</strong>. 
                Please check your inbox and click the link to verify your account.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Didn't receive the email?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your spam or junk folder</li>
                    <li>Make sure you entered the correct email address</li>
                    <li>Wait a few minutes for the email to arrive</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={resendVerification}
                  loading={isResending}
                  disabled={isResending}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </Button>
                <Link href="/auth/signin">
                  <Button variant="ghost" className="w-full" size="lg">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link
              href="/contact"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
