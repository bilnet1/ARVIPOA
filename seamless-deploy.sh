#!/bin/bash

# Seamless ARVIPOA Deployment - Just like Replit experience
# No complex configurations, runs exactly as developed

echo "Creating seamless deployment package..."

# Create deployment directory
mkdir -p arvipoa-seamless

# Copy complete working environment
cp -r . arvipoa-seamless/
cd arvipoa-seamless

# Remove development files
rm -rf .git node_modules arvipoa-seamless 
rm -f *.tar.gz deploy*.sh quick-deploy.sh

# Create production package.json with exact working dependencies
cat > package.json << 'EOF'
{
  "name": "arvipoa-platform",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@googlemaps/js-api-loader": "^1.16.8",
    "@hookform/resolvers": "^3.10.0",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.4",
    "@radix-ui/react-slot": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.3",
    "@sendgrid/mail": "^8.1.4",
    "@stripe/react-stripe-js": "^2.9.0",
    "@stripe/stripe-js": "^4.9.0",
    "@tailwindcss/typography": "^0.5.15",
    "@tanstack/react-query": "^5.62.7",
    "@types/express": "^5.0.0",
    "@types/express-session": "^1.18.0",
    "@types/node": "^22.10.1",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "drizzle-kit": "^0.30.0",
    "drizzle-orm": "^0.37.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "firebase": "^11.1.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "memorystore": "^1.6.7",
    "openai": "^4.76.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-router-dom": "^6.28.0",
    "tailwind-merge": "^2.5.4",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vite": "^5.4.14",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "esbuild": "^0.24.2"
  }
}
EOF

# Create simple environment file (user will update with their keys)
cat > .env << 'EOF'
# ARVIPOA Production Environment
NODE_ENV=production
PORT=5000

# Database (will be created automatically)
DATABASE_URL=postgresql://arvipoa:arvipoa_secure@localhost:5432/arvipoa

# Firebase (add your keys)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=arvipoa-438e3
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google Maps (add your key)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# OpenAI (add your key)
OPENAI_API_KEY=your_openai_api_key
EOF

# Create one-command deployment script
cat > deploy.sh << 'DEPLOY'
#!/bin/bash

# One-command ARVIPOA deployment
echo "Starting ARVIPOA deployment..."

# Install Node.js 20 (latest LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Setup PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << PSQL
CREATE DATABASE arvipoa;
CREATE USER arvipoa WITH ENCRYPTED PASSWORD 'arvipoa_secure';
GRANT ALL PRIVILEGES ON DATABASE arvipoa TO arvipoa;
ALTER USER arvipoa CREATEDB;
\q
PSQL

# Install dependencies (exactly like in Replit)
npm install

# Build the application
npm run build

# Setup database schema
npm run db:push

# Create systemd service to run like Replit
sudo tee /etc/systemd/system/arvipoa.service > /dev/null << SERVICE
[Unit]
Description=ARVIPOA Platform
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=$(pwd)
Environment=NODE_ENV=production
Environment=PORT=5000
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE

# Set permissions
sudo chown -R www-data:www-data $(pwd)

# Start ARVIPOA service
sudo systemctl daemon-reload
sudo systemctl enable arvipoa
sudo systemctl start arvipoa

# Install Nginx for web server
sudo apt-get install -y nginx

# Simple Nginx config - just like Replit's proxy
sudo tee /etc/nginx/sites-available/arvipoa.org > /dev/null << NGINX
server {
    listen 80;
    server_name arvipoa.org www.arvipoa.org;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

# Enable site
sudo ln -sf /etc/nginx/sites-available/arvipoa.org /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo ""
echo "ARVIPOA deployed successfully!"
echo "Status: $(sudo systemctl is-active arvipoa)"
echo "Visit: http://arvipoa.org"
echo ""
echo "To update API keys, edit the .env file and restart:"
echo "sudo systemctl restart arvipoa"

DEPLOY

chmod +x deploy.sh

# Create update script for future changes
cat > update.sh << 'UPDATE'
#!/bin/bash

echo "Updating ARVIPOA..."

# Stop service
sudo systemctl stop arvipoa

# Build latest changes
npm run build

# Update database if needed
npm run db:push

# Start service
sudo systemctl start arvipoa

echo "Update complete! Status: $(sudo systemctl is-active arvipoa)"
UPDATE

chmod +x update.sh

# Create simple README
cat > README.md << 'README'
# ARVIPOA Platform - Seamless Deployment

This package runs exactly like your Replit development environment.

## One-Command Deployment

1. Upload this folder to your server
2. Run: `./deploy.sh`
3. Your site is live at arvipoa.org

## What you get:
- Complete ARVIPOA platform
- Foreign Bird Payment System
- RBFS Religious Platform  
- Smart Pillar monitoring
- All features working exactly like in development

## Updates:
Run `./update.sh` anytime you want to deploy changes.

## Configuration:
Edit `.env` file to add your API keys (Firebase, Google Maps, OpenAI).

That's it! No complex setup required.
README

cd ..

# Create deployment package
tar -czf arvipoa-seamless-deploy.tar.gz arvipoa-seamless/

echo ""
echo "Seamless deployment package created: arvipoa-seamless-deploy.tar.gz"
echo ""
echo "Deploy to your server with just:"
echo "1. Upload arvipoa-seamless-deploy.tar.gz to your server"
echo "2. Extract: tar -xzf arvipoa-seamless-deploy.tar.gz"
echo "3. Deploy: cd arvipoa-seamless && ./deploy.sh"
echo ""
echo "Your platform will run exactly like it does here in Replit!"