const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const samplePhotographers = [
  {
    firstName: "Rajesh",
    lastName: "Kumar", 
    email: "rajesh.kumar@example.com",
    location: "New Delhi, Delhi, India",
    bio: "Professional wedding photographer with 8 years of experience.",
    experience: 8,
    hourlyRate: 2500,
    specialties: ["WEDDING", "PORTRAIT", "EVENT"]
  },
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com", 
    location: "Mumbai, Maharashtra, India",
    bio: "Fashion and portrait photographer based in Mumbai.",
    experience: 5,
    hourlyRate: 3000,
    specialties: ["FASHION", "PORTRAIT", "CORPORATE"]
  },
  {
    firstName: "Arjun",
    lastName: "Patel",
    email: "arjun.patel@example.com",
    location: "Bangalore, Karnataka, India", 
    bio: "Tech-savvy photographer specializing in corporate events.",
    experience: 6,
    hourlyRate: 2800,
    specialties: ["CORPORATE", "PRODUCT", "EVENT"]
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
          location: photographerData.location,
          specialties: photographerData.specialties,
          equipment: ["Professional Camera", "Lighting Equipment"],
          languages: ["Hindi", "English"],
          portfolio: [
            'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
          ],
          isAvailable: true,
          rating: Math.random() * 2 + 3,
          totalReviews: Math.floor(Math.random() * 50) + 10,
          totalBookings: Math.floor(Math.random() * 100) + 20,
        }
      })

      console.log(`✅ Created photographer: ${photographerData.firstName} ${photographerData.lastName} in ${photographerData.location}`)

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
