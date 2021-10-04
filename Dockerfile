# get node
FROM node:latest

# Creates the docker directory
COPY . /app
RUN ls
WORKDIR /app

# npm install
RUN cd ./front-end && npm install && npm run build

WORKDIR /app/front-end
CMD ["npm", "start"]
