# GitHub Actions CI/CD Setup Guide

## What is GitHub Actions CI/CD?

GitHub Actions automatically builds, tests, and deploys your code when you push to GitHub. This means:
- ✅ Automatic Docker image building
- ✅ Automatic pushing to Docker Hub
- ✅ Automatic deployment to VPS
- ✅ Zero manual deployment steps

## Workflow Overview

```
Push to main branch
    ↓
Build & Test (npm run build)
    ↓
Build Docker Image
    ↓
Push to Docker Hub
    ↓
Deploy to VPS
    ↓
Verify Deployment
    ↓
✅ Done!
```

## Prerequisites

1. **GitHub Repository** - Already have it ✅
2. **Docker Hub Account** - Create at https://hub.docker.com
3. **GitHub Secrets** - Configure below

## Step 1: Create GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Create these secrets:

### 1. Docker Hub Credentials
**Secret Name:** `DOCKER_USERNAME`
**Value:** Your Docker Hub username

**Secret Name:** `DOCKER_PASSWORD`
**Value:** Your Docker Hub personal access token
- Go to Docker Hub → Account Settings → Security → New Access Token
- Give it a name like "GitHub Actions"
- Copy and paste the token

### 2. VPS Credentials
**Secret Name:** `VPS_HOST`
**Value:** Your VPS IP address (e.g., `72.62.72.249`)

**Secret Name:** `VPS_USER`
**Value:** `root` (or your VPS user)

**Secret Name:** `VPS_SSH_KEY`
**Value:** Your VPS SSH private key
```bash
# On your local machine, copy your SSH key:
cat ~/.ssh/id_rsa
# Or if you generated it for VPS:
cat /path/to/vps/ssh/key
```

**Secret Name:** `MONGODB_URI`
**Value:** Your MongoDB Atlas connection string
```
mongodb+srv://user:password@cluster.mongodb.net/?appName=Cluster0
```

## Step 2: Setup SSH on VPS

### If you don't have SSH key yet:

**On your local machine:**
```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/vps_key -N ""

# Copy public key
cat ~/.ssh/vps_key.pub
```

**On VPS:**
```bash
# Add public key to authorized_keys
mkdir -p ~/.ssh
echo "PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

**In GitHub Secrets:**
```bash
# Copy private key to GitHub secret
cat ~/.ssh/vps_key
```

## Step 3: Configure Workflow File

The workflow file is already created at `.github/workflows/deploy.yml`

It includes:
- ✅ **Test Job** - Builds and tests your Next.js project
- ✅ **Build & Push Job** - Creates Docker image and pushes to Docker Hub
- ✅ **Deploy Job** - Pulls code and deploys to VPS
- ✅ **Verify Job** - Checks if deployment was successful

## Step 4: Test the Workflow

### Trigger workflow manually:
1. Go to GitHub → Actions tab
2. Click "Deploy to VPS" workflow
3. Click "Run workflow" → Run workflow

### Or trigger by pushing to main:
```bash
git add .
git commit -m "Update: Enable CI/CD"
git push origin main
```

## Step 5: Monitor Deployment

### Watch in GitHub Actions:
1. Go to GitHub → Actions tab
2. Click the latest workflow run
3. See real-time logs of build and deployment

### After deployment, verify on VPS:
```bash
ssh root@your-vps-ip

# Check container status
docker compose ps

# View logs
docker compose logs -f

# Test endpoint
curl -I https://manalhealthcare.com
```

## Workflow Jobs Explained

### 1. **Test Job** (Runs First)
```yaml
- Checks out code
- Installs dependencies
- Runs linting (if available)
- Builds project
- Catches errors early
```

### 2. **Build & Push Job** (If Tests Pass)
```yaml
- Builds Docker image
- Pushes to Docker Hub with:
  - latest tag
  - version/git SHA tag
