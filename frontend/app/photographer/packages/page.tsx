'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Package,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Save,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

// Validation schema for package
const packageSchema = z.object({
  name: z.string().min(3, 'Package name must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  price: z.number().min(25, 'Minimum price is $25').max(10000, 'Maximum price is $10,000'),
  duration: z.number().min(30, 'Minimum duration is 30 minutes').max(480, 'Maximum duration is 8 hours'),
  deliverables: z.array(z.string()).min(1, 'At least one deliverable is required'),
  isActive: z.boolean().optional().default(true),
})

type PackageInput = z.infer<typeof packageSchema>

interface Package {
  id: string
  name: string
  description: string
  price: number
  duration: number
  deliverables: string[]
  isActive: boolean
  createdAt: string
}

export default function PhotographerPackagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [newDeliverable, setNewDeliverable] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PackageInput>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      deliverables: [],
      isActive: true,
    },
  })

  const watchedDeliverables = watch('deliverables')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?callbackUrl=/photographer/packages')
      return
    }

    if (session.user.role !== 'PHOTOGRAPHER') {
      router.push('/dashboard')
      return
    }

    loadPackages()
  }, [session, status, router])

  const loadPackages = async () => {
    try {
      const response = await fetch('/api/photographer/packages')
      if (response.ok) {
        const data = await response.json()
        setPackages(data.packages || [])
      }
    } catch (error) {
      console.error('Failed to load packages:', error)
      toast.error('Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: PackageInput) => {
    try {
      const url = editingPackage
        ? `/api/photographer/packages/${editingPackage.id}`
        : '/api/photographer/packages'

      const method = editingPackage ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(editingPackage ? 'Package updated successfully!' : 'Package created successfully!')
        setShowForm(false)
        setEditingPackage(null)
        reset()
        loadPackages()
      } else {
        toast.error(result.error || 'Failed to save package')
      }
    } catch (error) {
      console.error('Save package error:', error)
      toast.error('An error occurred while saving the package')
    }
  }

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg)
    setValue('name', pkg.name)
    setValue('description', pkg.description)
    setValue('price', pkg.price)
    setValue('duration', pkg.duration)
    setValue('deliverables', pkg.deliverables)
    setValue('isActive', pkg.isActive)
    setShowForm(true)
  }

  const handleDelete = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return

    try {
      const response = await fetch(`/api/photographer/packages/${packageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Package deleted successfully!')
        loadPackages()
      } else {
        const result = await response.json()
        toast.error(result.error || 'Failed to delete package')
      }
    } catch (error) {
      console.error('Delete package error:', error)
      toast.error('An error occurred while deleting the package')
    }
  }

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      const current = watchedDeliverables || []
      setValue('deliverables', [...current, newDeliverable.trim()])
      setNewDeliverable('')
    }
  }

  const removeDeliverable = (index: number) => {
    const current = watchedDeliverables || []
    setValue('deliverables', current.filter((_, i) => i !== index))
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingPackage(null)
    reset()
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Package Management
                </h1>
                <p className="text-sm text-gray-600">
                  Create and manage your photography packages
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowForm(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Package
              </Button>
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Package Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPackage ? 'Edit Package' : 'Create New Package'}
              </h2>
              <Button onClick={cancelForm} variant="outline" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Package Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Wedding Photography Basic"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('price', { valueAsNumber: true })}
                      type="number"
                      min="25"
                      max="10000"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="500"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('duration', { valueAsNumber: true })}
                      type="number"
                      min="30"
                      max="480"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="120"
                    />
                  </div>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    {...register('isActive')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Package is active and available for booking
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe what's included in this package..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Deliverables */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deliverables
                </label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDeliverable}
                      onChange={(e) => setNewDeliverable(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 50 edited high-resolution photos"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
                    />
                    <Button type="button" onClick={addDeliverable}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {watchedDeliverables?.map((deliverable, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <span className="text-sm text-gray-700">{deliverable}</span>
                        <button
                          type="button"
                          onClick={() => removeDeliverable(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {errors.deliverables && (
                  <p className="mt-1 text-sm text-red-600">{errors.deliverables.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" onClick={cancelForm} variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Packages List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packages yet</h3>
            <p className="text-gray-500 mb-4">
              Create your first package to start receiving bookings.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Package
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {pkg.isActive ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-2xl font-bold text-gray-900">
                      <DollarSign className="h-5 w-5 mr-1" />
                      {pkg.price}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {pkg.duration} min
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {pkg.description}
                  </p>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      What's included:
                    </h4>
                    <ul className="space-y-1">
                      {pkg.deliverables.slice(0, 3).map((deliverable, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                      {pkg.deliverables.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{pkg.deliverables.length - 3} more items
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Created Date */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Created {new Date(pkg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
