import { Search, HelpCircle, Users, Camera, CreditCard, Shield, MessageCircle, Star } from 'lucide-react'

export default function HelpPage() {
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: HelpCircle,
      faqs: [
        {
          question: 'How do I create an account on ShutterConnect?',
          answer: 'Click the "Sign Up" button in the top right corner, choose your role (Client or Photographer), fill in your details, and verify your email address.'
        },
        {
          question: 'Is ShutterConnect free to use?',
          answer: 'Creating an account and browsing photographers is free. We charge a small service fee only when you book a session or receive payment as a photographer.'
        },
        {
          question: 'How do I find photographers in my area?',
          answer: 'Use our search feature on the "Find Photographers" page. You can filter by location, photography type, price range, and availability.'
        }
      ]
    },
    {
      title: 'For Clients',
      icon: Users,
      faqs: [
        {
          question: 'How do I book a photography session?',
          answer: 'Browse photographers, view their portfolios, select a package, choose your preferred date and time, and complete the booking with secure payment.'
        },
        {
          question: 'What if I need to cancel or reschedule?',
          answer: 'You can cancel or reschedule up to 24 hours before your session through your dashboard. Cancellation policies vary by photographer.'
        },
        {
          question: 'How do I receive my photos?',
          answer: 'Photographers will upload your edited photos to your account. You\'ll receive an email notification when they\'re ready for download.'
        }
      ]
    },
    {
      title: 'For Photographers',
      icon: Camera,
      faqs: [
        {
          question: 'How do I become a verified photographer?',
          answer: 'Complete your profile, upload portfolio samples, provide identification, and pass our verification process. This typically takes 2-3 business days.'
        },
        {
          question: 'How do I set my availability and pricing?',
          answer: 'Use your photographer dashboard to set your hourly rates, create packages, and manage your calendar availability.'
        },
        {
          question: 'When do I get paid?',
          answer: 'Payments are released 24 hours after session completion. Funds are transferred to your bank account within 2-3 business days.'
        }
      ]
    },
    {
      title: 'Payments & Billing',
      icon: CreditCard,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, and digital wallets through our secure Stripe integration.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees. Our service fee is clearly displayed before booking. Photographers set their own rates, and we charge a small platform fee.'
        },
        {
          question: 'How do refunds work?',
          answer: 'Refund policies depend on the photographer and timing of cancellation. Most photographers offer full refunds for cancellations 24+ hours in advance.'
        }
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: MessageCircle,
      href: '/contact',
      color: 'bg-blue-500'
    },
    {
      title: 'Safety Guidelines',
      description: 'Learn about staying safe',
      icon: Shield,
      href: '/safety',
      color: 'bg-green-500'
    },
    {
      title: 'Community Guidelines',
      description: 'Understand our community rules',
      icon: Users,
      href: '/community',
      color: 'bg-purple-500'
    },
    {
      title: 'Report an Issue',
      description: 'Report problems or violations',
      icon: Star,
      href: '/report',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Find answers to common questions and get the help you need to make the most of ShutterConnect.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <category.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:hello@shutterconnect.com"
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
