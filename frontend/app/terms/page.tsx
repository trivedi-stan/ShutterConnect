import { FileText, Users, Camera, CreditCard, Shield, AlertTriangle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Please read these terms carefully before using ShutterConnect. By using our platform, you agree to these terms and conditions.
            </p>
            <p className="text-white/80 mt-4">Last updated: December 2024</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Responsibilities</h3>
              <p className="text-gray-600 text-sm">Your obligations when using our platform</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Platform Rules</h3>
              <p className="text-gray-600 text-sm">Guidelines for safe and fair usage</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
              <p className="text-gray-600 text-sm">How payments and fees work</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing or using ShutterConnect, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Your continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Platform Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Description</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ShutterConnect is a marketplace platform that connects clients with professional photographers. We facilitate bookings, payments, and communications but are not a party to the actual photography services provided.
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• We provide a platform for photographers to offer their services</li>
              <li>• We enable clients to discover and book photography sessions</li>
              <li>• We process payments securely between parties</li>
              <li>• We provide customer support and dispute resolution</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Creation</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• You must be at least 18 years old to create an account</li>
              <li>• You must provide accurate and complete information</li>
              <li>• You are responsible for maintaining account security</li>
              <li>• One person may only maintain one account</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Responsibilities</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• Keep your login credentials secure</li>
              <li>• Notify us immediately of any unauthorized access</li>
              <li>• Update your information when it changes</li>
              <li>• Comply with all platform rules and guidelines</li>
            </ul>
          </section>

          {/* For Photographers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Photographer Terms</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Requirements</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• Complete identity verification with government-issued ID</li>
              <li>• Provide proof of professional photography experience</li>
              <li>• Submit portfolio samples for quality review</li>
              <li>• Maintain current insurance and licensing as required</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Obligations</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• Provide services as described in your listings</li>
              <li>• Maintain professional standards and conduct</li>
              <li>• Deliver photos within agreed timeframes</li>
              <li>• Honor your pricing and availability commitments</li>
            </ul>
          </section>

          {/* For Clients */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Client Terms</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Responsibilities</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• Provide accurate booking information and requirements</li>
              <li>• Pay for services as agreed upon booking</li>
              <li>• Respect photographer's time and professional boundaries</li>
              <li>• Follow cancellation policies as stated</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Terms</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• Payment is due at time of booking</li>
              <li>• Refunds are subject to photographer's cancellation policy</li>
              <li>• Additional services may incur extra charges</li>
              <li>• Disputes must be reported within 7 days of service</li>
            </ul>
          </section>

          {/* Platform Fees */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Platform Fees</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ShutterConnect charges service fees to maintain and improve our platform:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Clients pay a service fee on each booking</li>
              <li>• Photographers pay a commission on completed sessions</li>
              <li>• Payment processing fees apply to all transactions</li>
              <li>• Fees are clearly displayed before payment confirmation</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Activities</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The following activities are strictly prohibited on our platform:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Circumventing platform fees by conducting transactions off-platform</li>
              <li>• Creating fake accounts or providing false information</li>
              <li>• Harassment, discrimination, or inappropriate behavior</li>
              <li>• Uploading inappropriate, illegal, or copyrighted content</li>
              <li>• Attempting to hack, spam, or disrupt platform operations</li>
              <li>• Violating any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Intellectual property rights are important to our community:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Photographers retain rights to their original work</li>
              <li>• Clients receive usage rights as agreed in their contracts</li>
              <li>• ShutterConnect owns rights to platform content and branding</li>
              <li>• Users must respect copyright and trademark laws</li>
              <li>• Report any intellectual property violations to us</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ShutterConnect provides a platform service and has certain limitations on liability:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• We are not responsible for the quality of photography services</li>
              <li>• We do not guarantee photographer availability or performance</li>
              <li>• Our liability is limited to the amount of fees paid to us</li>
              <li>• We are not liable for indirect or consequential damages</li>
              <li>• Users participate in transactions at their own risk</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Account Termination</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Accounts may be terminated under the following circumstances:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Violation of these terms of service</li>
              <li>• Fraudulent or illegal activity</li>
              <li>• Repeated customer complaints or poor service</li>
              <li>• User request for account deletion</li>
              <li>• Extended period of inactivity</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by the laws of India. Any disputes will be resolved through binding arbitration in Noida, Uttar Pradesh, India, unless otherwise required by applicable law.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Email:</strong> legal@shutterconnect.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +91 9616819656</p>
              <p className="text-gray-700"><strong>Address:</strong> Noida, Uttar Pradesh, India</p>
            </div>
          </section>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
              <p className="text-yellow-800">
                These terms constitute a legally binding agreement. Please read them carefully and contact us if you have any questions before using our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Legal Help?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Legal Team
            </a>
            <a
              href="/privacy"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              View Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
