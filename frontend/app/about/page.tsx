import { Camera, Users, Award, Heart, Target, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  const stats = [
    { number: "10,000+", label: "Professional Photographers" },
    { number: "50,000+", label: "Happy Clients" },
    { number: "100,000+", label: "Sessions Completed" },
    { number: "4.9/5", label: "Average Rating" }
  ]

  const values = [
    {
      icon: Camera,
      title: "Quality First",
      description: "We carefully vet every photographer to ensure they meet our high standards for professionalism and skill."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We believe in building a supportive community where photographers and clients can connect and grow together."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your security is our priority. We provide secure payments, verified profiles, and comprehensive support."
    },
    {
      icon: Heart,
      title: "Passion for Photography",
      description: "We're photographers ourselves and understand the art, craft, and business of professional photography."
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Former wedding photographer with 10+ years of experience building photography businesses."
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Tech entrepreneur passionate about connecting creative professionals with their ideal clients."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Event photographer and community builder focused on photographer success and client satisfaction."
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Product designer with a background in creative tools and marketplace platforms."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Connecting the World Through Photography
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                ShutterConnect was born from a simple belief: everyone deserves access to 
                professional photography, and every photographer deserves the opportunity 
                to build a thriving business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/photographers">
                  <Button size="lg">Find Photographers</Button>
                </Link>
                <Link href="/auth/signup?role=PHOTOGRAPHER">
                  <Button variant="outline" size="lg">Join Our Community</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0a6b8b6ce8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Photography team"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're democratizing professional photography by making it accessible, 
              affordable, and easy to book while empowering photographers to grow their businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-6">
              ShutterConnect started in 2020 when our founders, both photographers themselves, 
              experienced firsthand the challenges of connecting with clients and building a 
              sustainable photography business.
            </p>
            
            <p className="leading-relaxed mb-6">
              After struggling with expensive marketing, unreliable booking systems, and 
              payment delays, they realized there had to be a better way. They envisioned 
              a platform that would benefit both photographers and clients - making it easier 
              for people to find and book professional photography while giving photographers 
              the tools they need to succeed.
            </p>
            
            <p className="leading-relaxed mb-6">
              Today, ShutterConnect is the fastest-growing photography marketplace, trusted 
              by thousands of photographers and clients worldwide. We've facilitated over 
              100,000 photography sessions and helped photographers earn millions in revenue.
            </p>
            
            <p className="leading-relaxed">
              But we're just getting started. Our vision is to become the global standard 
              for professional photography services, making beautiful photography accessible 
              to everyone while empowering photographers to build thriving businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              We're a passionate team of photographers, designers, and technologists 
              dedicated to revolutionizing the photography industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-primary-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join the ShutterConnect Community
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're looking to book a photographer or grow your photography business, 
            we're here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/photographers">
              <Button size="lg" className="w-full sm:w-auto">
                Book a Session
              </Button>
            </Link>
            <Link href="/auth/signup?role=PHOTOGRAPHER">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Become a Photographer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
