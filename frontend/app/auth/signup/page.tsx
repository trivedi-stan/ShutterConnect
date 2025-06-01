'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, User, Phone, Camera, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { signUpSchema, type SignUpInput, checkPasswordStrength } from '@/lib/validations/auth'
import { toast } from 'react-hot-toast'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
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

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Account created successfully! Please check your email to verify your account.')
        router.push('/auth/verify-email?email=' + encodeURIComponent(data.email))
      } else {
        toast.error(result.error || 'Failed to create account')
      }
    } catch (error) {
      console.error('Sign up error:', error)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Camera className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">ShutterConnect</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of photographers and clients
          </p>
        </div>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('firstName')}
                    type="text"
                    autoComplete="given-name"
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    {...register('lastName')}
                    type="text"
                    autoComplete="family-name"
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
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
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to join as a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className="relative cursor-pointer"
                  onClick={() => setSelectedRole('CLIENT')}
                >
                  <input
                    {...register('role')}
                    type="radio"
                    value="CLIENT"
                    className="sr-only"
                    onChange={() => setSelectedRole('CLIENT')}
                  />
                  <div className={`border-2 rounded-lg p-4 transition-all ${selectedRole === 'CLIENT'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                    }`}>
                    <div className="text-center">
                      <User className={`h-8 w-8 mx-auto mb-2 ${selectedRole === 'CLIENT' ? 'text-primary-600' : 'text-gray-600'
                        }`} />
                      <div className="font-medium text-gray-900">Client</div>
                      <div className="text-sm text-gray-500">Book photographers</div>
                    </div>
                  </div>
                </label>

                <label
                  className="relative cursor-pointer"
                  onClick={() => setSelectedRole('PHOTOGRAPHER')}
                >
                  <input
                    {...register('role')}
                    type="radio"
                    value="PHOTOGRAPHER"
                    className="sr-only"
                    onChange={() => setSelectedRole('PHOTOGRAPHER')}
                  />
                  <div className={`border-2 rounded-lg p-4 transition-all ${selectedRole === 'PHOTOGRAPHER'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                    }`}>
                    <div className="text-center">
                      <Camera className={`h-8 w-8 mx-auto mb-2 ${selectedRole === 'PHOTOGRAPHER' ? 'text-primary-600' : 'text-gray-600'
                        }`} />
                      <div className="font-medium text-gray-900">Photographer</div>
                      <div className="text-sm text-gray-500">Offer services</div>
                    </div>
                  </div>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Create a password"
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
                    <span className={`text-xs font-medium ${passwordStrength.strength === 'strong' ? 'text-green-600' :
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
                Confirm password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Confirm your password"
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

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('agreeToTerms')}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}
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
              Create account
            </Button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
