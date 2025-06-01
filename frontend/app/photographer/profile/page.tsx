'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Camera, 
  MapPin, 
  DollarSign, 
  Star, 
  Upload, 
  Plus, 
  X,
  Save,
  User,
  Briefcase,
  Globe,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

// Validation schema for photographer profile
const photographerProfileSchema = z.object({
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(1000, 'Bio must be less than 1000 characters'),
  experience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience must be realistic'),
  hourlyRate: z.number().min(25, 'Minimum rate is $25/hour').max(1000, 'Maximum rate is $1000/hour'),
  location: z.string().min(5, 'Please provide a valid location'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  equipment: z.array(z.string()).min(1, 'List at least one piece of equipment'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
})

type PhotographerProfileInput = z.infer<typeof photographerProfileSchema>

const PHOTOGRAPHY_SPECIALTIES = [
  'WEDDING', 'PORTRAIT', 'EVENT', 'CORPORATE', 'FASHION', 'LANDSCAPE',
  'PRODUCT', 'REAL_ESTATE', 'SPORTS', 'NEWBORN', 'FAMILY', 'HEADSHOTS'
]

const COMMON_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Russian', 'Hindi'
]

export default function PhotographerProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [portfolioImages, setPortfolioImages] = useState<string[]>([])
  const [newEquipment, setNewEquipment] = useState('')
  const [profileData, setProfileData] = useState<any>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PhotographerProfileInput>({
    resolver: zodResolver(photographerProfileSchema),
    defaultValues: {
      specialties: [],
      equipment: [],
      languages: ['English'],
    },
  })

  const watchedSpecialties = watch('specialties')
  const watchedEquipment = watch('equipment')
  const watchedLanguages = watch('languages')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?callbackUrl=/photographer/profile')
      return
    }

    if (session.user.role !== 'PHOTOGRAPHER') {
      router.push('/dashboard')
      return
    }

    // Load existing profile data
    loadProfileData()
  }, [session, status, router])

  const loadProfileData = async () => {
    try {
      const response = await fetch('/api/photographer/profile')
      if (response.ok) {
        const data = await response.json()
        if (data.photographer) {
          setProfileData(data.photographer)
          // Populate form with existing data
          Object.keys(data.photographer).forEach(key => {
            if (key === 'portfolio') {
              setPortfolioImages(data.photographer[key] || [])
            } else {
              setValue(key as any, data.photographer[key])
            }
          })
        }
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }

  const onSubmit = async (data: PhotographerProfileInput) => {
    setIsLoading(true)
    
    try {
      const profileData = {
        ...data,
        portfolio: portfolioImages,
      }

      const response = await fetch('/api/photographer/profile', {
        method: profileData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Profile saved successfully!')
        setProfileData(result.photographer)
      } else {
        toast.error(result.error || 'Failed to save profile')
      }
    } catch (error) {
      console.error('Save profile error:', error)
      toast.error('An error occurred while saving your profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpecialtyToggle = (specialty: string) => {
    const current = watchedSpecialties || []
    const updated = current.includes(specialty)
      ? current.filter(s => s !== specialty)
      : [...current, specialty]
    setValue('specialties', updated)
  }

  const handleLanguageToggle = (language: string) => {
    const current = watchedLanguages || []
    const updated = current.includes(language)
      ? current.filter(l => l !== language)
      : [...current, language]
    setValue('languages', updated)
  }

  const addEquipment = () => {
    if (newEquipment.trim()) {
      const current = watchedEquipment || []
      setValue('equipment', [...current, newEquipment.trim()])
      setNewEquipment('')
    }
  }

  const removeEquipment = (index: number) => {
    const current = watchedEquipment || []
    setValue('equipment', current.filter((_, i) => i !== index))
  }

  const addPortfolioImage = () => {
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      setPortfolioImages([...portfolioImages, url.trim()])
    }
  }

  const removePortfolioImage = (index: number) => {
    setPortfolioImages(portfolioImages.filter((_, i) => i !== index))
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'PHOTOGRAPHER') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Photographer Profile
                </h1>
                <p className="text-sm text-gray-600">
                  Complete your profile to start receiving bookings
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell clients about your photography style, experience, and what makes you unique..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  {...register('experience', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="5"
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                )}
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('hourlyRate', { valueAsNumber: true })}
                    type="number"
                    min="25"
                    max="1000"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="150"
                  />
                </div>
                {errors.hourlyRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('location')}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="San Francisco, CA"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Photography Specialties</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {PHOTOGRAPHY_SPECIALTIES.map((specialty) => (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => handleSpecialtyToggle(specialty)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    watchedSpecialties?.includes(specialty)
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {specialty.replace('_', ' ')}
                </button>
              ))}
            </div>
            {errors.specialties && (
              <p className="mt-2 text-sm text-red-600">{errors.specialties.message}</p>
            )}
          </div>

          {/* Equipment */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <Briefcase className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Equipment</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Canon EOS R5, Sony 24-70mm f/2.8"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                />
                <Button type="button" onClick={addEquipment}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {watchedEquipment?.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeEquipment(index)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {errors.equipment && (
              <p className="mt-2 text-sm text-red-600">{errors.equipment.message}</p>
            )}
          </div>

          {/* Languages */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {COMMON_LANGUAGES.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleLanguageToggle(language)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    watchedLanguages?.includes(language)
                      ? 'bg-primary-50 border-primary-200 text-primary-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
            {errors.languages && (
              <p className="mt-2 text-sm text-red-600">{errors.languages.message}</p>
            )}
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Camera className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
              </div>
              <Button type="button" onClick={addPortfolioImage} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removePortfolioImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {portfolioImages.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No portfolio images yet. Add some to showcase your work!</p>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
              className="px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
