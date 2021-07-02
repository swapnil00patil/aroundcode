---
title: draft
tags: ["react", "kubernetes", "docker", "minikube"]
author: "Swapnil Patil"
date: "2021-07-11T00:00:00.111Z"
description: ""
---

We have already learned how to dockerize a Vite + React application in article.  In this article we will run dockerized image in Kubernetes using Minikube on local.

## Installation 

#### kubectl

kubectl is command line tool which will allow you to run commands against Kuberentes Cluster.

Install using brew on Mac. For different OS follow - <a href="https://kubernetes.io/docs/tasks/tools/" target="_blank">kubernetes.io/docs/tasks/tools/</a>


```jsx
brew install kubectl
```

#### minikube

minikube allow us to run Kubernetes locally. Different cloud providers like AWS, Google Cloud have there own implementations. If you want to run self-managed Kubernetes on server you can use kubeadm, kOps and many more. 

Install using brew on Mac. For different OS follow - <a href="https://minikube.sigs.k8s.io/docs/start/" target="_blank">minikube.sigs.k8s.io/docs/start/</a>

```jsx
brew install minikube
```

#### hyperkit

I am going to use hyperkit but you can use any other drivers available with minikube - <a href="https://minikube.sigs.k8s.io/docs/drivers/" target="_blank">minikube.sigs.k8s.io/docs/drivers/</a>

Please use VM based option as it gives you sandboxed environment. Also my tutorials use VM based approach.

If Docker for Desktop is installed, you already have HyperKit otherwise 

```bash
brew install hyperkit
```

## Lets start

```bash
minikube start --driver=hyperkit
```

With single command we have Kubernetes cluster up and running. Lets check by running `kubectl config get-contexts`. It will show all the clusters which you can connect. Below you can see I have 3 clusters running - default, gke_xx(Kubernetes cluster running in Google cloud), minikube. * indicates cluster which you are currently connected. 

```jsx
➜  ~ kubectl config get-contexts
CURRENT   NAME       CLUSTER    AUTHINFO    NAMESPACE
          default    default    default
          gke_xxx    gke_xxx    gke_xxx
*         minikube   minikube   minikube      default
```

Hmm..how I can switch between clusters? `kubectl config use-context minikube` 

I have docker image ready created using article-

```bash
➜  vite-todo-app git:(main) ✗ docker images
REPOSITORY                                        TAG                   IMAGE ID       CREATED        SIZE
vite-todo-app_dev                                 latest                551444a9cc51   2 hours ago    1.04GB
```

Lets upload docker image from local docker to Minikube cluster

```bash
minikube image load vite-todo-app_dev:latest
minikube image list
```

We can start pod named vite-todo-app using command below. We need to set `--image-pull-policy=Never` (<a href="https://kubernetes.io/docs/concepts/configuration/overview/#container-images" target="_blank">kubernetes.io/docs/concepts/configuration/overview/#container-images</a> otherwise Minikube cluster will try to pull image from docker registry. But we have not pushed this image to docker repository/docker hub.

```jsx
kubectl run vite-todo-app --image=docker.io/library/vite-todo-app_dev:latest --image-pull-policy=Never
```

Lets check by using `kubectl get pods` 

```bash
➜  vite-todo-app git:(main) ✗ kubectl get pods
NAME                           READY   STATUS    RESTARTS   AGE
vite-todo-app                  1/1     Running   0          46s
```

We are running the pod containing one container with image vite-todo-app_dev. 

But this is not a correct way to run app in Kubernetes. We need to create deployment which will handle deployment and we can patch, scale the deployment.

Let's create deployment with our image. Now for simplicity we are keeping default settings for all other options. 

```jsx
kubectl create deployment vite-todo-app --image=docker.io/library/vite-todo-app_dev:latest
```

Now if you run `kubectl get pods` then you will see error 

```bash
vite-todo-app-654bf76688-65l2c   0/1     ImagePullBackOff   0          29s
```

Oops. We have not set imagePullPolicy. Lets do it by patching deployment. To patch the container we first need to find name of container. 

Simplest way - `kubectl get pods -o jsonpath="{.items[*].spec.containers[*].name}"`  This will output all the containers if you are running multiple pods. copy one like vite-todo-app-dev-**

```jsx
kubectl patch deployment vite-todo-app -p '{"spec":{"template":{"spec":{"containers":[{"name":"vite-todo-app-dev-hj5dq","imagePullPolicy":"Never"}]}}}}' -n default
```

Now we have our app running in pod successfully. But how to access it??

We need to create service as shown below and forward the port. Just go to <a href="http://localhost:3000/" target="_blank">localhost:3000</a> to view your app.

```jsx

// Create service vite-todo-app
kubectl expose deployment vite-todo-app --type=NodePort --port=3000

// port forwarding
kubectl port-forward service/vite-todo-app 3000:3000
```