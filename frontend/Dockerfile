# Step 1: Use an official Node.js image as the base image
FROM node:16 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (for caching dependencies)
COPY frontend/package*.json ./

# Step 4: Install frontend dependencies
RUN npm install

# Step 5: Copy the rest of the frontend code
COPY frontend/ ./

# Step 6: Build the frontend app (for production)
RUN npm run build

# Step 7: Use Nginx to serve the built frontend app
FROM nginx:alpine

# Step 8: Copy the build files from the build step
COPY --from=build /app/build /usr/share/nginx/html

# 👇 Add this line to configure API proxying in production
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Step 9: Expose port 80 (Nginx default)
EXPOSE 80

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]