import { Search, UserCheck, Calendar, Camera, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse our network of verified professional photographers. Filter by location, style, specialty, and budget to find your perfect match.",
      details: [
        "Advanced search filters",
        "Portfolio previews",
        "Real customer reviews",
        "Instant availability check"
      ]
    },
    {
      icon: UserCheck,
      title: "Review & Compare",
      description: "View detailed profiles, portfolios, and reviews. Compare photographers side-by-side to make the best choice for your needs.",
      details: [
        "Detailed photographer profiles",
        "High-quality portfolio galleries",
        "Verified customer reviews",
        "Transparent pricing"
      ]
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description: "Select your preferred date, time, and package. Book your session in under 60 seconds with our streamlined booking system.",
      details: [
        "Real-time availability",
        "Instant booking confirmation",
        "Secure payment processing",
        "Flexible rescheduling"
      ]
    },
    {
      icon: Camera,
      title: "Capture Memories",
      description: "Meet your photographer and enjoy your session. Professional photographers handle all the technical details while you focus on the moment.",
      details: [
        "Professional equipment",
        "Expert lighting and composition",
        "Comfortable session experience",
        "Multiple outfit/location options"
      ]
    },
    {
      icon: Star,
      title: "Receive & Review",
      description: "Get your professionally edited photos delivered digitally. Leave a review to help other clients and photographers.",
      details: [
        "High-resolution digital delivery",
        "Professional editing included",
        "Online gallery access",
        "Print-ready files"
      ]
    }
  ]

  const benefits = [
    {
      title: "For Clients",
      features: [
        "Access to 10,000+ verified photographers",
        "Transparent pricing with no hidden fees",
        "Secure payment protection",
        "24/7 customer support",
        "Satisfaction guarantee",
        "Easy rebooking for future events"
      ]
    },
    {
      title: "For Photographers",
      features: [
        "Grow your business with new clients",
        "Flexible scheduling and pricing",
        "Secure and timely payments",
        "Professional networking opportunities",
        "Marketing and portfolio tools",
        "Dedicated photographer support"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How ShutterConnect Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting clients with professional photographers has never been easier. 
            Follow these simple steps to book your perfect photography session.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <step.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-primary-600 mb-1">
                        Step {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center justify-center lg:justify-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0 ? '1560472354-b33ff0c44a43' :
                        index === 1 ? '1556742049-0a6b8b6ce8b7' :
                        index === 2 ? '1506905925-c4a71b909a4c' :
                        index === 3 ? '1554048612-b6a482b224b8' :
                        '1516035069-b7b8b1b1b1b1'
                      }?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                      alt={step.title}
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ShutterConnect?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the most comprehensive platform for photography services, 
              benefiting both clients and photographers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {benefit.title}
                </h3>
                <ul className="space-y-4">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied clients and photographers on ShutterConnect today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/photographers">
              <Button size="lg" className="w-full sm:w-auto">
                Find Photographers
              </Button>
            </Link>
            <Link href="/auth/signup?role=PHOTOGRAPHER">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Join as Photographer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
