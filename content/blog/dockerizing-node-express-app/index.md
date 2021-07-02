---
title: Dockerizing Express.js (Node.js framework) application
tags: ["node.js", "express.js", "docker"]
author: "Swapnil Patil"
date: "2021-04-29T00:00:00.111Z"
description: ""
---
Lets run simple express.js application using docker.

This articles assumes you already have docker desktop installed on your development machine.

We will achieve this by creating a `Dockerfile` and a `docker-compose.yml` files at the root of our application source code.

Dockerfile is a text file that contains the commands to create our docker image. And another utility called Compose by making use of `docker-compose.yml` file will run this container as a service for us.

### Step 1: Create express barebone application 

```bash
git clone [https://github.com/swapnil00patil/micro8](https://github.com/swapnil00patil/micro8) 
cd express
												OR
npx express-generator (https://expressjs.com/en/starter/generator.html)
```

### Step 2: Create a Dockerfile

```jsx
FROM node:15.12.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
```

We start by defining the base image to host our application in. 

/app is a directory where we host our source code.

`ADD . .` copies the source code from source code on host machine over to container's `/app` directory.

We run `npm install` inside the image.

And finally we create entrypoint.sh.  

### Step 3: Create entrypoint.sh

We are not doing much here. But lets keep it separate so we can extend it as required.

```bash
#!/bin/sh

DEBUG=express:* npm start

exec "$@"
```

### Step 4 docker-compose.yml

```jsx
version: '3.8'

services:
  dev:
    build: 
      context: ./
      dockerfile: Dockerfile
    volumes:
      - ./:/app
    ports:
      - '4000:4000'
```

And finally run `docker compose up` in the terminal at the root of your application.

Your application will be running at http://localhost:3000.