# Next.js Project Deployment SOP (Standard Operating Procedure)

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Project Setup](#local-project-setup)
3. [Docker Configuration](#docker-configuration)
4. [Build and Test Locally](#build-and-test-locally)
5. [Push to Docker Hub](#push-to-docker-hub)
6. [VPS Server Setup](#vps-server-setup)
7. [Deploy on VPS](#deploy-on-vps)
8. [GitHub Actions CI/CD Setup](#github-actions-cicd-setup)
9. [SSL Configuration](#ssl-configuration)
10. [Post-Deployment](#post-deployment)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- [x] Node.js 20+ installed
- [x] Docker Desktop installed and running
- [x] Git installed
- [x] MongoDB Atlas account (free tier)
- [x] Docker Hub account
- [x] VPS server with Ubuntu/Debian
- [x] Domain name with DNS configured

### Required Accounts
- GitHub/GitLab account
- Docker Hub account
- MongoDB Atlas account
- VPS hosting (DigitalOcean, Hetzner, etc.)

---

## Local Project Setup

### 1. Clone/Create Project
```bash
# Clone existing project
git clone <your-repo-url>
cd <project-name>

# Or create new Next.js project
npx create-next-app@latest my-app --typescript
cd my-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env` file:
```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=Cluster0
NEXT_PUBLIC_BASE_URL=http://localhost:3000
JWT_SECRET=your-secret-key-change-in-production
```

### 4. Update Next.js Config
In `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // Important for Docker
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

### 5. Test Locally
```bash
npm run dev
# Open http://localhost:3000
```

---

## Docker Configuration

### 1. Create Dockerfile
Create `Dockerfile` in project root:
```dockerfile
# Use Node.js base image
FROM node:20-alpine

# Accept build args
ARG MONGODB_URI

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (npm ci is faster with lockfile)
RUN npm ci --only=production=false

# Copy all files
COPY . .

# Set build-time env var for Next.js build
ENV MONGODB_URI=${MONGODB_URI}

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["npm", "start"]
```

### 2. Create .dockerignore
Create `.dockerignore`:
```
# Dependencies
node_modules
npm-debug.log
yarn.lock
pnpm-lock.yaml

# Build output
.next/
out/
build/
dist/

# Environment files
.env
.env*.local
.env.production

# Git
.git
.gitignore
.gitattributes

# Testing
coverage/
.nyc_output

# Misc
.DS_Store
*.pem
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Documentation
README.md
CHANGELOG.md
LICENSE
```

### 3. Create docker-compose.yml
```yaml
services:
  web:
    image: yourusername/project-name:latest
    container_name: project-name
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - MONGODB_URI=${MONGODB_URI}
      - NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### 4. Update .gitignore
Add to `.gitignore`:
```
node_modules
.next
.env
.env.local
*.log
```

---

## Build and Test Locally

### 1. Build Docker Image
```bash
docker build -t project-name:latest .
```

### 2. Run Container Locally
```bash
# Using docker-compose
docker compose up -d

# Or using docker run
docker run -p 3000:3000 --env-file .env project-name:latest
```

### 3. Test Container
```bash
# Check container status
docker compose ps

# View logs
docker compose logs -f

# Test endpoints
curl http://localhost:3000
curl http://localhost:3000/api/health

# Stop container
docker compose down
```

---

## Push to Docker Hub

### 1. Login to Docker Hub
```bash
docker login
# Enter username and password
```

### 2. Tag Image
```bash
docker tag project-name:latest yourusername/project-name:latest
```

### 3. Push to Docker Hub
```bash
docker push yourusername/project-name:latest
```

### 4. Verify on Docker Hub
Go to https://hub.docker.com and check your repository.

---

## VPS Server Setup

### 1. Connect to VPS
```bash
ssh root@your-vps-ip
```

### 2. Update System
```bash
apt update && apt upgrade -y
```

### 3. Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker
systemctl start docker
systemctl enable docker

# Verify installation
docker --version
docker compose version
```

### 4. Install Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### 5. Install Certbot (for SSL)
```bash
apt install -y certbot python3-certbot-nginx
```

### 6. Configure Firewall
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

---

## Deploy on VPS

### 1. Create Project Directory
```bash
mkdir -p /var/www/htdocs/project-name
cd /var/www/htdocs/project-name
```

### 2. Clone Repository
```bash
git clone https://github.com/yourusername/project-name.git .
```

### 3. Create .env File
```bash
nano .env
```

Add production environment variables:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=Cluster0
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
JWT_SECRET=your-production-secret-key
```

### 4. Pull Docker Image
```bash
docker compose pull
```

### 5. Start Container
```bash
docker compose up -d
```

### 6. Verify Container
```bash
docker compose ps
docker compose logs -f
curl http://localhost:3000
```

---

## GitHub Actions CI/CD Setup

### Why Automate?
Instead of manual deployment steps, GitHub Actions automatically:
- ✅ Builds Docker image on every push
- ✅ Pushes to Docker Hub
- ✅ Deploys to VPS
- ✅ Verifies deployment
- ✅ Sends notifications

### Prerequisites
- GitHub repository
- Docker Hub account with access token
- VPS with SSH key authentication
- GitHub Secrets configured

### Step 1: Generate SSH Key for CI/CD
```bash
# On local machine
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions -N ""

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_actions.pub root@your-vps-ip
```

### Step 2: Get Private Key
```bash
cat ~/.ssh/github_actions
# Copy entire output (including BEGIN/END lines)
```

### Step 3: Configure GitHub Secrets
Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions

Add these secrets:

| Secret Name | Value |
|------------|-------|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub access token (not password) |
| `VPS_HOST` | Your VPS IP address |
| `VPS_USER` | `root` or your VPS username |
| `VPS_SSH_KEY` | Private SSH key content |
| `MONGODB_URI` | MongoDB Atlas connection string |

### Step 4: Workflow File
The `.github/workflows/deploy.yml` file is already configured with:
- **Test Job**: Builds and tests Next.js project
- **Build & Push Job**: Creates Docker image and pushes to Docker Hub
- **Deploy Job**: SSH to VPS and deploys container
- **Verify Job**: Checks if deployment is successful

### Step 5: Trigger Deployment
Simply push to main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Watch deployment at: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

### Step 6: Monitor Workflow
1. Go to **Actions** tab
2. Click the latest workflow run
3. See real-time logs

### Workflow Steps
```
Push to main
    ↓
Test (npm run build)
    ↓
Build Docker image
    ↓
Push to Docker Hub
    ↓
SSH to VPS
    ↓
Pull latest code
    ↓
Pull Docker image
    ↓
Stop old container
    ↓
Start new container
    ↓
Verify deployment
    ↓
✅ Done!
```

### Commands for CI/CD
```bash
# Manually trigger workflow
gh workflow run deploy.yml --ref main

# View workflow status
gh workflow view deploy.yml

# View recent runs
gh run list --workflow=deploy.yml

# Watch live logs
gh run watch <run-id>
```

### Troubleshooting CI/CD

**SSH Connection Failed:**
```
error: Permission denied (publickey)
```
- Verify VPS_SSH_KEY is correct
- Test manually: `ssh -i ~/.ssh/github_actions root@VPS_IP`

**Docker Push Failed:**
```
error: unauthorized: authentication required
```
- Check DOCKER_PASSWORD is a token, not password
- Generate new token from Docker Hub

**Deployment Failed:**
```
error: Container exited with code 1
```
- Check environment variables match
- View logs: `docker compose logs`
- Test locally first: `npm run build`

**Secrets Not Found:**
- Verify secret names exactly match workflow
- Check repository settings → Secrets

---

## SSL Configuration

### 1. Configure Nginx
Create Nginx config:
```bash
nano /etc/nginx/sites-available/yourdomain.com
```

Add configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Enable Site
```bash
ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 3. Get SSL Certificate
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com \
  --non-interactive --agree-tos --email your-email@example.com
```

### 4. Verify SSL
```bash
systemctl status nginx
curl -I https://yourdomain.com
```

### 5. Test Auto-Renewal
```bash
certbot renew --dry-run
```

---

## Post-Deployment

### 1. Update DNS Records
Point your domain to VPS IP:
```
A Record: @ → VPS_IP_ADDRESS
A Record: www → VPS_IP_ADDRESS
```

### 2. Verify Deployment
```bash
# Check container status
docker compose ps

# Check Nginx status
systemctl status nginx

# Check SSL certificate
curl -I https://yourdomain.com

# Check logs
docker compose logs -f
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 3. Setup Monitoring (Optional)
```bash
# View container stats
docker stats

# Setup log rotation
nano /etc/logrotate.d/docker-compose
```

### 4. Setup Automatic Updates (Optional)
Create update script:
```bash
nano /root/update-app.sh
```

Add:
```bash
#!/bin/bash
cd /var/www/htdocs/project-name
git pull origin main
docker compose pull
docker compose up -d
docker image prune -f
```

Make executable:
```bash
chmod +x /root/update-app.sh
```

---

## Troubleshooting

### Container Issues

**Container won't start:**
```bash
# Check logs
docker compose logs

# Check if port is in use
netstat -tulpn | grep 3000

# Restart container
docker compose down
docker compose up -d
```

**Container running but not accessible:**
```bash
# Check if container is healthy
docker compose ps

# Check container network
docker inspect container-name | grep -i network

# Test from inside container
docker exec -it container-name sh
wget http://localhost:3000
```

### Nginx Issues

**Port 80/443 already in use:**
```bash
# Find what's using the port
netstat -tulpn | grep :80
lsof -i :80

# Stop conflicting service
systemctl stop apache2  # or other service
```

**Nginx won't start:**
```bash
# Check configuration
nginx -t

# Check error logs
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### SSL Issues

**Certificate not working:**
```bash
# Check certificate
certbot certificates

# Renew certificate manually
certbot renew --force-renewal

# Check Nginx SSL config
nano /etc/nginx/sites-available/yourdomain.com
```

**Let's Encrypt rate limit:**
- Use staging environment for testing
- Wait 7 days for rate limit reset
- Use DNS validation instead

### Database Connection Issues

**Can't connect to MongoDB:**
```bash
# Check environment variables
docker compose config

# Test MongoDB connection from container
docker exec -it container-name sh
wget https://cluster.mongodb.net

# Check MongoDB Atlas:
# - IP whitelist (allow 0.0.0.0/0 or VPS IP)
# - Database user credentials
# - Network access settings
```

### Performance Issues

**High memory usage:**
```bash
# Check container resources
docker stats

# Restart container
docker compose restart

# Check Node.js memory
docker exec container-name node -e "console.log(process.memoryUsage())"
```

**Slow response times:**
```bash
# Check Nginx access logs
tail -f /var/log/nginx/access.log

# Check container logs
docker compose logs -f

# Monitor system resources
htop
free -h
df -h
```

---

## Quick Reference Commands

### Docker Commands
```bash
docker compose up -d              # Start containers
docker compose down               # Stop containers
docker compose ps                 # List containers
docker compose logs -f            # View logs
docker compose restart            # Restart containers
docker compose pull               # Pull latest images
docker image prune -f             # Remove unused images
```

### Nginx Commands
```bash
nginx -t                          # Test configuration
systemctl restart nginx           # Restart Nginx
systemctl status nginx            # Check status
tail -f /var/log/nginx/error.log # View error logs
```

### Git Commands
```bash
git pull origin main              # Pull latest code
git status                        # Check status
git log --oneline -5              # View recent commits
```

### System Commands
```bash
df -h                            # Check disk space
free -h                          # Check memory
htop                             # Monitor processes
netstat -tulpn                   # Check open ports
```

---

## Deployment Checklist

- [ ] Project tested locally
- [ ] Environment variables configured
- [ ] Dockerfile created
- [ ] .dockerignore created
- [ ] docker-compose.yml created
- [ ] Docker image built successfully
- [ ] Docker image pushed to Docker Hub
- [ ] VPS connected and updated
- [ ] Docker installed on VPS
- [ ] Nginx installed on VPS
- [ ] Project directory created
- [ ] Repository cloned
- [ ] .env file created on VPS
- [ ] Container running successfully
- [ ] Nginx configured
- [ ] SSL certificate obtained
- [ ] Domain DNS configured
- [ ] Website accessible via HTTPS
- [ ] Health checks passing
- [ ] Logs monitored

---

## Support Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Docker Documentation**: https://docs.docker.com
- **Nginx Documentation**: https://nginx.org/en/docs
- **Let's Encrypt**: https://letsencrypt.org/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

**Created:** February 2026  
**Last Updated:** February 2026  
**Version:** 1.0
