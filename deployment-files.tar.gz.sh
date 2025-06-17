#!/bin/bash

# Create deployment package for manual upload
echo "Creating ARVIPOA deployment package..."

# Create deployment directory
mkdir -p arvipoa-deployment-package

# Copy all necessary files
cp -r client arvipoa-deployment-package/
cp -r server arvipoa-deployment-package/
cp -r shared arvipoa-deployment-package/
cp package.json arvipoa-deployment-package/
cp drizzle.config.ts arvipoa-deployment-package/
cp vite.config.ts arvipoa-deployment-package/
cp tailwind.config.ts arvipoa-deployment-package/
cp postcss.config.js arvipoa-deployment-package/
cp tsconfig.json arvipoa-deployment-package/

# Create production environment file
cat > arvipoa-deployment-package/.env << 'EOF'
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://arvipoa_user:secure_password@localhost:5432/arvipoa_production
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=arvipoa-438e3
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
EOF

# Create server deployment script
cat > arvipoa-deployment-package/deploy-on-server.sh << 'SCRIPT'
#!/bin/bash

echo "Deploying ARVIPOA on your server..."

# Backup existing Laravel application
mkdir -p /var/backups/laravel-backup-$(date +%Y%m%d-%H%M%S)
cp -r /var/www/html/* /var/backups/laravel-backup-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Move to web directory
cd /var/www
rm -rf arvipoa
mkdir arvipoa
cp -r /tmp/arvipoa-deployment/* /var/www/arvipoa/
cd /var/www/arvipoa

# Install dependencies
npm install

# Build production version
npm run build

# Setup PostgreSQL
apt-get update && apt-get install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql

# Create database and user
sudo -u postgres createdb arvipoa_production 2>/dev/null || true
sudo -u postgres createuser arvipoa_user 2>/dev/null || true
sudo -u postgres psql -c "ALTER USER arvipoa_user WITH ENCRYPTED PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE arvipoa_production TO arvipoa_user;"

# Run database migrations
npm run db:push

# Create systemd service
cat > /etc/systemd/system/arvipoa.service << 'SERVICE'
[Unit]
Description=ARVIPOA Application
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/arvipoa
Environment=NODE_ENV=production
Environment=PORT=5000
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE

# Set proper permissions
chown -R www-data:www-data /var/www/arvipoa

# Enable and start ARVIPOA service
systemctl daemon-reload
systemctl enable arvipoa
systemctl start arvipoa

# Install Nginx if not present
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
fi

# Configure Nginx for arvipoa.org
cat > /etc/nginx/sites-available/arvipoa.org << 'NGINX'
server {
    listen 80;
    server_name arvipoa.org www.arvipoa.org;
    
    # Serve static files
    location / {
        root /var/www/arvipoa/dist;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=3600";
    }
    
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
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
NGINX

# Enable the site
ln -sf /etc/nginx/sites-available/arvipoa.org /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t && systemctl restart nginx

echo "ARVIPOA deployment completed!"
echo "Application status: $(systemctl is-active arvipoa)"
echo "Your site is now live at: http://arvipoa.org"
echo ""
echo "Services running:"
echo "- ARVIPOA App: $(systemctl is-active arvipoa)"
echo "- PostgreSQL: $(systemctl is-active postgresql)"
echo "- Nginx: $(systemctl is-active nginx)"

SCRIPT

chmod +x arvipoa-deployment-package/deploy-on-server.sh

# Create deployment instructions
cat > arvipoa-deployment-package/DEPLOYMENT-INSTRUCTIONS.md << 'INSTRUCTIONS'
# ARVIPOA Deployment Instructions

## Quick Deployment Steps

1. Upload this entire folder to your server at: `/tmp/arvipoa-deployment/`

2. SSH into your server:
   ```bash
   ssh root@vmi2359040.contaboserver.net
   ```

3. Run the deployment script:
   ```bash
   cd /tmp/arvipoa-deployment
   chmod +x deploy-on-server.sh
   ./deploy-on-server.sh
   ```

4. Your ARVIPOA platform will be live at: http://arvipoa.org

## What Gets Deployed

- Complete ARVIPOA property management platform
- Foreign Bird Payment System
- RBFS Religious Platform
- Smart Pillar monitoring system
- All integrated services and APIs

## Manual Steps (if needed)

If automatic deployment fails, run these commands manually:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PostgreSQL
apt-get install -y postgresql postgresql-contrib nginx

# Setup database
sudo -u postgres createdb arvipoa_production
sudo -u postgres createuser arvipoa_user
sudo -u postgres psql -c "ALTER USER arvipoa_user WITH PASSWORD 'secure_password';"

# Deploy application
cd /var/www/arvipoa
npm install
npm run build
npm run db:push

# Start services
systemctl start arvipoa postgresql nginx
```

## Troubleshooting

- Check application logs: `journalctl -u arvipoa -f`
- Check Nginx logs: `tail -f /var/log/nginx/error.log`
- Restart services: `systemctl restart arvipoa nginx`

## Future Updates

To update the application, simply replace the files and restart:
```bash
systemctl restart arvipoa
```
INSTRUCTIONS

# Create the deployment archive
tar -czf arvipoa-deployment-package.tar.gz arvipoa-deployment-package/

echo "Deployment package created: arvipoa-deployment-package.tar.gz"
echo ""
echo "Next steps:"
echo "1. Download the file: arvipoa-deployment-package.tar.gz"
echo "2. Upload it to your server at: /tmp/"
echo "3. Extract and run: tar -xzf arvipoa-deployment-package.tar.gz && cd arvipoa-deployment-package && ./deploy-on-server.sh"
echo ""
echo "Your ARVIPOA platform will replace the Laravel version and be live at arvipoa.org"