# Step 1: Use an official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (for caching dependencies)
COPY backend/package*.json ./

# Step 4: Install backend dependencies
RUN npm install

# Step 5: Copy the rest of the backend code
COPY backend/ ./

# Step 6: Expose the backend port (5001 or your app's port)
EXPOSE 5001

# Step 7: Start the backend server
CMD ["npm", "start"]