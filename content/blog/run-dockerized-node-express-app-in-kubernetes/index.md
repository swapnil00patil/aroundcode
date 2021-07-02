---
title: Run dockerized Express.js application in Kubernetes using Minikube on local
tags: ["node.js", "kubernetes", "docker", "minikube"]
author: "Swapnil Patil"
date: "2021-05-26T00:00:00.111Z"
description: ""
---

Follow ["Dockerizing express.js application"](/dockerizing-node-express-app/) or 

```bash
git clone [https://github.com/swapnil00patil/micro8](https://github.com/swapnil00patil/micro8) 
cd express
```

### Step 1

Run `eval $(minikube docker-env)` , now we are in context of docker daemon running in Minikube instance. 

Create Image - `docker-compose build`

### Step 2

You can follow step by step guide in ["Run dockerized react application in Kubernetes using Minikube on local"](/run-dockerized-react-app-in-kubernetes/) or create deployment using-

```bash
➜  express git:(main) ✗ kubectl create -f ./k8-dev/create-deployment.yaml
deployment.apps/express-demo created
```

Below is our `create-deployment.yaml` 
#### Important settings - 

* image: docker.io/library/express_dev:latest - Name of docker image. (Please change if you have changed - image:tag)
* containerPort: 4000 - port on which our app is running in container
* imagePullPolicy: "Never" - This is required as we are not pulling images from DockerHub or any other registry.

```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express-demo
  labels:
    app: express-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: express-demo
  template:
    metadata:
      labels:
        app: express-demo
    spec:
      containers:
      - name: express-demo
        image: docker.io/library/express_dev:latest
        ports:
        - containerPort: 4000
        imagePullPolicy: "Never"
```

### Step 3 
Lets create service

```bash
➜  express git:(main) ✗ kubectl create -f ./k8-dev/create-service.yaml
service/express-demo created
```

Below is our `create-service.yaml` 
#### Important settings - 

* targetPort: 4000 - Port on which our service will send requests. In our case, 4000 is port on which our application in running
* port: 4000 - exposes the service on the specified port within the cluster. Other pods can communicate within cluster using this port

```bash
apiVersion: v1
kind: Service
metadata:
    name: express-demo
    labels:
        app: express-demo
spec:
    ports:
    - name: http
      protocol: TCP
      port: 4000
      targetPort: 4000
    selector:
        app: express-demo
    type: NodePort
```

At the moment we cannot access express app outside cluster. Lets check if it is working inside cluster.

1. `kubectl get services` will give you CLUSTER-IP of pod.
2. `minikube ssh` will ssh into the minikube VM then you can just use curl

```bash
➜  deploy git:(develop) ✗ kubectl get services
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                       AGE
express-demo    NodePort    10.108.192.123   <none>        4000:30595/TCP                18m

➜  deploy git:(develop) ✗ minikube ssh
                         _             _
            _         _ ( )           ( )
  ___ ___  (_)  ___  (_)| |/')  _   _ | |_      __
/' _ ` _ `\| |/' _ `\| || , <  ( ) ( )| '_`\  /'__`\
| ( ) ( ) || || ( ) || || |\`\ | (_) || |_) )(  ___/
(_) (_) (_)(_)(_) (_)(_)(_) (_)`\___/'(_,__/'`\____)

$ curl http://10.108.192.123:4000
<!DOCTYPE html><html><head><title>Express</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express</h1><p>Welcome to Express</p></body></html>$
```
