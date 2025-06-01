#!/usr/bin/env node

/**
 * ShutterConnect Setup Script
 * 
 * This script helps set up the ShutterConnect project with proper folder structure
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up ShutterConnect...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

// Function to run commands safely
function runCommand(command, description) {
  try {
    console.log(`📦 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

// Function to check if file exists
function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description} exists`);
    return true;
  } else {
    console.log(`⚠️  ${description} not found`);
    return false;
  }
}

console.log('🔍 Checking project structure...\n');

// Check essential files and directories
const checks = [
  { path: 'frontend', desc: 'Frontend directory' },
  { path: 'backend', desc: 'Backend directory' },
  { path: 'frontend/package.json', desc: 'Frontend package.json' },
  { path: 'backend/package.json', desc: 'Backend package.json' },
  { path: '.env.example', desc: 'Environment template' },
  { path: '.gitignore', desc: 'Git ignore file' }
];

let allChecksPass = true;
checks.forEach(check => {
  if (!checkFile(check.path, check.desc)) {
    allChecksPass = false;
  }
});

if (!allChecksPass) {
  console.error('\n❌ Some required files are missing. Please check the project structure.');
  process.exit(1);
}

console.log('\n🎯 Installing dependencies...\n');

// Install root dependencies
runCommand('npm install', 'Installing root dependencies');

// Install frontend dependencies
runCommand('npm install --workspace=frontend', 'Installing frontend dependencies');

// Install backend dependencies
runCommand('npm install --workspace=backend', 'Installing backend dependencies');

console.log('🔧 Setting up environment...\n');

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local not found. Please copy .env.example to .env.local and configure your variables.');
} else {
  console.log('✅ Environment file exists');
  
  // Copy to subdirectories if they don't exist
  if (!fs.existsSync('frontend/.env.local')) {
    fs.copyFileSync('.env.local', 'frontend/.env.local');
    console.log('✅ Copied .env.local to frontend/');
  }
  
  if (!fs.existsSync('backend/.env.local')) {
    fs.copyFileSync('.env.local', 'backend/.env.local');
    console.log('✅ Copied .env.local to backend/');
  }
}

console.log('\n🗄️  Setting up database...\n');

try {
  // Generate Prisma client
  runCommand('npm run db:generate', 'Generating Prisma client');
  
  // Push database schema (optional, might fail if DB not configured)
  console.log('📊 Attempting to push database schema...');
  try {
    execSync('npm run db:push', { stdio: 'inherit' });
    console.log('✅ Database schema pushed successfully\n');
  } catch (error) {
    console.log('⚠️  Database push failed (this is normal if DB is not configured yet)\n');
  }
} catch (error) {
  console.log('⚠️  Database setup skipped (configure DATABASE_URL first)\n');
}

console.log('🎉 Setup completed!\n');

console.log('📋 Next steps:');
console.log('1. Configure your .env.local file with your database and service credentials');
console.log('2. Set up your PostgreSQL database');
console.log('3. Run: npm run db:push (to set up database schema)');
console.log('4. Run: npm run dev (to start the development server)');
console.log('\n📖 For more information, see README.md');

console.log('\n🚀 Happy coding!');
