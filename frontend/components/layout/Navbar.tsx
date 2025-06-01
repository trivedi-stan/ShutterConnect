'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Camera, User, LogOut, Settings, MessageCircle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  const navigation = [
    { name: 'Find Photographers', href: '/photographers' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ]

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">ShutterConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || ''}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{session.user?.name}</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-1" />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {session ? (
              <>
                <hr className="my-2" />
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <Link
                  href="/auth/signin"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-primary-600 hover:text-primary-700 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