- Caches layers for faster builds next time
```

### 3. **Deploy Job** (If Build Succeeds)
```yaml
- Connects to VPS via SSH
- Pulls latest code from GitHub
- Pulls latest Docker image
- Stops old container
- Starts new container
- Waits for health check
- Cleans up old images
```

### 4. **Verify Job**
```yaml
- Checks container status
- Shows logs
- Tests health endpoint
```

## Triggering Deployments

### Automatic (On Push to main):
```bash
git push origin main
# Workflow automatically starts
```

### Manual (From GitHub UI):
1. Go to Actions tab
2. Click "Deploy to VPS"
3. Click "Run workflow"

## Troubleshooting

### Workflow fails at SSH connection:
```
❌ Error: Permission denied (publickey)
```
**Solution:**
- Verify VPS_SSH_KEY is correct
- Check SSH key permissions on VPS
- Test SSH manually: `ssh -i key.pem root@IP`

### Docker push fails:
```
❌ Error: unauthorized: authentication required
```
**Solution:**
- Check DOCKER_USERNAME and DOCKER_PASSWORD
- Create new Docker Hub token (not password)
- Verify secrets in GitHub

### Deployment fails:
```
❌ Error: git pull origin main failed
```
**Solution:**
- SSH to VPS manually and test git pull
- Check if repository is cloned correctly
- Verify git credentials

### Container won't start:
```
❌ Container exited with code 1
```
**Solution:**
- Check env vars match .env file
- View logs: `docker compose logs`
- Test locally: `npm run build`

## Environment Variables

Workflow uses these environment variables from GitHub Secrets:

```yaml
DOCKER_USERNAME    # Docker Hub username
DOCKER_PASSWORD    # Docker Hub token
VPS_HOST          # VPS IP address
VPS_USER          # VPS username (usually 'root')
VPS_SSH_KEY       # VPS SSH private key
MONGODB_URI       # MongoDB connection string
PROJECT_PATH      # VPS project path (/var/www/htdocs/project-name)
```

## Useful GitHub Actions Features

### 1. Skip deployment:
Add `[skip deploy]` to commit message:
```bash
git commit -m "Update docs [skip deploy]"
```

### 2. Only run on specific branches:
Edit workflow:
```yaml
on:
  push:
    branches:
      - main          # Only main branch
      - production    # And production
```

### 3. Schedule automatic deployments:
```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight
```

### 4. Manual trigger:
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'production'
```

## Best Practices

✅ **DO:**
- Push to main branch only when ready to deploy
- Use meaningful commit messages
- Test locally before pushing
- Monitor deployment logs
- Keep secrets secure

❌ **DON'T:**
- Commit secrets to repository
- Push to main while testing
- Change production database in tests
- Run tests on production data

## Quick Commands

### Manually trigger workflow from CLI:
```bash
gh workflow run deploy.yml --ref main
```

### View workflow status:
```bash
gh workflow view deploy.yml
```

### View recent runs:
```bash
gh run list --workflow=deploy.yml
```

### Monitor live logs:
```bash
gh run watch <run-id>
```

## Example Deployment Flow

**Local:**
```bash
git checkout main
# Make changes
npm run build   # Test locally
git commit -m "Feature: Add new page"
git push origin main
```

**GitHub Actions (Automatic):**
1. ✅ Checks out code
2. ✅ Installs dependencies
3. ✅ Runs tests
4. ✅ Builds Docker image
5. ✅ Pushes to Docker Hub
6. ✅ Connects to VPS
7. ✅ Pulls new code
8. ✅ Pulls new Docker image
9. ✅ Restarts container
10. ✅ Verifies deployment

**VPS:**
- New code is live!
- Traffic automatically routed to new container
- Zero downtime deployment

## Success Indicators

### ✅ Successful Workflow:
```
✓ build-and-push (5m 30s)
✓ test (2m 15s)
✓ deploy (1m 45s)
✓ notify (10s)

All jobs completed successfully
```

### 📊 Monitor Dashboard:
Go to Actions tab and see:
- Green checkmarks = Success
- Red X = Failed
- Orange circle = Running

## Support

If something goes wrong:
1. Check GitHub Actions logs
2. SSH to VPS and check docker logs
3. Verify all secrets are set
4. Test deployment manually
5. Check README or Documentation

---

**You now have fully automated CI/CD! 🚀**

Just push to main and everything deploys automatically!
