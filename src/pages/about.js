import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import { rhythm } from "../utils/typography"

const Container = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const BioWrap = styled.div`
  margin: 36px 24px 0 0;
  width: calc(50% - 24px);
  @media (max-width: 768px) {
    width: 100%;
    margin: 24px 0;
  }
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