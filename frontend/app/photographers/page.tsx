'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, MapPin, Filter, Star, Camera, DollarSign, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface Photographer {
  id: string
  user: {
    firstName: string
    lastName: string
    avatar?: string
  }
  bio?: string
  hourlyRate?: number
  location?: string
  specialties: string[]
  portfolio: string[]
  rating?: number
  totalReviews: number
  totalBookings: number
  packages: Array<{
    id: string
    name: string
    price: number
    description: string
  }>
}

const PHOTOGRAPHY_SPECIALTIES = [
  'WEDDING', 'PORTRAIT', 'EVENT', 'CORPORATE', 'FASHION', 'LANDSCAPE',
  'PRODUCT', 'REAL_ESTATE', 'SPORTS', 'NEWBORN', 'FAMILY', 'HEADSHOTS'
]

const INDIAN_STATES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik'
]

export default function PhotographersPage() {
  const searchParams = useSearchParams()
  const [photographers, setPhotographers] = useState<Photographer[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
    specialty: searchParams.get('specialty') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchPhotographers()
  }, [filters])

  const fetchPhotographers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api/photographers?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setPhotographers(data.photographers || [])
      }
    } catch (error) {
      console.error('Failed to fetch photographers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      state: '',
      city: '',
      specialty: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Photographers</h1>
              <p className="text-gray-600 mt-1">
                Discover professional photographers for your next project
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{photographers.length} photographers found</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by photographer name..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City, State"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/City
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All States</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <select
                    value={filters.specialty}
                    onChange={(e) => handleFilterChange('specialty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Specialties</option>
                    {PHOTOGRAPHY_SPECIALTIES.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : photographers.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photographers found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or filters to find more photographers.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map((photographer) => (
              <Link
                key={photographer.id}
                href={`/photographers/${photographer.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Portfolio Preview */}
                  <div className="relative h-48 overflow-hidden">
                    {photographer.portfolio.length > 0 ? (
                      <div className="grid grid-cols-3 h-full">
                        {photographer.portfolio.slice(0, 3).map((image, index) => (
                          <div key={index} className="relative overflow-hidden">
                            <img
                              src={image}
                              alt={`${photographer.user.firstName} portfolio ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/200x200?text=No+Image'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Camera className="h-12 w-12 text-gray-400" />
                      </div>
                    )}

                    {/* Rating Badge */}
                    {photographer.rating && photographer.rating > 0 && (
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium">{photographer.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Photographer Info */}
                    <div className="flex items-center mb-3">
                      {photographer.user.avatar ? (
                        <img
                          src={photographer.user.avatar}
                          alt={`${photographer.user.firstName} ${photographer.user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <Camera className="h-5 w-5 text-primary-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {photographer.user.firstName} {photographer.user.lastName}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          {photographer.location && (
                            <>
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{photographer.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    {photographer.bio && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {photographer.bio}
                      </p>
                    )}

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {photographer.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded"
                        >
                          {specialty.replace('_', ' ')}
                        </span>
                      ))}
                      {photographer.specialties.length > 3 && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{photographer.specialties.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          <span>{photographer.totalReviews} reviews</span>
                        </div>
                        <div className="flex items-center">
                          <Camera className="h-3 w-3 mr-1" />
                          <span>{photographer.totalBookings} sessions</span>
                        </div>
                      </div>
                      {photographer.hourlyRate && (
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${photographer.hourlyRate}
                          </div>
                          <div className="text-xs text-gray-500">per hour</div>
                        </div>
                      )}
                    </div>

                    {/* Packages Preview */}
                    {photographer.packages.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Starting from</div>
                        <div className="text-sm font-medium text-primary-600">
                          ${Math.min(...photographer.packages.map(p => p.price))} - {photographer.packages[0].name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
