#!/bin/bash

# Quick ARVIPOA Deployment to arvipoa.org
# Simplified deployment without heavy build process

echo "Deploying ARVIPOA to arvipoa.org..."

# Create deployment directory
mkdir -p quick-deploy

# Copy source files directly
cp -r client quick-deploy/
cp -r server quick-deploy/
cp -r shared quick-deploy/
cp package.json quick-deploy/
cp drizzle.config.ts quick-deploy/
cp vite.config.ts quick-deploy/
cp tailwind.config.ts quick-deploy/
cp postcss.config.js quick-deploy/
cp tsconfig.json quick-deploy/

# Create production environment
cat > quick-deploy/.env << 'EOF'
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://arvipoa_user:secure_password@localhost:5432/arvipoa_production
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=arvipoa-438e3
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
EOF

# Create deployment archive
tar -czf arvipoa-quick.tar.gz -C quick-deploy .

# Upload to server
scp arvipoa-quick.tar.gz root@vmi2359040.contaboserver.net:/tmp/

# Deploy on server
ssh root@vmi2359040.contaboserver.net << 'DEPLOY'
echo "Starting ARVIPOA deployment..."

# Backup Laravel
mkdir -p /var/backups/laravel-$(date +%Y%m%d)
cp -r /var/www/html/* /var/backups/laravel-$(date +%Y%m%d)/ 2>/dev/null || true

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Setup ARVIPOA
mkdir -p /var/www/arvipoa
cd /var/www/arvipoa
tar -xzf /tmp/arvipoa-quick.tar.gz

# Install dependencies and build
npm install
npm run build

# Setup PostgreSQL
apt-get update && apt-get install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql

# Create database
sudo -u postgres createdb arvipoa_production 2>/dev/null || true
sudo -u postgres createuser arvipoa_user 2>/dev/null || true
sudo -u postgres psql -c "ALTER USER arvipoa_user WITH ENCRYPTED PASSWORD 'secure_password';" 2>/dev/null || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE arvipoa_production TO arvipoa_user;" 2>/dev/null || true

# Run migrations
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

# Set permissions and start service
chown -R www-data:www-data /var/www/arvipoa
systemctl daemon-reload
systemctl enable arvipoa
systemctl start arvipoa

# Install and configure Nginx
apt-get install -y nginx

cat > /etc/nginx/sites-available/arvipoa.org << 'NGINX'
server {
    listen 80;
    server_name arvipoa.org www.arvipoa.org;
    
    location / {
        root /var/www/arvipoa/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

# Enable site
ln -sf /etc/nginx/sites-available/arvipoa.org /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx

echo "ARVIPOA deployed successfully!"
echo "Status: $(systemctl is-active arvipoa)"
echo "Site: http://arvipoa.org"

DEPLOY

# Cleanup
rm -rf quick-deploy arvipoa-quick.tar.gz

echo "Deployment completed! ARVIPOA is now live at http://arvipoa.org"