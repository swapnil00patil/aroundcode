---
title: Implement Priority Queue in Javascript
tags: ["javascript", "algorithm"]
author: "Swapnil Patil"
date: "2021-04-13T00:00:00.111Z"
description: ""
---

### What is Queue?

Most of the engineers are aware of this, so feel free to skip. Queue is data structure which follow rule - First In First Out (FIFO)

Below is the minimal implementation of queue in javascript.  

```jsx
let queue = []
queue.push(1)
queue.push(2)
queue.shift() // output 1
queue.shift() // output 2
```

### What is Priority Queue?

Simple queue does not account for weightage or importance for object we are storing. Priority queue will serve you item with highest priority at any given time. 

Priority Queue is Binary Max Heap with rule - It is a tree where parent is always greater than children.

Always remember, we need to visualise Priority Queue as Binary Max Heap instead of implementation of queue. 

<iframe frameborder="0" src="/video/?file=priority-queue.mp4" width="400" height="220"></iframe>

### Benefits

There are enormous amount applications based on Priority Queue. 

* In hospitals we can use priority queue based on severity of patient
*  Load balancing can be implemented based on action users are doing
* Dijkstra's algorithm used priority queue 

### Implementation

We are going to implement enqueue and dequeue methods. We will use array to store the values. Do remember below important formulas below -

* find parent index of current node - const parentIndex = Math.floor(index - 1 / 2)

* find left children index of current node - const leftIndex = (2 * index) + 1

* Get right children index of current node - const rightIndex = (2 * index) + 2

#### enqueue  - Insert in queue

<iframe frameborder="0" src="/video/?file=priority-queue-insert.mp4" width="400" height="220"></iframe>

#### dequeue - remove from queue

<iframe frameborder="0" src="/video/?file=priority-queue-remove.mp4" width="400" height="220"></iframe>

## Full Code <a href="https://github.com/swapnil00patil/js-algo/blob/master/queue/priority-queue.js" target="_blank">Github</a> or Try Below
<iframe frameborder="0" width="100%" height="800px" src="https://replit.com/@swapnil00patil/PriorityQueue?lite=true"></iframe>


