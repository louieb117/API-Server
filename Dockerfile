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
RUN npm install --include=dev \
    && npm install -g express --save \
    && npm install -g jsonwebtoken --save \     
    && npm install -g cors --save \ 
    && npm install -g dotenv --save \
    && npm install -g mongoose --save  \
    && npm install -g @babel/plugin-transform-modules-commonjs --save \
    && npm install -g eslint-plugin-jest --save \
    && npm install -g ts-node --save \
    && npm install -g http --save \
    && npm install -g nodemon --save \
    && npm install -g jest  --save \
    && npm install -g supertest  --save \
    && npm install -g cross-env  --save \
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
# CMD ["node", "index.js"]
# CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]
# CMD ["npm", "test"]
# CMD ["npm", "run", "test:watch"]
# CMD ["npm", "run", "test:debug"]

# Debug Tests
# CMD ["sleep", "Infinity"]