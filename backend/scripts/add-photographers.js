const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function addPhotographers() {
  console.log('🌱 Adding sample photographers...')

  const photographers = [
    {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.delhi@example.com",
      location: "New Delhi, Delhi",
      bio: "Professional wedding photographer with 8 years of experience in Delhi. Specializing in candid moments and traditional ceremonies.",
      experience: 8,
      hourlyRate: 2500,
      specialties: ["WEDDING", "PORTRAIT", "EVENT"]
    },
    {
      firstName: "Priya",
      lastName: "Sharma", 
      email: "priya.mumbai@example.com",
      location: "Mumbai, Maharashtra",
      bio: "Fashion and portrait photographer based in Mumbai. Love capturing the essence of personality through my lens.",
      experience: 5,
      hourlyRate: 3000,
      specialties: ["FASHION", "PORTRAIT", "CORPORATE"]
    },
    {
      firstName: "Arjun",
      lastName: "Patel",
      email: "arjun.bangalore@example.com", 
      location: "Bangalore, Karnataka",
      bio: "Tech-savvy photographer specializing in corporate events and product photography in Bangalore.",
      experience: 6,
      hourlyRate: 2800,
      specialties: ["CORPORATE", "PRODUCT", "EVENT"]
    },
    {
      firstName: "Sneha",
      lastName: "Reddy",
      email: "sneha.hyderabad@example.com",
      location: "Hyderabad, Telangana", 
      bio: "Newborn and family photographer with a gentle touch. Creating beautiful memories for families.",
      experience: 4,
      hourlyRate: 2200,
      specialties: ["NEWBORN", "FAMILY", "PORTRAIT"]
    },
    {
      firstName: "Vikram",
      lastName: "Singh",
      email: "vikram.jaipur@example.com",
      location: "Jaipur, Rajasthan",
      bio: "Destination wedding photographer capturing royal weddings in the Pink City.",
      experience: 10,
      hourlyRate: 4000,
      specialties: ["WEDDING", "EVENT", "LANDSCAPE"]
    }
  ]

  for (const photographerData of photographers) {
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
          equipment: ["Professional DSLR", "Lighting Equipment", "Tripods"],
          languages: ["Hindi", "English"],
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

      console.log(`✅ Created photographer: ${photographerData.firstName} ${photographerData.lastName} in ${photographerData.location}`)

    } catch (error) {
      console.error(`❌ Error creating photographer ${photographerData.email}:`, error)
    }
  }

  console.log('🎉 Sample photographers added successfully!')
}

// Set environment variable and run
process.env.DATABASE_URL = 'postgresql://postgres:1244@localhost:5432/shutterconnect'

addPhotographers()
  .catch((e) => {
    console.error('❌ Failed to add photographers:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
