# Use a base image
FROM node:16

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install app dependencies
RUN npm install
COPY frontend/public ./public
COPY frontend/src ./src
COPY frontend/. .
RUN npm run build


# Copy the rest of the application files
COPY frontend/ .

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
