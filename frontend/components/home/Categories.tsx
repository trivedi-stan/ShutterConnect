import Link from 'next/link'
import { Heart, Briefcase, Users, Baby, Home, Palette, Camera, Sparkles } from 'lucide-react'

export function Categories() {
  const categories = [
    {
      id: 'wedding',
      name: 'Wedding',
      description: 'Capture your special day with professional wedding photographers',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=400&q=80',
      count: '500+ photographers',
      startingPrice: '$200/hour',
    },
    {
      id: 'portrait',
      name: 'Portrait',
      description: 'Professional headshots and personal portrait sessions',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400&q=80',
      count: '800+ photographers',
      startingPrice: '$100/hour',
    },
    {
      id: 'event',
      name: 'Event',
      description: 'Corporate events, parties, and special occasions',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&w=400&q=80',
      count: '600+ photographers',
      startingPrice: '$150/hour',
    },
    {
      id: 'commercial',
      name: 'Commercial',
      description: 'Product photography and business marketing content',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&w=400&q=80',
      count: '400+ photographers',
      startingPrice: '$250/hour',
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Family portraits and lifestyle photography sessions',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&w=400&q=80',
      count: '700+ photographers',
      startingPrice: '$120/hour',
    },
    {
      id: 'newborn',
      name: 'Newborn',
      description: 'Gentle newborn and maternity photography',
      icon: Baby,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&w=400&q=80',
      count: '300+ photographers',
      startingPrice: '$180/hour',
    },
    {
      id: 'fashion',
      name: 'Fashion',
      description: 'Fashion shoots and creative portrait photography',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&w=400&q=80',
      count: '250+ photographers',
      startingPrice: '$300/hour',
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Real estate, food, and specialized photography',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&w=400&q=80',
      count: '900+ photographers',
      startingPrice: '$80/hour',
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Photography for Every Occasion
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From intimate portraits to grand celebrations, find the perfect photographer 
            for your specific needs and style preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/photographers?category=${category.id}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{category.count}</span>
                    <span className="font-semibold text-primary-600">
                      {category.startingPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            href="/photographers"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
          >
            Browse All Photographers
          </Link>
        </div>
      </div>
    </section>
  )
}
