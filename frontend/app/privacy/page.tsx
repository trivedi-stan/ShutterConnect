import { Shield, Eye, Lock, Users, Database, Globe } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information on ShutterConnect.
            </p>
            <p className="text-white/80 mt-4">Last updated: December 2024</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy at a Glance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">We're clear about what data we collect and why</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
              <p className="text-gray-600 text-sm">Your data is protected with industry-standard security</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Control</h3>
              <p className="text-gray-600 text-sm">You have control over your personal information</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ShutterConnect ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our photography marketplace platform.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using ShutterConnect, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• Name, email address, and phone number</li>
              <li>• Profile photos and portfolio images</li>
              <li>• Location and address information</li>
              <li>• Payment and billing information</li>
              <li>• Government-issued ID for verification (photographers)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
            <ul className="text-gray-600 space-y-2 mb-4 ml-4">
              <li>• How you interact with our platform</li>
              <li>• Search queries and booking history</li>
              <li>• Messages and communications</li>
              <li>• Device information and IP address</li>
              <li>• Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Provide and maintain our services</li>
              <li>• Process bookings and payments</li>
              <li>• Verify photographer identities</li>
              <li>• Send important notifications and updates</li>
              <li>• Improve our platform and user experience</li>
              <li>• Prevent fraud and ensure platform safety</li>
              <li>• Comply with legal obligations</li>
              <li>• Send marketing communications (with your consent)</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• With photographers when you book a session</li>
              <li>• With clients when you accept a booking (photographers)</li>
              <li>• With service providers who help us operate our platform</li>
              <li>• When required by law or to protect our rights</li>
              <li>• In connection with a business transfer or merger</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Encryption of data in transit and at rest</li>
              <li>• Regular security assessments and updates</li>
              <li>• Access controls and authentication</li>
              <li>• Secure payment processing through Stripe</li>
              <li>• Regular backups and disaster recovery plans</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Access and review your personal information</li>
              <li>• Update or correct inaccurate information</li>
              <li>• Delete your account and personal information</li>
              <li>• Opt out of marketing communications</li>
              <li>• Request a copy of your data</li>
              <li>• Object to certain processing activities</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Essential cookies for platform functionality</li>
              <li>• Analytics cookies to understand usage patterns</li>
              <li>• Preference cookies to remember your settings</li>
              <li>• Marketing cookies for personalized advertising</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not intended for children under 18. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Email:</strong> privacy@shutterconnect.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +91 9616819656</p>
              <p className="text-gray-700"><strong>Address:</strong> Noida, Uttar Pradesh, India</p>
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help with Privacy?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/settings/privacy"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Privacy Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
