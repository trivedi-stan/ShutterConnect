'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Calendar, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to photographers page with search params
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (location) params.set('location', location)
    window.location.href = `/photographers?${params.toString()}`
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                Photographer
              </span>{' '}
              in Seconds
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Connect with verified professional photographers for events, portraits, and commercial shoots. 
              Book your session in under 60 seconds with our seamless platform.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mt-8 bg-white rounded-2xl shadow-lg p-6 max-w-2xl">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="What type of photography?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Find Photographers
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9/5 average rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <span>10,000+ sessions booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>All photographers verified</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Hero Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554048612-b6a482b224b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional photographer at work"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80"
                      alt="Photographer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Alex Chen</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9 • Wedding Specialist</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">$150</p>
                    <p className="text-sm text-gray-600">per hour</p>
                    <Button size="sm" className="mt-2">Book Now</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary-100 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Are you a professional photographer?
          </p>
          <Link href="/photographer/signup">
            <Button variant="outline" size="lg">
              Join Our Network
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
