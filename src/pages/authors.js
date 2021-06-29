import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MainTitle } from "../components/commonStyled"

const AuthorLink = styled(Link)`
  
`
const List = styled.ul`
  list-style: none;
`

const AuthorsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <SEO title="All authors" />
    <Helmet title={title} />
    <div>
      <MainTitle>Authors</MainTitle>
      <List>
        {group.map(author => (
          <li key={author.fieldValue}>
            <AuthorLink to={`/author/${kebabCase(author.fieldValue)}/`}>
              {author.fieldValue} ({author.totalCount})
            </AuthorLink>
          </li>
        ))}
      </List>
    </div>
  </Layout>
)

AuthorsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default AuthorsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___author) {
        fieldValue
        totalCount
      }
    }
  }
`