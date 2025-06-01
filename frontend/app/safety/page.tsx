import { Shield, CheckCircle, AlertTriangle, Users, Camera, Lock, Phone, MessageCircle } from 'lucide-react'

export default function SafetyPage() {
  const safetyTips = [
    {
      title: 'Meet in Public Places',
      description: 'For initial consultations, always meet in public, well-lit locations like cafes or photography studios.',
      icon: Users,
      category: 'Meeting Safety'
    },
    {
      title: 'Verify Identity',
      description: 'Check photographer profiles, reviews, and verification badges before booking sessions.',
      icon: CheckCircle,
      category: 'Verification'
    },
    {
      title: 'Share Your Plans',
      description: 'Let someone know your session location, time, and expected duration.',
      icon: MessageCircle,
      category: 'Communication'
    },
    {
      title: 'Trust Your Instincts',
      description: 'If something feels uncomfortable or unsafe, trust your gut and leave the situation.',
      icon: AlertTriangle,
      category: 'Personal Safety'
    },
    {
      title: 'Secure Payments',
      description: 'Only pay through our secure platform. Never send money directly or share financial information.',
      icon: Lock,
      category: 'Payment Security'
    },
    {
      title: 'Emergency Contacts',
      description: 'Keep emergency contacts readily available and know how to reach local authorities.',
      icon: Phone,
      category: 'Emergency Preparedness'
    }
  ]

  const photographerGuidelines = [
    'Complete profile verification with government-issued ID',
    'Maintain professional communication at all times',
    'Respect client boundaries and comfort levels',
    'Provide clear contracts and pricing information',
    'Meet clients in public for initial consultations',
    'Maintain appropriate professional distance',
    'Report any concerning behavior immediately'
  ]

  const clientGuidelines = [
    'Research photographers thoroughly before booking',
    'Read reviews and check verification status',
    'Communicate clearly about expectations and boundaries',
    'Meet in public places for initial meetings',
    'Bring a friend or family member if needed',
    'Trust your instincts about comfort and safety',
    'Report any inappropriate behavior'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Safety Guidelines
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your safety is our top priority. Learn how to stay safe while using ShutterConnect and what we do to protect our community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Safety Tips */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Essential Safety Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <tip.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-sm text-primary-600 font-medium mb-2">{tip.category}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Sections */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* For Photographers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Camera className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">For Photographers</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              As a photographer on our platform, you play a crucial role in maintaining a safe environment for all users.
            </p>
            
            <ul className="space-y-3">
              {photographerGuidelines.map((guideline, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Clients */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">For Clients</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Follow these guidelines to ensure a safe and positive experience when booking photography sessions.
            </p>
            
            <ul className="space-y-3">
              {clientGuidelines.map((guideline, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform Safety Features */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How ShutterConnect Keeps You Safe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Identity Verification</h3>
              <p className="text-gray-600 text-sm">All photographers undergo thorough identity verification</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">All transactions are processed securely through our platform</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Our support team is available around the clock</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Monitoring</h3>
              <p className="text-gray-600 text-sm">We actively monitor and moderate our community</p>
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-16">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Situations</h3>
              <p className="text-red-800 mb-4">
                If you find yourself in an emergency situation or feel unsafe:
              </p>
              <ul className="text-red-800 space-y-2">
                <li>• Contact local emergency services immediately (911 in US, 112 in India)</li>
                <li>• Report the incident to ShutterConnect support</li>
                <li>• Document any evidence if it's safe to do so</li>
                <li>• Seek support from friends, family, or professional counselors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help or Want to Report Something?</h2>
          <p className="text-gray-600 mb-6">
            Our safety team is here to help. Don't hesitate to reach out if you have concerns or need assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/report"
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Report an Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
