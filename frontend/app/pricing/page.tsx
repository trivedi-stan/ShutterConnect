import { Check, Star, Camera, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function PricingPage() {
  const plans = [
    {
      name: "Basic Session",
      price: "$150-300",
      duration: "1-2 hours",
      description: "Perfect for portraits, headshots, and small events",
      features: [
        "Professional photographer",
        "1-2 hour session",
        "20-50 edited photos",
        "Online gallery access",
        "High-resolution downloads",
        "Basic retouching included"
      ],
      popular: false,
      icon: Camera
    },
    {
      name: "Premium Session",
      price: "$400-800",
      duration: "3-5 hours",
      description: "Ideal for weddings, corporate events, and special occasions",
      features: [
        "Experienced photographer",
        "3-5 hour coverage",
        "100-200 edited photos",
        "Online gallery with sharing",
        "High-resolution downloads",
        "Advanced retouching",
        "Multiple outfit changes",
        "Location flexibility"
      ],
      popular: true,
      icon: Star
    },
    {
      name: "Enterprise Package",
      price: "$1000+",
      duration: "Full day+",
      description: "Comprehensive coverage for large events and commercial needs",
      features: [
        "Top-tier photographer",
        "Full day coverage",
        "500+ edited photos",
        "Premium online gallery",
        "Commercial usage rights",
        "Professional retouching",
        "Multiple photographers",
        "Video highlights",
        "Rush delivery available",
        "Dedicated support"
      ],
      popular: false,
      icon: Users
    }
  ]

  const photographerPricing = [
    {
      category: "Portrait Photography",
      priceRange: "$100-400/hour",
      description: "Individual, couple, family, and professional headshots"
    },
    {
      category: "Wedding Photography",
      priceRange: "$1,500-5,000",
      description: "Full wedding day coverage with engagement sessions"
    },
    {
      category: "Event Photography",
      priceRange: "$200-600/hour",
      description: "Corporate events, parties, and special occasions"
    },
    {
      category: "Commercial Photography",
      priceRange: "$300-1,000/hour",
      description: "Product, real estate, and business photography"
    },
    {
      category: "Fashion Photography",
      priceRange: "$400-1,200/hour",
      description: "Fashion shoots, lookbooks, and brand campaigns"
    }
  ]

  const faqs = [
    {
      question: "How does pricing work on ShutterConnect?",
      answer: "Photographers set their own rates based on their experience, location, and services offered. You can filter by budget to find photographers within your price range."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees! The price you see is what you pay. Our small service fee is clearly displayed before booking and helps us maintain the platform."
    },
    {
      question: "What's included in the session price?",
      answer: "Each photographer's listing clearly shows what's included. Typically this covers the session time, basic editing, and digital delivery. Additional services like prints or rush delivery may cost extra."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a satisfaction guarantee. If you're not happy with your photos, we'll work with you and the photographer to make it right or provide a refund."
    },
    {
      question: "How do I pay for my session?",
      answer: "We accept all major credit cards and PayPal. Payment is processed securely through our platform, and photographers are paid after successful completion of your session."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality photography at fair prices. No hidden fees, no surprises. 
            Find the perfect photographer within your budget.
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Photography Packages
            </h2>
            <p className="text-lg text-gray-600">
              Choose from a variety of photography sessions to fit your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <plan.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{plan.price}</div>
                  <div className="text-gray-600 mb-4">{plan.duration}</div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/photographers">
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Find Photographers
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pricing */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing by Category
            </h2>
            <p className="text-lg text-gray-600">
              Average pricing ranges for different types of photography services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographerPricing.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.category}
                </h3>
                <div className="text-2xl font-bold text-primary-600 mb-3">
                  {category.priceRange}
                </div>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about pricing on ShutterConnect
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Book Your Session?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Browse our network of professional photographers and find the perfect match for your budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/photographers">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Browse Photographers
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
