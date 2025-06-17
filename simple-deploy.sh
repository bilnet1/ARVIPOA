#!/bin/bash

# Simple ARVIPOA Deployment - Runs exactly like Replit
echo "Creating simple deployment package..."

# Create clean deployment directory
rm -rf arvipoa-live
mkdir arvipoa-live

# Copy essential files only
cp -r client arvipoa-live/
cp -r server arvipoa-live/
cp -r shared arvipoa-live/
cp package.json arvipoa-live/
cp drizzle.config.ts arvipoa-live/
cp vite.config.ts arvipoa-live/
cp tailwind.config.ts arvipoa-live/
cp postcss.config.js arvipoa-live/
cp tsconfig.json arvipoa-live/

# Create production environment
cat > arvipoa-live/.env << 'EOF'
NODE_ENV=production
PORT=5000
DATABASE_URL=sqlite:./arvipoa.db
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_PROJECT_ID=arvipoa-438e3
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_GOOGLE_MAPS_API_KEY=your_maps_key_here
OPENAI_API_KEY=your_openai_key_here
EOF

# Create one-command deployment script
cat > arvipoa-live/deploy.sh << 'SCRIPT'
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

SCRIPT

chmod +x arvipoa-live/deploy.sh

# Create archive
tar -czf arvipoa-live.tar.gz arvipoa-live/

echo "Simple deployment package created: arvipoa-live.tar.gz"
echo ""
echo "Deployment steps:"
echo "1. Download arvipoa-live.tar.gz"
echo "2. Upload to your server: vmi2359040.contaboserver.net"
echo "3. SSH in and run:"
echo "   tar -xzf arvipoa-live.tar.gz"
echo "   cd arvipoa-live"
echo "   ./deploy.sh"
echo ""
echo "Your platform will run exactly like it does here!"