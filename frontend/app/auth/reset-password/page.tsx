'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Camera, CheckCircle, XCircle, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { resetPasswordSchema, type ResetPasswordInput, checkPasswordStrength } from '@/lib/validations/auth'
import { toast } from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isValidToken, setIsValidToken] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || '',
    },
  })

  const watchPassword = watch('password')

  // Update password strength when password changes
  useEffect(() => {
    if (watchPassword) {
      setPasswordStrength(checkPasswordStrength(watchPassword))
    } else {
      setPasswordStrength(null)
    }
  }, [watchPassword])

  // Validate token on component mount
  useEffect(() => {
    if (token) {
      validateToken(token)
    } else {
      setIsValidating(false)
      setIsValidToken(false)
    }
  }, [token])

  const validateToken = async (resetToken: string) => {
    try {
      const response = await fetch(`/api/auth/reset-password?token=${resetToken}`)
      const result = await response.json()

      if (response.ok && result.valid) {
        setIsValidToken(true)
      } else {
        setIsValidToken(false)
        toast.error(result.error || 'Invalid or expired reset token')
      }
    } catch (error) {
      console.error('Token validation error:', error)
      setIsValidToken(false)
      toast.error('Failed to validate reset token')
    } finally {
      setIsValidating(false)
    }
  }

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast.success('Password reset successfully!')
      } else {
        toast.error(result.error || 'Failed to reset password')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'bg-red-500'
      case 'fair': return 'bg-yellow-500'
      case 'good': return 'bg-blue-500'
      case 'strong': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  const getPasswordStrengthWidth = (score: number) => {
    return `${(score / 5) * 100}%`
  }

  // Loading state
  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <Camera className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">ShutterConnect</span>
            </Link>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Validating Reset Link
            </h2>
            <p className="text-gray-600">
              Please wait while we validate your password reset link...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <Camera className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">ShutterConnect</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Password Reset Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <Button
                onClick={() => router.push('/auth/signin?message=password-reset')}
                className="w-full"
                size="lg"
              >
                Continue to Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <Camera className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">ShutterConnect</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-8">
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Invalid Reset Link
              </h2>
              <p className="text-gray-600 mb-6">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
              <div className="space-y-3">
                <Link href="/auth/forgot-password">
                  <Button className="w-full" size="lg">
                    Request New Reset Link
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full" size="lg">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Camera className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">ShutterConnect</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>

        {/* Reset Password Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('token')} />
          
          <div className="space-y-4">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength === 'strong' ? 'text-green-600' :
                      passwordStrength.strength === 'good' ? 'text-blue-600' :
                      passwordStrength.strength === 'fair' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.strength)}`}
                      style={{ width: getPasswordStrengthWidth(passwordStrength.score) }}
                    ></div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                      <div key={key} className="flex items-center text-xs">
                        {passed ? (
                          <Check className="h-3 w-3 text-green-500 mr-2" />
                        ) : (
                          <X className="h-3 w-3 text-red-500 mr-2" />
                        )}
                        <span className={passed ? 'text-green-600' : 'text-red-600'}>
                          {key === 'length' && 'At least 8 characters'}
                          {key === 'lowercase' && 'One lowercase letter'}
                          {key === 'uppercase' && 'One uppercase letter'}
                          {key === 'number' && 'One number'}
                          {key === 'special' && 'One special character'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm new password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              Reset Password
            </Button>
          </div>
        </form>

        {/* Back to Sign In */}
        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
