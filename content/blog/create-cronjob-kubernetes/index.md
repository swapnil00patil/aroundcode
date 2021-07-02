---
title: Create CronJob in Kubernetes
tags: ["kubernetes", "cronjob"]
author: "Swapnil Patil"
date: "2021-06-14T00:00:00.111Z"
description: ""
---

In last article ["Run dockerized express.js in Kubernetes"](/run-dockerized-node-express-app-in-kubernetes/) we have ran the Express.js app in Kubernetes. Now we are going use cronjob to call the same service periodically.


(Please note, we are trying to learn how things work in barebone Kubernetes. There are awesome tools like Helms charts, Terraform to handle Kubernetes configurations and run production systems)

If you check file `get-users-cronjob.yaml` , we are calling curl in cronjob. You will need ip of the pod to call curl. For this we can use internal IP which is assigned to each pod by Kubernetes. From below we can use - 172.17.0.3.  

```bash
➜  express git:(main) ✗ kubectl get pods -o wide
NAME                                 READY   STATUS      RESTARTS   AGE     IP           NODE       NOMINATED NODE   READINESS GATES
express-demo-5c4c5f868-m4pgr         1/1     Running     0          56m     172.17.0.3   minikube   <none>           <none>
```

Then replace 172.17.0.3 in curl command in file `get-users-cronjob.yaml` then run - 

```bash
➜  express git:(main) ✗ kubectl create -f ./k8-dev/get-users-cronjob.yaml
cronjob.batch/get-users-cronjob created
```

Below is our `get-users-cronjob.yaml` 
#### Important settings - 

* schedule: "*/1 * * * *" - When you want to run cron. Use [https://crontab.guru/](https://crontab.guru/) to play around as required.
* concurrencyPolicy: Forbid - Whether to allow concurrent execution of a job ([https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/#concurrency-policy](https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/#concurrency-policy))
* backoffLimit: 4 - This setting specify number of retries. Once this limit is reached kube will stop retrying.
* restartPolicy: Never - We can only have `Never` or `OnFailure` 
* command: This is bash command you want to run. In my case, I am just using curl to call api.

Note: Use curl with -f (—fail), it will return error if api return http response other than 200. This will trigger the retry until backoffLimit is reached

```bash
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: get-users-cronjob
spec:
  schedule: "*/1 * * * *"
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      backoffLimit: 4
      template:
        spec:
          containers:
          - name: get-users-cronjob
            image: curlimages/curl:7.70.0
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - 'curl
              -H "Content-Type: application/json"
              http://172.17.0.7:4000/users'
          restartPolicy: Never
```

Check if you have cronjob configured in cluster. (-w will watch for cron activity and show you on console whever new cron is triggered)

```bash
➜  express git:(main) ✗ kubectl get cronjobs --watch
NAME                SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
get-users-cronjob   */1 * * * *   False     0        <none>          23s
```

Lets say, for testing you want to trigger cronjob manually. You can using command below - 

```bash
kubectl create job --from=cronjob/get-users-cronjob get-users-1
```