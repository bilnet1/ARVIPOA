#!/bin/bash

# ARVIMEDIA Live Deployment Update Script
# Updates live site with new ARVIMEDIA streaming platform

echo "🚀 ARVIMEDIA Live Deployment Update Starting..."

# Update main application files
echo "📁 Updating main application files..."
cp client/src/pages/ARVIMEDIA.tsx arvipoa-live/client/src/pages/ARVIMEDIA.tsx
cp client/src/pages/SimpleHomepage.tsx arvipoa-live/client/src/pages/SimpleHomepage.tsx
cp client/src/pages/ForeignBirdPaymentPane.tsx arvipoa-live/client/src/pages/ForeignBirdPaymentPane.tsx
cp client/src/App.tsx arvipoa-live/client/src/App.tsx

# Update assets
echo "🖼️  Updating assets..."
mkdir -p arvipoa-live/client/public/assets
cp client/public/assets/foreignbird-logo.png arvipoa-live/client/public/assets/foreignbird-logo.png

# Update deployment package
echo "📦 Updating deployment package..."
cp client/src/pages/ARVIMEDIA.tsx arvipoa-deployment-package/client/src/pages/ARVIMEDIA.tsx
cp client/src/pages/SimpleHomepage.tsx arvipoa-deployment-package/client/src/pages/SimpleHomepage.tsx
cp client/src/pages/ForeignBirdPaymentPane.tsx arvipoa-deployment-package/client/src/pages/ForeignBirdPaymentPane.tsx
cp client/src/App.tsx arvipoa-deployment-package/client/src/App.tsx

# Create new live archive
echo "🗜️  Creating updated live archive..."
cd arvipoa-live
tar -czf ../arvipoa-live-updated.tar.gz .
cd ..

# Create new deployment package
echo "📦 Creating updated deployment package..."
cd arvipoa-deployment-package
tar -czf ../arvipoa-deployment-updated.tar.gz .
cd ..

echo "✅ ARVIMEDIA deployment update complete!"
echo "📋 Updated features:"
echo "   - Netflix-style ARVIMEDIA interface"
echo "   - 15+ streaming platform oval icons"
echo "   - Interactive video player with Like/Comment/Share"
echo "   - Scrollable content cards"
echo "   - App Store/Play Store download section"
echo "   - Foreign Bird golden eagle logo integration"
echo "   - FREE FOR ARVIPOA MEMBERS prominence"

echo "🔗 Archives created:"
echo "   - arvipoa-live-updated.tar.gz"
echo "   - arvipoa-deployment-updated.tar.gz"