# Use the Node.js official image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the application code
COPY ./source /app

# Create service user group and create user: nodeuser
RUN groupadd -r nodegroup && useradd -r -g nodegroup nodeuser

# Set premissions for user and group
#RUN chown -R nodeuser:nodegroup /app

# Install dependencies
RUN npm install --include=dev && npm install express --save \
    && npm install jsonwebtoken --save\     
    && npm install cors --save && npm install dotenv --save \
    && npm install mongoose --save  \
    && npm install @babel/plugin-transform-modules-commonjs \
    && npm install eslint-plugin-jest \
    && npm install ts-node \
    && npm install http \
    && npm install nodemon \
    && npm install jest  \
    && npm install supertest  \
    && npm install cross-env  \
    && npm rebuild
    # && npm list --depth=0 && ls -la
# Set premissions for user and group
RUN chown -R nodeuser:nodegroup /app

# Set user to run service
USER nodeuser

# Expose port 3000
EXPOSE 3000

# Debug Tests
# RUN pwd && ls -la 

# Start the application
CMD ["node", "index.js"]
# CMD ["npm", "test"]
# CMD ["npm", "run", "test:watch"]
# CMD ["npm", "run", "test:debug"]

# Debug Tests
# CMD ["sleep", "Infinity"]