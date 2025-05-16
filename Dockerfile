# Use the Node.js official image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the application code
COPY ./source /app

# Copy db files
COPY ./backend /data/db
# Create service user group and create user: nodeuser
RUN groupadd -r nodegroup && useradd -r -g nodegroup nodeuser

# Set premissions for user and group
#RUN chown -R nodeuser:nodegroup /app

# Install dependencies
RUN npm install --include=dev \
    && npm install express --save \
    && npm install jsonwebtoken --save \     
    && npm install cors --save \ 
    && npm install dotenv --save \
    && npm install mongoose --save  \
    && npm install @babel/plugin-transform-modules-commonjs --save \
    && npm install eslint-plugin-jest --save \
    && npm install ts-node --save \
    && npm install http --save \
    && npm install -g nodemon --save \
    && npm install jest --save \
    && npm install jest-environment-node --save \
    && npm install supertest --save \
    && npm install cross-env --save \
    && npm rebuild  \
    && npm list --depth=0 && ls -la
    
USER root
# Set premissions for user and group
RUN chown -R nodeuser:nodegroup /app

# Set user to run service
USER nodeuser

# Expose port 3000
EXPOSE 3000

# RUN ls -la
RUN pwd && ls -la
#RUN ls -la /app
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