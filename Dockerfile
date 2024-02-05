FROM node:20

WORKDIR /usr/src/app

# Set build arguments
ARG MONGODB_URI
ARG PORT
ARG WEBFLOW_API_KEY
ARG WEBFLOW_SITE_ID
ARG WEBFLOW_COLLECTION_ID

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV MONGODB_URI=$MONGODB_URI
ENV PORT=$PORT
ENV WEBFLOW_API_KEY=$WEBFLOW_API_KEY
ENV WEBFLOW_SITE_ID=$WEBFLOW_SITE_ID
ENV WEBFLOW_COLLECTION_ID=$WEBFLOW_COLLECTION_ID

# Expose port
EXPOSE 5000

# Command to run your application
CMD ["npm", "start"]
