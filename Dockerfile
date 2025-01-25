# Use the Node.js official image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the application code
COPY ./source /app

# Create service user group and create user: nodeuser
RUN groupadd -r nodegroup && useradd -r -g nodegroup nodeuser

# Set premissions for user and group
RUN chown -R nodeuser:nodegroup /app

# Install dependencies
RUN npm install && npm install express --save && npm install cors --save && npm install dotenv --save

# Set user to run service
USER nodeuser

# Expose port 3000
EXPOSE 3000

# Debug Tests
# RUN pwd && ls -la 

# Start the application
CMD ["node", "index.js"]

# Debug Tests
# CMD ["sleep", "Infinity"]