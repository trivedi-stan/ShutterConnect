'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Camera, User, Settings, Calendar, MessageCircle, Star, DollarSign, Database, Users, Trash2 } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin?callbackUrl=/dashboard')
      return
    }

    if (!session.user.isVerified) {
      router.push('/auth/verify-email?email=' + encodeURIComponent(session.user.email!))
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session || !session.user.isVerified) {
    return null // Will redirect
  }

  const isPhotographer = session.user.role === 'PHOTOGRAPHER'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {session.user.firstName}!
                </h1>
                <p className="text-sm text-gray-600">
                  {isPhotographer ? 'Photographer Dashboard' : 'Client Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ''}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.firstName} {session.user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {isPhotographer ? 'Upcoming Sessions' : 'Bookings'}
                </p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          {isPhotographer && (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">0.0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Camera className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {!isPhotographer && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Camera className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Photos</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">
                  {isPhotographer
                    ? 'Your bookings and sessions will appear here'
                    : 'Your bookings and photo sessions will appear here'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {isPhotographer ? (
                  <>
                    <Link href="/photographer/profile" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Manage Profile
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/photographer/packages" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Camera className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Manage Packages
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/photographer/payments" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Payment Dashboard
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/bookings" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          View Sessions
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/messages" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Messages
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/photographers" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Camera className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Find Photographers
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/bookings" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          View Bookings
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/messages" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Messages
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>

                    <Link href="/settings" className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          Account Settings
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Admin Section - Only show for development/testing */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Admin Tools (Development Only)
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Manage test data and database operations for development and testing.
              </p>

              <AdminTools />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Admin Tools Component
function AdminTools() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [photographersCount, setPhotographersCount] = useState(0)

  const checkPhotographers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/photographers`)
      if (response.ok) {
        const data = await response.json()
        setPhotographersCount(data.pagination.total)
        setMessage(`Found ${data.pagination.total} photographers in database`)
      }
    } catch (error) {
      console.error('Error checking photographers:', error)
      setMessage('Error connecting to backend. Make sure backend server is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const createSamplePhotographers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/photographers/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(`Successfully created ${data.count} sample photographers with packages!`)
        await checkPhotographers()
      } else {
        const error = await response.json()
        setMessage(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating photographers:', error)
      setMessage('Error connecting to backend. Make sure backend server is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const removeSamplePhotographers = async () => {
    if (!confirm('Are you sure you want to remove all sample photographers? This cannot be undone.')) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/photographers/seed`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMessage('Successfully removed all sample photographers')
        await checkPhotographers()
      } else {
        const error = await response.json()
        setMessage(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error removing photographers:', error)
      setMessage('Error connecting to backend. Make sure backend server is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Database Status</h3>
            <p className="text-sm text-gray-600">
              Current photographers in database: <span className="font-medium">{photographersCount}</span>
            </p>
          </div>
          <button
            onClick={checkPhotographers}
            disabled={loading}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={createSamplePhotographers}
          disabled={loading}
          className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors disabled:opacity-50"
        >
          <Users className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">Create Sample Photographers</span>
        </button>

        <button
          onClick={removeSamplePhotographers}
          disabled={loading}
          className="flex items-center justify-center p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <Trash2 className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-700 font-medium">Remove Sample Data</span>
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('Error')
          ? 'bg-red-50 border border-red-200 text-red-800'
          : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
          <p className="text-sm">{message}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Start the backend server: <code className="bg-blue-100 px-1 rounded">cd backend && npm run dev</code></li>
          <li>Click "Create Sample Photographers" to add test data</li>
          <li>Go to "Find Photographers" page to see the photographers</li>
          <li>Test client login and photographer filtering</li>
          <li>Use "Remove Sample Data" to clean up when done testing</li>
        </ol>
      </div>
    </div>
  )
}
