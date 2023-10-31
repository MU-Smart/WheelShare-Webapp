# ----- Build Stage -----
FROM node:16-alpine AS builder

WORKDIR /app

# Copy the package files
COPY package*.json .

# Download dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# ----- Production Stage -----
FROM nginx:stable-alpine

# Copy the build files to the nginx server
COPY --from=builder /app/build /var/www/mypathweb/static

# Copy the nginx configuration file
COPY web.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80