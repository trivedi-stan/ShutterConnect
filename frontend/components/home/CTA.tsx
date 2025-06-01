import Link from 'next/link'
import { ArrowRight, Camera, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Capture Your Perfect Moments?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join thousands of satisfied clients who have found their ideal photographer 
              through ShutterConnect. Professional photography made simple, fast, and reliable.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-primary-100">Verified professional photographers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-primary-100">Book sessions in under 60 seconds</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-primary-100">Photos delivered within 48 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-primary-100">Secure payments and satisfaction guarantee</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/photographers">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Find Photographers
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                <p className="text-primary-100">Thousands of successful sessions and counting</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-sm text-primary-100">Photographers</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-sm text-primary-100">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-sm text-primary-100">Avg Rating</div>
                </div>
              </div>

              {/* Testimonial Preview */}
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80"
                    alt="Client testimonial"
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-semibold text-sm">Jessica M.</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-primary-100 italic">
                  "Amazing experience! Found the perfect photographer in minutes and the results exceeded expectations."
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-400 bg-opacity-30 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-400 bg-opacity-30 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Section - For Photographers */}
        <div className="mt-16 pt-12 border-t border-white border-opacity-20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Are You a Professional Photographer?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join our network of verified photographers and grow your business with a steady 
              stream of quality clients. Set your own rates, manage your schedule, and focus on what you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/photographer/signup">
                <Button 
                  size="lg"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 text-lg font-semibold"
                >
                  Join Our Network
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/photographer/resources">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
