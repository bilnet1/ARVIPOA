#!/bin/bash

# ARVIPOA Production Deployment Script
# Deploys React/TypeScript ARVIPOA to replace Laravel version

set -e

# Configuration
SERVER_HOST="vmi2359040.contaboserver.net"
SERVER_USER="root"
DEPLOY_PATH="/var/www/arvipoa.org"
BACKUP_PATH="/var/backups/arvipoa-laravel-backup"
APP_NAME="arvipoa-app"

echo "🚀 Starting ARVIPOA deployment to arvipoa.org..."

# Step 1: Build production version
echo "📦 Building production version..."
npm run build

# Step 2: Create deployment package
echo "📋 Creating deployment package..."
mkdir -p deploy-temp
cp -r dist/* deploy-temp/
cp -r server deploy-temp/
cp -r shared deploy-temp/
cp package.json package-lock.json deploy-temp/
cp drizzle.config.ts tsconfig.json deploy-temp/

# Step 3: Create tar archive
echo "🗜️ Creating deployment archive..."
tar -czf arvipoa-production.tar.gz -C deploy-temp .

# Step 4: Deploy to server
echo "🌐 Deploying to server..."
scp arvipoa-production.tar.gz ${SERVER_USER}@${SERVER_HOST}:/tmp/

# Step 5: Execute server deployment commands
ssh ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'
set -e

echo "🔄 Backing up existing Laravel application..."
if [ -d "/var/www/arvipoa.org" ]; then
    sudo mkdir -p /var/backups/arvipoa-laravel-backup
    sudo cp -r /var/www/arvipoa.org/* /var/backups/arvipoa-laravel-backup/ 2>/dev/null || true
fi

echo "🧹 Preparing deployment directory..."
sudo mkdir -p /var/www/arvipoa.org
sudo rm -rf /var/www/arvipoa.org/*

echo "📁 Extracting new application..."
cd /var/www/arvipoa.org
sudo tar -xzf /tmp/arvipoa-production.tar.gz
sudo chown -R www-data:www-data /var/www/arvipoa.org

echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "🔧 Installing dependencies..."
sudo -u www-data npm ci --production

echo "🗄️ Setting up database..."
if [ ! -f ".env" ]; then
    sudo -u www-data cp .env.example .env
fi

# Configure database connection
sudo -u www-data npm run db:push

echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/arvipoa.org > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name arvipoa.org www.arvipoa.org;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name arvipoa.org www.arvipoa.org;

    root /var/www/arvipoa.org/dist;
    index index.html;

    # SSL configuration (replace with your certificates)
    ssl_certificate /etc/ssl/certs/arvipoa.org.crt;
    ssl_certificate_key /etc/ssl/private/arvipoa.org.key;

    # API routes
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/arvipoa.org /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

echo "🎯 Creating systemd service..."
sudo tee /etc/systemd/system/arvipoa-app.service > /dev/null << 'EOF'
[Unit]
Description=ARVIPOA Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/arvipoa.org
Environment=NODE_ENV=production
Environment=PORT=5000
ExecStart=/usr/bin/node server/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo "🔄 Starting ARVIPOA application..."
sudo systemctl daemon-reload
sudo systemctl enable arvipoa-app
sudo systemctl start arvipoa-app

echo "🧹 Cleaning up..."
rm -f /tmp/arvipoa-production.tar.gz

echo "✅ ARVIPOA deployment completed successfully!"
echo "🌐 Site is now live at: https://arvipoa.org"

ENDSSH

# Cleanup local files
rm -rf deploy-temp arvipoa-production.tar.gz

echo "🎉 Deployment completed! ARVIPOA is now live at https://arvipoa.org"
echo "🔄 Future deployments will automatically update when you run this script"