import { Search, Calendar, Camera, Download } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Search & Discover',
      description: 'Browse our network of verified professional photographers by location, specialty, and style.',
      icon: Search,
      details: [
        'Filter by photography type',
        'View portfolios and reviews',
        'Compare pricing and availability',
        'Read verified client testimonials'
      ]
    },
    {
      id: 2,
      title: 'Book Your Session',
      description: 'Select your preferred photographer and book your session in under 60 seconds.',
      icon: Calendar,
      details: [
        'Choose date and time',
        'Specify session details',
        'Secure payment processing',
        'Instant confirmation'
      ]
    },
    {
      id: 3,
      title: 'Capture Moments',
      description: 'Meet your photographer and enjoy a professional photo session tailored to your needs.',
      icon: Camera,
      details: [
        'Professional equipment',
        'Creative direction',
        'Multiple outfit changes',
        'Various locations if needed'
      ]
    },
    {
      id: 4,
      title: 'Receive Your Photos',
      description: 'Get your professionally edited photos delivered within 48 hours.',
      icon: Download,
      details: [
        'High-resolution images',
        'Professional editing',
        'Secure online gallery',
        'Easy download and sharing'
      ]
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How ShutterConnect Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From discovery to delivery, we've streamlined the entire photography booking 
            process to make it simple, fast, and reliable.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Step Circle */}
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mx-auto mb-6 relative z-10">
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                    {step.id}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    
                    {/* Details List */}
                    <ul className="text-sm text-gray-500 space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center justify-center">
                          <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              {/* Step Circle */}
              <div className="flex-shrink-0 relative">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {step.id}
                </div>
                
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-primary-200"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {step.description}
                </p>
                
                {/* Details List */}
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center">
                      <span className="w-1 h-1 bg-primary-400 rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-soft p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied clients who have found their perfect photographer 
              through ShutterConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 text-lg">
                Find Photographers
              </button>
              <button className="btn-outline px-8 py-3 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
