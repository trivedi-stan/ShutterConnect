import { Users, Camera, Star, Clock } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      id: 1,
      name: 'Active Photographers',
      value: '2,500+',
      icon: Camera,
      description: 'Verified professionals ready to capture your moments',
    },
    {
      id: 2,
      name: 'Happy Clients',
      value: '50,000+',
      icon: Users,
      description: 'Satisfied customers across all photography categories',
    },
    {
      id: 3,
      name: 'Average Rating',
      value: '4.9/5',
      icon: Star,
      description: 'Consistently high-quality service from our network',
    },
    {
      id: 4,
      name: 'Booking Time',
      value: '<60s',
      icon: Clock,
      description: 'Average time to book a photography session',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the growing community of clients and photographers who trust ShutterConnect 
            for their photography needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {stat.name}
              </div>
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-gray-800 font-semibold mb-1">Secure Payments</div>
            <p className="text-sm text-gray-600">
              All transactions protected with bank-level security
            </p>
          </div>
          
          <div className="p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-800 font-semibold mb-1">Customer Support</div>
            <p className="text-sm text-gray-600">
              Round-the-clock assistance for all your needs
            </p>
          </div>
          
          <div className="p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">48h</div>
            <div className="text-gray-800 font-semibold mb-1">Photo Delivery</div>
            <p className="text-sm text-gray-600">
              Get your professionally edited photos within 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
