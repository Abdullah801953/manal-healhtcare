# 🚀 Deployment Guide - Manal Healthcare

Complete guide to deploy the Manal Healthcare website to a VPS server using Docker and GitHub Actions.

## 📋 Prerequisites

- VPS server (Ubuntu 20.04+ recommended)
- Domain name pointed to your VPS
- GitHub account with repository access
- MongoDB instance (Atlas or self-hosted)

## 🔧 Server Setup

### 1. Connect to Your VPS

```bash
ssh root@your-vps-ip
```

### 2. Run Setup Script

```bash
# Copy setup script to server
wget https://raw.githubusercontent.com/your-username/repo/main/scripts/setup-vps.sh
chmod +x setup-vps.sh
sudo ./setup-vps.sh
```

Or manually run commands from `scripts/setup-vps.sh`.

### 3. Configure Environment Variables

Edit `/opt/manal-healthcare/.env`:

```bash
nano /opt/manal-healthcare/.env
```

Update with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `NEXT_PUBLIC_BASE_URL`: Your domain URL (https://yourdomain.com)
- `JWT_SECRET`: Generate a secure random string
- `GITHUB_USERNAME`: Your GitHub username

### 4. Update Nginx Configuration

```bash
nano /etc/nginx/sites-available/manal-healthcare
```

Replace `yourdomain.com` with your actual domain.

Test and reload:
```bash
nginx -t
systemctl reload nginx
```

### 5. Setup SSL Certificate

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow prompts to complete SSL setup.

### 6. Copy Docker Compose File

```bash
# From your local machine
scp docker-compose.yml root@your-vps-ip:/opt/manal-healthcare/
```

## 🔑 GitHub Secrets Setup

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `VPS_HOST` | VPS IP address | `123.45.67.89` |
| `VPS_USERNAME` | SSH username | `root` |
| `VPS_SSH_KEY` | Private SSH key | Generate with `ssh-keygen` |
| `VPS_PORT` | SSH port | `22` |
| `NEXT_PUBLIC_BASE_URL` | Domain URL | `https://yourdomain.com` |

### Generate SSH Key Pair

On your local machine:

```bash
ssh-keygen -t ed25519 -C "github-actions"
```

- Copy **private key** (`~/.ssh/id_ed25519`) → GitHub Secret `VPS_SSH_KEY`
- Copy **public key** (`~/.ssh/id_ed25519.pub`) → VPS `~/.ssh/authorized_keys`

## 🐳 Manual Docker Commands

### Build and Run Locally

```bash
# Build image
docker build -t manal-healthcare .

# Run container
docker run -p 3000:3000 --env-file .env.local manal-healthcare
```

### Server Management

```bash
cd /opt/manal-healthcare

# Pull latest image
docker compose pull

# Start services
docker compose up -d

# View logs
docker compose logs -f

# Restart services
docker compose restart

# Stop services
docker compose down

# Check status
docker compose ps
```

## 📦 Next.js Configuration

Update `next.config.ts` to enable standalone output:

```typescript
const nextConfig = {
  output: 'standalone',
  // ... other config
};

export default nextConfig;
```

## 🔄 Deployment Workflow

1. **Push Code** to `main` or `abdullah-branch`
2. **GitHub Actions** automatically:
   - Builds Docker image
   - Pushes to GitHub Container Registry
   - SSHs to VPS
   - Pulls latest image
   - Restarts containers
3. **Health Check** verifies deployment

## 🔍 Monitoring & Logs

### View Application Logs
```bash
docker compose logs -f web
```

### View Nginx Logs
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Check Container Status
```bash
docker compose ps
docker stats
```

## 🆘 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker compose logs web

# Check environment variables
docker compose config

# Verify MongoDB connection
docker compose exec web node -e "console.log(process.env.MONGODB_URI)"
```

### Nginx 502 Bad Gateway
```bash
# Check if app is running
docker compose ps

# Check app logs
docker compose logs web

# Restart services
docker compose restart
```

### Permission Issues
```bash
# Fix uploads directory permissions
chown -R 1001:1001 /opt/manal-healthcare/public/uploads
```

## 🔒 Security Best Practices

1. **Firewall**: Only allow ports 22, 80, 443
2. **SSH**: Disable password authentication, use key-only
3. **SSL**: Always use HTTPS with valid certificate
4. **Secrets**: Never commit `.env` files
5. **Updates**: Regularly update server packages
6. **Backups**: Backup MongoDB and uploads directory

## 📱 Health Check API

Create health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date() });
}
```

## 🎯 Performance Tips

1. Enable Next.js image optimization
2. Use CDN for static assets
3. Enable Redis caching (optional)
4. Monitor with tools like PM2 or New Relic
5. Set up log rotation for Docker

## 🔄 Rollback Procedure

```bash
cd /opt/manal-healthcare

# View available images
docker images

# Stop current container
docker compose down

# Edit docker-compose.yml to use specific tag
nano docker-compose.yml
# Change: ghcr.io/user/repo:latest → ghcr.io/user/repo:sha-abc123

# Start with old version
docker compose up -d
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

## 💡 Support

For issues or questions:
1. Check logs: `docker compose logs -f`
2. Review this documentation
3. Check GitHub Actions workflow runs
4. Contact system administrator

---

**Last Updated**: February 2026
