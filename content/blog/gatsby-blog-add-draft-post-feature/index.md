---
title: Add draft post feature in Gatsby Blog
tags: ["gatsby"]
author: "Swapnil Patil"
date: "2021-07-01T00:00:00.111Z"
description: ""
---

On my website <a href="https://www.aroundcode.io/">aroundcode.io</a>, I wanted draft functionality for writing posts. If I do not have draft functionality then I have to write posts somewhere else and then publish. I am using Gatsby and Markdown to write posts.

I read couple of articles online and they suggest to add isDraft or published flag for each article in Markdown. So solutions is to add isDraft flag and filter posts depennding on `NODE_ENV` environment. 

This solution works fine with simple blog with posts. But I have added features like tags, authors etc. So I have add the `NODE_ENV` flag at many places and filter posts depennding on value of `NODE_ENV` (developement or production).

Actually we can achieve this with simple telling `gatsby-source-filesystem` to read file from `blog` as well as `blog-draft` folder.

Original `gatsby-config.js`

```
plugins: [
    ...........
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    }
    ...........
```

I am reading all the posts created in blog directory. Now I added one more directory `blog-draft` and set key `isDevelopment: true` in `options` as below - 

```
plugins: [
    ...........
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog-draft`,
        name: `blog`,
        isDevelopment: true
      },
    },
    ...........
```

Now I am showing posts from `blog` and `blog-draft` directories in both `development` and `production` environemnt. 

Now only thing I need to do is filter plugins based on `NODE_ENV` value....

```
[].filter((i) => {
    if(process.env.NODE_ENV === 'development' && i && i.options && i.options.isDevelopment) {
      return true
    } else if(i && i.options && i.options.isDevelopment) {
      return false
    }
    return true
  })
```

#### hooray!
One manual thing you need to do is to move article from `blog-draft` directory to `blog` directory when you want to publish.