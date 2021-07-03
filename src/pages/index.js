import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Author } from "../components/commonStyled"
import Tags from "../components/Tags"

const Article = styled.article`
  border-bottom: 1px dashed #ccc;
  padding: ${rhythm(1)} 0;
  margin: 0;
`


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Article key={node.fields.slug}>
            <header>
              <h3 style={{margin: 0}}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <Author to={`/author/${kebabCase(node.frontmatter.author)}/`}>
                {node.frontmatter.author}
              </Author>
            </header>
            <section style={{margin: '10px 0'}}>
              <p
                style={{ margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <Tags tags={node.frontmatter.tags} />
          </Article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            author
          }
        }
      }
    }
  }
`
