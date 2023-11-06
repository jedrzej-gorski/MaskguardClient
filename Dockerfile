# Use the official Node.js image as the base image
FROM node:14-alpine AS build

# Set the working directory in the container
WORKDIR /app

COPY . .

# Install dependencies
RUN npm i && npm run build

# Use Nginx as the server
FROM nginx:alpine

# Copy the built React application to the Nginx server's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the application will run on (Nginx defaults to port 80)
EXPOSE 80