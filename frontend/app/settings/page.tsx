'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

// Validation schemas
const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ProfileInput = z.infer<typeof profileSchema>
type PasswordInput = z.infer<typeof passwordSchema>

export default function SettingsPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  })

  const passwordForm = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?callbackUrl=/settings')
      return
    }

    // Populate form with user data
    if (session.user) {
      profileForm.setValue('firstName', session.user.firstName || '')
      profileForm.setValue('lastName', session.user.lastName || '')
      profileForm.setValue('email', session.user.email || '')
      profileForm.setValue('phone', session.user.phone || '')
    }
  }, [session, status, router, profileForm])

  const onProfileSubmit = async (data: ProfileInput) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Profile updated successfully!')
        // Update session data
        await update({
          ...session,
          user: {
            ...session?.user,
            ...data,
          },
        })
      } else {
        toast.error(result.error || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('An error occurred while updating your profile')
    } finally {
      setIsLoading(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordInput) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Password updated successfully!')
        passwordForm.reset()
      } else {
        toast.error(result.error || 'Failed to update password')
      }
    } catch (error) {
      console.error('Password update error:', error)
      toast.error('An error occurred while updating your password')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                  <p className="text-sm text-gray-600">
                    Update your personal information and profile details.
                  </p>
                </div>

                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="p-6 space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || ''}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <Button variant="outline" type="button">
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-600 mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        {...profileForm.register('firstName')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      {profileForm.formState.errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        {...profileForm.register('lastName')}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      {profileForm.formState.errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        {...profileForm.register('email')}
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      {profileForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        {...profileForm.register('phone')}
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      {profileForm.formState.errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {profileForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" loading={isLoading} disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-600">
                    Manage your password and security preferences.
                  </p>
                </div>

                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        {...passwordForm.register('currentPassword')}
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        {...passwordForm.register('newPassword')}
                        type={showNewPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordForm.formState.errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      {...passwordForm.register('confirmPassword')}
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" loading={isLoading} disabled={isLoading}>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                  <p className="text-sm text-gray-600">
                    Choose how you want to be notified about activity.
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Booking Updates</h3>
                        <p className="text-sm text-gray-600">Get notified about booking status changes</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">New Messages</h3>
                        <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                        <p className="text-sm text-gray-600">Receive updates about new features and promotions</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Billing & Payments</h2>
                  <p className="text-sm text-gray-600">
                    Manage your payment methods and billing information.
                  </p>
                </div>

                <div className="p-6">
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Payment Methods
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add a payment method to start booking sessions
                    </p>
                    <Button>Add Payment Method</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
