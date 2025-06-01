import { PrismaClient, PhotoSessionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const samplePhotographers = [
  {
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@example.com",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    bio: "Professional wedding photographer with 8 years of experience. Specializing in candid moments and traditional ceremonies.",
    experience: 8,
    hourlyRate: 2500,
    specialties: [PhotoSessionType.WEDDING, PhotoSessionType.PORTRAIT, PhotoSessionType.EVENT],
    equipment: ["Canon EOS R5", "Sony A7R IV", "Professional Lighting"],
    languages: ["Hindi", "English", "Punjabi"]
  },
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    bio: "Fashion and portrait photographer based in Mumbai. Love capturing the essence of personality through my lens.",
    experience: 5,
    hourlyRate: 3000,
    specialties: [PhotoSessionType.FASHION, PhotoSessionType.PORTRAIT, PhotoSessionType.CORPORATE],
    equipment: ["Nikon D850", "Canon 85mm f/1.4", "Studio Strobes"],
    languages: ["Hindi", "English", "Marathi"]
  },
  {
    firstName: "Arjun",
    lastName: "Patel",
    email: "arjun.patel@example.com",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    bio: "Tech-savvy photographer specializing in corporate events and product photography. Modern approach with creative vision.",
    experience: 6,
    hourlyRate: 2800,
    specialties: [PhotoSessionType.CORPORATE, PhotoSessionType.PRODUCT, PhotoSessionType.EVENT],
    equipment: ["Sony A7 III", "Fujifilm X-T4", "Drone Photography"],
    languages: ["English", "Hindi", "Kannada"]
  },
  {
    firstName: "Sneha",
    lastName: "Reddy",
    email: "sneha.reddy@example.com",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    bio: "Newborn and family photographer with a gentle touch. Creating beautiful memories for families across Hyderabad.",
    experience: 4,
    hourlyRate: 2200,
    specialties: [PhotoSessionType.NEWBORN, PhotoSessionType.FAMILY, PhotoSessionType.PORTRAIT],
    equipment: ["Canon EOS R6", "85mm f/1.8", "Natural Light Setup"],
    languages: ["Telugu", "Hindi", "English"]
  },
  {
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    bio: "Destination wedding photographer capturing royal weddings in the Pink City. Heritage and tradition specialist.",
    experience: 10,
    hourlyRate: 4000,
    specialties: [PhotoSessionType.WEDDING, PhotoSessionType.EVENT, PhotoSessionType.LANDSCAPE],
    equipment: ["Canon EOS 5D Mark IV", "24-70mm f/2.8", "Vintage Lenses"],
    languages: ["Hindi", "English", "Rajasthani"]
  },
  {
    firstName: "Meera",
    lastName: "Nair",
    email: "meera.nair@example.com",
    city: "Kochi",
    state: "Kerala",
    country: "India",
    bio: "Nature and landscape photographer from God's Own Country. Specializing in outdoor shoots and natural beauty.",
    experience: 7,
    hourlyRate: 2600,
    specialties: [PhotoSessionType.LANDSCAPE, PhotoSessionType.PORTRAIT, PhotoSessionType.WEDDING],
    equipment: ["Nikon D780", "Wide Angle Lenses", "Waterproof Gear"],
    languages: ["Malayalam", "English", "Hindi"]
  }
]

async function seedPhotographers() {
  console.log('🌱 Starting photographer seeding...')

  for (const photographerData of samplePhotographers) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: photographerData.email }
      })

      if (existingUser) {
        console.log(`⏭️  User ${photographerData.email} already exists, skipping...`)
        continue
      }

      // Create user
      const hashedPassword = await bcrypt.hash('TestPass123!', 12)

      const user = await prisma.user.create({
        data: {
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          email: photographerData.email,
          password: hashedPassword,
          role: 'PHOTOGRAPHER',
          isVerified: true,
          isActive: true,
        }
      })

      // Create photographer profile
      const photographer = await prisma.photographer.create({
        data: {
          userId: user.id,
          bio: photographerData.bio,
          experience: photographerData.experience,
          hourlyRate: photographerData.hourlyRate,
          location: `${photographerData.city}, ${photographerData.state}, ${photographerData.country}`,
          city: photographerData.city,
          state: photographerData.state,
          country: photographerData.country,
          specialties: photographerData.specialties,
          equipment: photographerData.equipment,
          languages: photographerData.languages,
          portfolio: [
            'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
          ],
          isAvailable: true,
          rating: Math.random() * 2 + 3, // Random rating between 3-5
          totalReviews: Math.floor(Math.random() * 50) + 10, // Random reviews 10-60
          totalBookings: Math.floor(Math.random() * 100) + 20, // Random bookings 20-120
        }
      })

      console.log(`✅ Created photographer: ${photographerData.firstName} ${photographerData.lastName} in ${photographerData.city}, ${photographerData.state}`)

    } catch (error) {
      console.error(`❌ Error creating photographer ${photographerData.email}:`, error)
    }
  }

  console.log('🎉 Photographer seeding completed!')
}

// Run the seeding
seedPhotographers()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
