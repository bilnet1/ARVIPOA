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

