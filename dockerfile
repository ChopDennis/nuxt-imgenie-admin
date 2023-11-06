# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18.18.2

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN yarn

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# Expose network port
ENV HOST 0.0.0.0 
EXPOSE 3000

# Run app
CMD [ "yarn", "preview" ]