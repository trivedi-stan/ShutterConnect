const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const router = express.Router();

const prisma = new PrismaClient();

// GET /api/photographers - Get all photographers with filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      location,
      state,
      city,
      specialty,
      minPrice,
      maxPrice,
      minRating
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {
      isAvailable: true,
      user: {
        isActive: true,
        isVerified: true,
        role: 'PHOTOGRAPHER'
      }
    };

    // Search filter
    if (search) {
      where.OR = [
        {
          user: {
            firstName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            lastName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          bio: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          location: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Location filters
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }

    if (state) {
      where.location = {
        contains: state,
        mode: 'insensitive'
      };
    }

    // Specialty filter
    if (specialty) {
      where.specialties = {
        has: specialty
      };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.hourlyRate = {};
      if (minPrice) where.hourlyRate.gte = parseFloat(minPrice);
      if (maxPrice) where.hourlyRate.lte = parseFloat(maxPrice);
    }

    // Rating filter
    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating)
      };
    }

    const [photographers, total] = await Promise.all([
      prisma.photographer.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              email: true
            }
          },
          packages: {
            where: {
              isActive: true
            },
            orderBy: {
              price: 'asc'
            },
            take: 3
          },
          _count: {
            select: {
              bookings: true
            }
          }
        },
        orderBy: [
          { rating: 'desc' },
          { totalReviews: 'desc' },
          { totalBookings: 'desc' }
        ],
        skip,
        take: parseInt(limit)
      }),
      prisma.photographer.count({ where })
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      photographers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching photographers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/photographers/seed - Create sample photographers (admin only)
router.post('/seed', async (req, res) => {
  try {
    // Check if photographers already exist
    const existingCount = await prisma.photographer.count();
    if (existingCount > 0) {
      return res.status(400).json({ 
        error: 'Sample photographers already exist. Use DELETE /api/photographers/seed to reset first.' 
      });
    }

    const samplePhotographers = [
      {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.photographer@shutterconnect.com',
        bio: 'Professional wedding photographer with 8+ years of experience. Specializing in candid moments and traditional ceremonies.',
        experience: 8,
        hourlyRate: 150,
        location: 'Delhi, India',
        specialties: ['WEDDING', 'PORTRAIT', 'EVENT'],
        equipment: ['Canon EOS R5', 'Sony A7R IV', 'Professional Lighting'],
        portfolio: [
          'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400'
        ]
      },
      {
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.photographer@shutterconnect.com',
        bio: 'Creative portrait and fashion photographer. Love capturing the essence of personality through my lens.',
        experience: 5,
        hourlyRate: 120,
        location: 'Mumbai, India',
        specialties: ['PORTRAIT', 'FASHION', 'HEADSHOTS'],
        equipment: ['Nikon D850', 'Studio Lighting', 'Prime Lenses'],
        portfolio: [
          'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        ]
      },
      {
        firstName: 'Arjun',
        lastName: 'Patel',
        email: 'arjun.photographer@shutterconnect.com',
        bio: 'Corporate and event photographer specializing in business photography and conferences.',
        experience: 6,
        hourlyRate: 100,
        location: 'Bangalore, India',
        specialties: ['CORPORATE', 'EVENT', 'PRODUCT'],
        equipment: ['Canon EOS 5D Mark IV', 'Professional Flash', 'Telephoto Lenses'],
        portfolio: [
          'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
          'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
          'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400'
        ]
      },
      {
        firstName: 'Sneha',
        lastName: 'Reddy',
        email: 'sneha.photographer@shutterconnect.com',
        bio: 'Newborn and family photographer with a gentle approach to capturing precious moments.',
        experience: 4,
        hourlyRate: 80,
        location: 'Chennai, India',
        specialties: ['NEWBORN', 'FAMILY', 'PORTRAIT'],
        equipment: ['Canon EOS R6', 'Natural Light Setup', 'Macro Lenses'],
        portfolio: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
          'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
          'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400'
        ]
      },
      {
        firstName: 'Vikram',
        lastName: 'Singh',
        email: 'vikram.photographer@shutterconnect.com',
        bio: 'Adventure and landscape photographer. Capturing the beauty of nature and outdoor adventures.',
        experience: 7,
        hourlyRate: 90,
        location: 'Jaipur, India',
        specialties: ['LANDSCAPE', 'SPORTS', 'REAL_ESTATE'],
        equipment: ['Sony A7R V', 'Drone', 'Wide Angle Lenses'],
        portfolio: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
        ]
      }
    ];

    const createdPhotographers = [];

    for (const photographerData of samplePhotographers) {
      // Create user first
      const hashedPassword = await bcrypt.hash('password123', 12);
      
      const user = await prisma.user.create({
        data: {
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          email: photographerData.email,
          password: hashedPassword,
          role: 'PHOTOGRAPHER',
          isActive: true,
          isVerified: true
        }
      });

      // Create photographer profile
      const photographer = await prisma.photographer.create({
        data: {
          userId: user.id,
          bio: photographerData.bio,
          experience: photographerData.experience,
          hourlyRate: photographerData.hourlyRate,
          location: photographerData.location,
          specialties: photographerData.specialties,
          equipment: photographerData.equipment,
          portfolio: photographerData.portfolio,
          isAvailable: true,
          rating: Math.random() * 2 + 3, // Random rating between 3-5
          totalReviews: Math.floor(Math.random() * 50) + 10, // Random reviews 10-60
          totalBookings: Math.floor(Math.random() * 100) + 20 // Random bookings 20-120
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      // Create sample packages for each photographer
      const packageTemplates = [
        {
          name: 'Basic Package',
          description: 'Perfect for small events and sessions',
          price: photographerData.hourlyRate * 2,
          duration: 120,
          deliverables: ['20 edited photos', 'Online gallery', 'Basic retouching']
        },
        {
          name: 'Premium Package',
          description: 'Comprehensive coverage for important events',
          price: photographerData.hourlyRate * 4,
          duration: 240,
          deliverables: ['50 edited photos', 'Online gallery', 'Professional retouching', 'Print release']
        },
        {
          name: 'Deluxe Package',
          description: 'Full-day coverage with all the extras',
          price: photographerData.hourlyRate * 6,
          duration: 480,
          deliverables: ['100+ edited photos', 'Online gallery', 'Professional retouching', 'Print release', 'USB drive', 'Same-day preview']
        }
      ];

      for (const packageData of packageTemplates) {
        await prisma.package.create({
          data: {
            photographerId: photographer.id,
            name: packageData.name,
            description: packageData.description,
            price: packageData.price,
            duration: packageData.duration,
            deliverables: packageData.deliverables,
            isActive: true
          }
        });
      }

      createdPhotographers.push(photographer);
    }

    res.json({
      message: 'Sample photographers created successfully',
      count: createdPhotographers.length,
      photographers: createdPhotographers
    });
  } catch (error) {
    console.error('Error creating sample photographers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/photographers/seed - Remove all sample photographers
router.delete('/seed', async (req, res) => {
  try {
    // Delete in correct order due to foreign key constraints
    await prisma.package.deleteMany({
      where: {
        photographer: {
          user: {
            email: {
              endsWith: '@shutterconnect.com'
            }
          }
        }
      }
    });

    await prisma.photographer.deleteMany({
      where: {
        user: {
          email: {
            endsWith: '@shutterconnect.com'
          }
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        email: {
          endsWith: '@shutterconnect.com'
        }
      }
    });

    res.json({ message: 'Sample photographers removed successfully' });
  } catch (error) {
    console.error('Error removing sample photographers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
