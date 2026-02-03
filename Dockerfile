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
