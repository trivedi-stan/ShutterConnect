import Link from 'next/link'
import { Star, MapPin, Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function FeaturedPhotographers() {
  const photographers = [
    {
      id: '1',
      name: 'Sarah Chen',
      specialties: ['Wedding', 'Portrait'],
      location: 'San Francisco, CA',
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 200,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&w=300&q=80',
      ],
      totalBookings: 89,
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      specialties: ['Event', 'Commercial'],
      location: 'Los Angeles, CA',
      rating: 4.8,
      reviewCount: 94,
      hourlyRate: 250,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&w=300&q=80',
      ],
      totalBookings: 156,
    },
    {
      id: '3',
      name: 'Emily Johnson',
      specialties: ['Newborn', 'Family'],
      location: 'Austin, TX',
      rating: 5.0,
      reviewCount: 73,
      hourlyRate: 180,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?ixlib=rb-4.0.3&w=300&q=80',
      ],
      totalBookings: 67,
    },
    {
      id: '4',
      name: 'David Kim',
      specialties: ['Fashion', 'Portrait'],
      location: 'New York, NY',
      rating: 4.9,
      reviewCount: 112,
      hourlyRate: 300,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80',
      portfolio: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=300&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=300&q=80',
      ],
      totalBookings: 203,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Photographers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated photographers who consistently deliver exceptional results 
            and outstanding customer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photographers.map((photographer) => (
            <div
              key={photographer.id}
              className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow border border-gray-100 overflow-hidden group"
            >
              {/* Portfolio Preview */}
              <div className="relative h-48 overflow-hidden">
                <div className="grid grid-cols-3 h-full">
                  {photographer.portfolio.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={`${photographer.name} portfolio ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Overlay with booking count */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  <Camera className="w-3 h-3 inline mr-1" />
                  {photographer.totalBookings} sessions
                </div>
              </div>

              {/* Photographer Info */}
              <div className="p-6">
                {/* Avatar and Name */}
                <div className="flex items-center mb-4">
                  <img
                    src={photographer.avatar}
                    alt={photographer.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{photographer.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {photographer.location}
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {photographer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {photographer.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-600">
                      ({photographer.reviewCount})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ${photographer.hourlyRate}
                    </div>
                    <div className="text-xs text-gray-600">per hour</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link href={`/photographers/${photographer.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/book/${photographer.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/photographers">
            <Button size="lg" variant="outline">
              View All Photographers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
