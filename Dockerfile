# ----- Build Stage -----
FROM node:16-alpine AS builder

WORKDIR /app

# Copy the package files
COPY package*.json .

# Download dependencies
RUN npm install
RUN npm install -g serve

# Copy the source code
COPY . .

EXPOSE 3000

# Build the app
RUN npm run build

# Serve the app
CMD ["serve", "-s", "build"]