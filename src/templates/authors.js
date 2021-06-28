import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"

const Author = ({ pageContext, data }) => {
  const { author } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const authorHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } written by "${author}"`
console.log(pageContext, data)
  return (
    <div>
      <h1>{authorHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
      <Link to="/authors">All Authors</Link>
    </div>
  )
}

Author.propTypes = {
  pageContext: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Author

export const pageQuery = graphql`
  query($author: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { in: [$author] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`