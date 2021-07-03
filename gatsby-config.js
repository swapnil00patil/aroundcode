module.exports = {
  siteMetadata: {
    title: `AroundCode`,
    siteUrl: `http://aroundcode.io/`,
    description: 'Blog by Swapnil and Kiran about their technical Journey',
    authors: {
      swapnil: {
        author: `Swapnil Patil`,
        description: `I work as a Software Engineer in Singapore. 12 years of Experience in Enterprise Web and Hybrid Mobile Applications. I am a techie and I love making cool products.`,
        social: {
          linkedin: `https://www.linkedin.com/in/swapnil00patil/`,
          github: `https://github.com/swapnil00patil`,
          website: `https://swapnilpatil.dev`,
        }
      },
      kiran: {
        author: `Kiran Aghor`,
        description: ``,
        social: {
          linkedin: `https://www.linkedin.com/in/kiranaghor/`,
          github: `https://github.com/kiran-aghor`,
        }
      }
    }
  },
  plugins: [
    `gatsby-plugin-styled-components`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `AroundCode`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/site-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GTAG_ID
        ]
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ].filter((i) => {
    if(process.env.NODE_ENV === 'development' && i && i.options && i.options.isDevelopment) {
      return true
    } else if(i && i.options && i.options.isDevelopment) {
      return false
    }
    return true
  })
}
