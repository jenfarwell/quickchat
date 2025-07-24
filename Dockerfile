# Use the official Node.js 18 image as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port on which the app runs
EXPOSE 3000 

# Define the command to run the application
CMD ["npm", "start"]