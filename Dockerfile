# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching.
# This helps Docker re-use layers if only source code changes, not dependencies.
COPY package*.json ./

# Install project dependencies.
# The `-f` or `--force` flag can bypass some peer dependency warnings,
# but it's generally best to resolve these if possible.
RUN npm install --force

# Copy the rest of the application's source code
COPY . .

# Build the Angular application for production (client-side rendering).
# This command will generate the optimized static files (HTML, CSS, JS)
# into the 'docs/browser' directory, as per your angular.json configuration.
RUN npm run build

# Stage 2: Create the production-ready runtime image to serve static files
FROM nginx:alpine

# Copy the built Angular application from the builder stage to the Nginx server's root directory.
# This will serve the static files directly from Nginx.
COPY --from=builder /app/docs/browser /usr/share/nginx/html
# Expose port 80 to allow external access to the Nginx server.
EXPOSE 80
# Start Nginx in the foreground to keep the container running.
CMD ["nginx", "-g", "daemon off;"]
