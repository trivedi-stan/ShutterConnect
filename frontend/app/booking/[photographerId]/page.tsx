'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  User, 
  Camera,
  Star,
  ArrowLeft,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

// Booking validation schema
const bookingSchema = z.object({
  sessionType: z.string().min(1, 'Please select a session type'),
  date: z.string().min(1, 'Please select a date'),
  startTime: z.string().min(1, 'Please select a start time'),
  duration: z.number().min(1, 'Please select duration').max(12, 'Maximum 12 hours'),
  location: z.string().min(5, 'Please provide a detailed location'),
  notes: z.string().optional(),
})

type BookingInput = z.infer<typeof bookingSchema>

const SESSION_TYPES = [
  { value: 'WEDDING', label: 'Wedding', description: 'Full wedding day coverage' },
  { value: 'PORTRAIT', label: 'Portrait', description: 'Individual or family portraits' },
  { value: 'EVENT', label: 'Event', description: 'Corporate or social events' },
  { value: 'CORPORATE', label: 'Corporate', description: 'Business and professional photos' },
  { value: 'FASHION', label: 'Fashion', description: 'Fashion and lifestyle shoots' },
  { value: 'HEADSHOTS', label: 'Headshots', description: 'Professional headshots' },
]

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

export default function BookingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const photographerId = params.photographerId as string

  const [photographer, setPhotographer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      duration: 2,
    },
  })

  const watchedDuration = watch('duration')
  const watchedSessionType = watch('sessionType')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push(`/auth/signin?callbackUrl=/booking/${photographerId}`)
      return
    }

    loadPhotographer()
  }, [session, status, photographerId, router])

  const loadPhotographer = async () => {
    try {
      const response = await fetch(`/api/photographers/${photographerId}`)
      if (response.ok) {
        const data = await response.json()
        setPhotographer(data.photographer)
      } else {
        toast.error('Photographer not found')
        router.push('/photographers')
      }
    } catch (error) {
      console.error('Failed to load photographer:', error)
      toast.error('Failed to load photographer details')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    if (!photographer || !watchedDuration) return 0
    return photographer.hourlyRate * watchedDuration
  }

  const onSubmit = async (data: BookingInput) => {
    setSubmitting(true)
    
    try {
      const bookingData = {
        ...data,
        photographerId,
        totalAmount: calculateTotal(),
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Booking request submitted successfully!')
        router.push(`/dashboard?tab=bookings`)
      } else {
        toast.error(result.error || 'Failed to submit booking')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      toast.error('An error occurred while submitting your booking')
    } finally {
      setSubmitting(false)
    }
  }

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

  if (!photographer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Photographer not found</h2>
          <Button onClick={() => router.push('/photographers')}>
            Browse Photographers
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Book {photographer.user.firstName} {photographer.user.lastName}
                </h1>
                <p className="text-sm text-gray-600">
                  Complete your booking details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photographer Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <div className="flex items-center mb-4">
                {photographer.user.avatar ? (
                  <img
                    src={photographer.user.avatar}
                    alt={photographer.user.firstName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-600" />
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {photographer.user.firstName} {photographer.user.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {photographer.rating.toFixed(1)} ({photographer.totalReviews} reviews)
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {photographer.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Camera className="h-4 w-4 mr-2" />
                  {photographer.experience} years experience
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  ${photographer.hourlyRate}/hour
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {photographer.specialties.slice(0, 4).map((specialty: string) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {specialty.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              {watchedDuration && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{watchedDuration} hour{watchedDuration !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>${photographer.hourlyRate}/hour</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Session Type */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Session Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SESSION_TYPES.map((type) => (
                    <label key={type.value} className="relative">
                      <input
                        {...register('sessionType')}
                        type="radio"
                        value={type.value}
                        className="sr-only"
                      />
                      <div className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        watchedSessionType === type.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                        {watchedSessionType === type.value && (
                          <Check className="absolute top-2 right-2 h-5 w-5 text-primary-600" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.sessionType && (
                  <p className="mt-2 text-sm text-red-600">{errors.sessionType.message}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Date & Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      {...register('date')}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <select
                      {...register('startTime')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.startTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours)
                    </label>
                    <select
                      {...register('duration', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                        <option key={hours} value={hours}>
                          {hours} hour{hours !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    {errors.duration && (
                      <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Location
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Location
                  </label>
                  <input
                    {...register('location')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter the full address or venue name"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Notes
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements or Notes
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Any special requirements, style preferences, or important details..."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      By submitting this booking, you agree to our terms and conditions.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    loading={submitting}
                    disabled={submitting}
                    className="px-8"
                  >
                    Submit Booking Request
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
