# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node

## Stage 1: Build the app
FROM node:18.18.2 AS builder

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY package*.json ./

# Install only production dependencies
ENV NODE_ENV production
RUN yarn install --production

## Stage 2: Create the final lightweight image
FROM node:18.18.2

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.nuxt ./.nuxt
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Build the app
#COPY . .
#RUN yarn build
COPY .output ./.output

# Expose network port
ENV HOST 0.0.0.0 
EXPOSE 3000

# Run app
CMD [ "yarn", "preview" ]