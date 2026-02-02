#!/bin/bash

# VPS Setup Script for Manal Healthcare
# Run this script on your VPS server as root or with sudo

set -e

echo "=========================================="
echo "Manal Healthcare - VPS Setup Script"
echo "=========================================="
echo ""

# Update system
echo "📦 Updating system packages..."
apt-get update && apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker installed successfully"
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
if ! command -v docker compose &> /dev/null; then
    apt-get install -y docker-compose-plugin
    echo "✅ Docker Compose installed successfully"
else
    echo "✅ Docker Compose already installed"
fi

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /opt/manal-healthcare
cd /opt/manal-healthcare

# Create uploads directory
mkdir -p public/uploads

# Create .env file template
echo "📝 Creating .env file template..."
cat > .env << 'EOF'
# MongoDB Connection
MONGODB_URI=mongodb://username:password@host:27017/manal_healthcare

# Application URL
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# GitHub Container Registry
GITHUB_USERNAME=your-github-username

# Node Environment
NODE_ENV=production
PORT=3000
EOF

echo "⚠️  IMPORTANT: Edit /opt/manal-healthcare/.env with your actual credentials"

# Install Nginx
echo "🌐 Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
    systemctl enable nginx
    systemctl start nginx
    echo "✅ Nginx installed successfully"
else
    echo "✅ Nginx already installed"
fi

# Create Nginx config
echo "📝 Creating Nginx configuration..."
cat > /etc/nginx/sites-available/manal-healthcare << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 50M;
}
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/manal-healthcare /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Install Certbot for SSL
echo "🔒 Installing Certbot for SSL..."
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
    echo "✅ Certbot installed successfully"
else
    echo "✅ Certbot already installed"
fi

# Install UFW firewall
echo "🔥 Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    echo "✅ Firewall configured"
fi

echo ""
echo "=========================================="
echo "✅ VPS Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Edit /opt/manal-healthcare/.env with your credentials"
echo "2. Update Nginx config with your domain: /etc/nginx/sites-available/manal-healthcare"
echo "3. Copy docker-compose.yml to /opt/manal-healthcare/"
echo "4. Run: certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "5. Add GitHub Actions secrets to your repository"
echo "6. Push code to trigger deployment"
echo ""
echo "GitHub Secrets Required:"
echo "  - VPS_HOST: Your VPS IP address"
echo "  - VPS_USERNAME: Your SSH username (usually root)"
echo "  - VPS_SSH_KEY: Your private SSH key"
echo "  - VPS_PORT: SSH port (default 22)"
echo "  - NEXT_PUBLIC_BASE_URL: Your domain URL"
echo ""
