'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Camera, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'
import { toast } from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmittedEmail(data.email)
        setIsSubmitted(true)
        toast.success('Password reset instructions sent!')
      } else {
        toast.error(result.error || 'Failed to send reset email')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
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

          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-soft p-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to{' '}
                <span className="font-medium text-gray-900">{submittedEmail}</span>
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">What to do next:</p>
                  <ol className="list-decimal list-inside space-y-1 text-left">
                    <li>Check your email inbox</li>
                    <li>Click the reset link in the email</li>
                    <li>Create a new password</li>
                    <li>Sign in with your new password</li>
                  </ol>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/auth/signin">
                  <Button className="w-full" size="lg">
                    Back to Sign In
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setSubmittedEmail('')
                  }}
                  className="w-full text-sm text-primary-600 hover:text-primary-500 font-medium"
                >
                  Try a different email address
                </button>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the email?{' '}
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setSubmittedEmail('')
                }}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Try again
              </button>{' '}
              or{' '}
              <Link
                href="/contact"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
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
          <h2 className="text-3xl font-bold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              Send Reset Instructions
            </Button>
          </div>
        </form>

        {/* Back to Sign In */}
        <div className="text-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Link>
        </div>

        {/* Additional Help */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Having trouble?
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Make sure you enter the email address associated with your account</li>
            <li>• Check your spam or junk folder for the reset email</li>
            <li>• The reset link will expire in 1 hour for security</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3">
            Still need help?{' '}
            <Link
              href="/contact"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
