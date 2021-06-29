import React from "react"
import styled from "styled-components"

import { rhythm } from "../utils/typography"
import Header from "./Header"
import "./layout.css"

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const FullWidth = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
`
const FullWidthFooter = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
`
const ContentWidth = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(40)};
  padding: 0 ${rhythm(3 / 4)};
`
const Footer = styled(ContentWidth)`
  padding: 20px 0;
`
const MainArea = styled(ContentWidth)`
  min-height: calc(100vh - 155px);
`

const Layout = ({ title, children }) => {
  return (
    <Container>
      <FullWidth>
        <ContentWidth>
          <Header />
        </ContentWidth>
      </FullWidth>
      <MainArea>
        <main>{children}</main>
      </MainArea>
      <FullWidthFooter>
        <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </FullWidthFooter>
    </Container>
  )
}

export default Layout
