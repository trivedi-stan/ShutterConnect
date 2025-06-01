'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  User, 
  Camera,
  Filter,
  Search,
  MoreVertical,
  MessageCircle,
  Star,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Booking {
  id: string
  sessionType: string
  date: string
  startTime: string
  endTime: string
  location: string
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED'
  photographer: {
    id: string
    user: {
      firstName: string
      lastName: string
      avatar?: string
    }
    rating: number
    totalReviews: number
  }
  client?: {
    firstName: string
    lastName: string
    avatar?: string
  }
  notes?: string
  createdAt: string
}

export default function BookingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?callbackUrl=/bookings')
      return
    }

    loadBookings()
  }, [session, status, router])

  const loadBookings = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockBookings: Booking[] = [
        {
          id: '1',
          sessionType: 'WEDDING',
          date: '2024-06-15',
          startTime: '14:00',
          endTime: '22:00',
          location: 'Golden Gate Park, San Francisco, CA',
          totalAmount: 2500,
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          photographer: {
            id: '1',
            user: {
              firstName: 'Sarah',
              lastName: 'Wilson',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100'
            },
            rating: 4.9,
            totalReviews: 127
          },
          notes: 'Outdoor ceremony followed by reception. Need coverage for 8 hours including getting ready shots.',
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          sessionType: 'PORTRAIT',
          date: '2024-02-20',
          startTime: '10:00',
          endTime: '12:00',
          location: 'Downtown Studio, San Francisco, CA',
          totalAmount: 300,
          status: 'COMPLETED',
          paymentStatus: 'PAID',
          photographer: {
            id: '2',
            user: {
              firstName: 'Michael',
              lastName: 'Chen',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
            },
            rating: 4.8,
            totalReviews: 89
          },
          notes: 'Professional headshots for LinkedIn profile.',
          createdAt: '2024-01-10T14:30:00Z'
        },
        {
          id: '3',
          sessionType: 'EVENT',
          date: '2024-03-10',
          startTime: '18:00',
          endTime: '23:00',
          location: 'Corporate Office, Palo Alto, CA',
          totalAmount: 800,
          status: 'PENDING',
          paymentStatus: 'PENDING',
          photographer: {
            id: '3',
            user: {
              firstName: 'Emily',
              lastName: 'Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
            },
            rating: 4.7,
            totalReviews: 156
          },
          notes: 'Company anniversary celebration event.',
          createdAt: '2024-01-20T09:15:00Z'
        }
      ]

      // If user is photographer, show their bookings with client info
      if (session?.user?.role === 'PHOTOGRAPHER') {
        mockBookings.forEach(booking => {
          booking.client = {
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
          }
        })
      }

      setBookings(mockBookings)
    } catch (error) {
      console.error('Failed to load bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REFUNDED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status.toLowerCase() === filter
    const matchesSearch = searchQuery === '' || 
      booking.sessionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session?.user?.role === 'CLIENT' 
        ? `${booking.photographer.user.firstName} ${booking.photographer.user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        : `${booking.client?.firstName} ${booking.client?.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    return matchesFilter && matchesSearch
  })

  if (status === 'loading' || loading) {
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
              <h1 className="text-3xl font-bold text-gray-900">
                {session.user.role === 'PHOTOGRAPHER' ? 'My Sessions' : 'My Bookings'}
              </h1>
              <p className="text-gray-600 mt-1">
                {session.user.role === 'PHOTOGRAPHER' 
                  ? 'Manage your photography sessions and client bookings'
                  : 'Track your photography sessions and bookings'
                }
              </p>
            </div>
            
            {session.user.role === 'CLIENT' && (
              <Button onClick={() => router.push('/photographers')}>
                Book New Session
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bookings..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                {session.user.role === 'CLIENT' 
                  ? "You haven't booked any photography sessions yet."
                  : "You don't have any client bookings yet."
                }
              </p>
              {session.user.role === 'CLIENT' && (
                <Button onClick={() => router.push('/photographers')}>
                  Find Photographers
                </Button>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <Camera className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.sessionType.replace('_', ' ')} Session
                            </h3>
                            <p className="text-sm text-gray-600">
                              Booking #{booking.id}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm truncate">
                            {booking.location}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            ${booking.totalAmount}
                          </span>
                        </div>
                      </div>

                      {/* Photographer/Client Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {session.user.role === 'CLIENT' ? (
                            <>
                              {booking.photographer.user.avatar ? (
                                <img
                                  src={booking.photographer.user.avatar}
                                  alt={booking.photographer.user.firstName}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-gray-600" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {booking.photographer.user.firstName} {booking.photographer.user.lastName}
                                </p>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600 ml-1">
                                    {booking.photographer.rating} ({booking.photographer.totalReviews} reviews)
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {booking.client?.avatar ? (
                                <img
                                  src={booking.client.avatar}
                                  alt={booking.client.firstName}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-gray-600" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {booking.client?.firstName} {booking.client?.lastName}
                                </p>
                                <p className="text-xs text-gray-600">Client</p>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          
                          {booking.status === 'COMPLETED' && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Photos
                            </Button>
                          )}
                          
                          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
