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
