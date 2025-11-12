#!/bin/bash

# Prime Video Clone VPS Deployment Script
echo "🚀 Deploying Prime Video Clone to VPS..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install -y mongodb

# Install PM2
sudo npm install -g pm2

# Create app directory
sudo mkdir -p /var/www/prime-video
sudo chown -R $USER:$USER /var/www/prime-video

# Copy your files to /var/www/prime-video/
# Then run:
cd /var/www/prime-video/backend
npm install

# Start with PM2
pm2 start server.js --name "prime-video-api"
pm2 startup
pm2 save

echo "✅ Prime Video Clone deployed to VPS!"
echo "🌐 Access your API at: http://your-vps-ip:5000"
