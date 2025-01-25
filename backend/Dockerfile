# Use the Node.js official image
FROM node:18

#USER node
RUN mkdir /usr/local/app
# Set the working directory inside the container
WORKDIR /usr/local/app

# Copy package.json and package-lock.json
COPY ../source/package*.json ./
COPY ../source/ ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
