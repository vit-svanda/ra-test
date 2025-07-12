import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function main() {
  console.log('🔍 Testing database connection...');
  console.log('📡 DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden for security)' : 'Not found');
  
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Attempting to connect to database...');
    
    // Test the connection with a simple query
    const result = await prisma.agent.findFirst();
    
    console.log('✅ Database connection successful!');
    console.log('📊 Query result:', result ? 'Agent found' : 'No agents in database');
    
    if (result) {
      console.log('👤 First agent:', {
        id: result.id,
        name: result.name,
        email: result.email
      });
    }
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('🔍 Error details:', error.message);
    
    if (error.code) {
      console.error('📋 Error code:', error.code);
    }
    
    if (error.meta) {
      console.error('📋 Error metadata:', error.meta);
    }
    
    // Additional debugging information
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check if your Supabase project is active');
    console.log('2. Verify your DATABASE_URL in .env.local');
    console.log('3. Ensure your IP is whitelisted in Supabase');
    console.log('4. Check if your database is accessible from your current network');
    
  } finally {
    // Always disconnect from Prisma
    await prisma.$disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Run the test
main()
  .then(() => {
    console.log('🏁 Database test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  }); 