# Node.js image.
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the frontend app
CMD [ "npm", "start" ]
