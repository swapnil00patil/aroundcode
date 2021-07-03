import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { MainTitle, Author } from "../components/commonStyled"
import kebabCase from "lodash/kebabCase"
import Tags from "../components/Tags"

export const Section = styled.section`
  margin: 1rem 0 1rem 0;
`
export const Nav = styled.nav`
  margin-top: 20px;
`
export const TagsArea = styled(Tags)`
  margin-bottom: 20px;
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <MainTitle>
            {post.frontmatter.title}
          </MainTitle>
          <small>{post.frontmatter.date}</small>
          <Author to={`/author/${kebabCase(post.frontmatter.author)}/`}>{post.frontmatter.author}</Author>
        </header>
        <Section dangerouslySetInnerHTML={{ __html: post.html }} />
        <TagsArea tags={post.frontmatter.tags} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio authorKey={post.frontmatter.author.split(' ')[0].toLowerCase()} />
        </footer>
      </article>

      <Nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        author
      }
    }
  }
`
