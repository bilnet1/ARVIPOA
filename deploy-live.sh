#!/bin/bash

# ARVIPOA Live Deployment to arvipoa.org
# This script will replace your Laravel version with the React/TypeScript ARVIPOA

echo "🚀 Deploying ARVIPOA to arvipoa.org..."
echo "This will replace your existing Laravel application"
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 1
fi

# Build production version
echo "Building production version..."
npm run build

# Create deployment package
echo "Creating deployment package..."
rm -rf deploy-package
mkdir deploy-package

# Copy built files
cp -r dist/* deploy-package/
cp -r server deploy-package/
cp -r shared deploy-package/
cp package.json deploy-package/
cp .env.production deploy-package/.env
cp drizzle.config.ts deploy-package/

# Create deployment archive
tar -czf arvipoa-live.tar.gz -C deploy-package .

echo "Uploading to your server..."
echo "Server: vmi2359040.contaboserver.net"

# Upload and deploy
scp arvipoa-live.tar.gz root@vmi2359040.contaboserver.net:/tmp/

ssh root@vmi2359040.contaboserver.net << 'EOF'
echo "Backing up current Laravel site..."
mkdir -p /var/backups/laravel-backup-$(date +%Y%m%d)
cp -r /var/www/html/* /var/backups/laravel-backup-$(date +%Y%m%d)/ 2>/dev/null || true

echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "Extracting ARVIPOA..."
cd /var/www/html
rm -rf *
tar -xzf /tmp/arvipoa-live.tar.gz

echo "Installing dependencies..."
npm install --production

echo "Starting ARVIPOA application..."
# Kill any existing node processes
pkill -f "node.*server" || true

# Start the application
nohup npm start > /var/log/arvipoa.log 2>&1 &

echo "ARVIPOA is now running on port 5000"
echo "Configure your web server to proxy to localhost:5000"

rm /tmp/arvipoa-live.tar.gz
EOF

# Cleanup
rm -rf deploy-package arvipoa-live.tar.gz

echo "✅ Deployment complete!"
echo "Your ARVIPOA platform is now running on your server"
echo "You may need to configure your web server (Apache/Nginx) to proxy to port 5000"
echo ""
echo "To deploy updates in the future, simply run: ./deploy-live.sh"