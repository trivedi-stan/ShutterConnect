const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Checking database...')
    
    // Check users
    const users = await prisma.user.findMany()
    console.log(`📊 Total users: ${users.length}`)
    
    // Check photographers
    const photographers = await prisma.photographer.findMany({
      include: {
        user: true
      }
    })
    console.log(`📸 Total photographers: ${photographers.length}`)
    
    if (photographers.length > 0) {
      console.log('\n📋 Photographers in database:')
      photographers.forEach((p, index) => {
        console.log(`${index + 1}. ${p.user.firstName} ${p.user.lastName}`)
        console.log(`   📍 Location: ${p.location}`)
        console.log(`   💰 Rate: ₹${p.hourlyRate}/hr`)
        console.log(`   ⭐ Rating: ${p.rating?.toFixed(1) || 'N/A'}`)
        console.log(`   🎯 Specialties: ${p.specialties.join(', ')}`)
        console.log('')
      })
    } else {
      console.log('❌ No photographers found in database!')
    }
    
  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Set environment variable
process.env.DATABASE_URL = 'postgresql://postgres:1244@localhost:5432/shutterconnect'

checkDatabase()
