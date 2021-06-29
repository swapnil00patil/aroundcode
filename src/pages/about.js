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
import Bio from "../components/bio"

const Container = styled.div`
  display: flex;
  margin: 60px 0;
`
const BioWrap = styled.div`
  margin: 20px;
`

const AboutPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout title={title}>
    <SEO title="All posts" />
    <Helmet title={title} />
    <Container>
      <BioWrap>
        <Bio authorKey='swapnil' />
      </BioWrap>
      <BioWrap>
        <Bio authorKey='kiran' />
      </BioWrap>
    </Container>
  </Layout>
)

AboutPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`