# ---- Build stage ----
FROM node:20-alpine AS builder

# Accept build args
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

WORKDIR /app

# Copy package files and install all deps (including devDeps needed for build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV UPLOAD_DIR=/app/public/uploads

# Install wget for healthcheck (curl not in node:alpine)
RUN apk add --no-cache wget

# Copy the standalone server output
COPY --from=builder /app/.next/standalone ./

# Copy static assets (CSS, JS chunks) — required for standalone mode
COPY --from=builder /app/.next/static ./.next/static

# Copy public folder (images, fonts, etc.)
COPY --from=builder /app/public ./public

# Create uploads directory with proper permissions
RUN mkdir -p /app/public/uploads/treatments && \
    mkdir -p /app/public/uploads/hospitals && \
    mkdir -p /app/public/uploads/doctors && \
    mkdir -p /app/public/uploads/blogs && \
    mkdir -p /app/public/uploads/medical-reports && \
    mkdir -p /app/public/uploads/testimonials && \
    chmod -R 755 /app/public/uploads

# Expose port
EXPOSE 3000

# Run the standalone Node server (not next start)
CMD ["node", "server.js"]
