#!/bin/bash

echo "Deploying ARVIPOA platform..."

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install

# Build the platform
npm run build

# Start the application (just like npm run dev but for production)
sudo tee /etc/systemd/system/arvipoa.service > /dev/null << SERVICE
[Unit]
Description=ARVIPOA Platform
After=network.target

[Service]
Type=simple
WorkingDirectory=$(pwd)
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable arvipoa
sudo systemctl start arvipoa

# Simple web server setup
sudo apt-get install -y nginx

sudo tee /etc/nginx/sites-available/arvipoa.org > /dev/null << NGINX
server {
    listen 80;
    server_name arvipoa.org www.arvipoa.org;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/arvipoa.org /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo "ARVIPOA is now live at http://arvipoa.org"
echo "Platform status: $(sudo systemctl is-active arvipoa)"

