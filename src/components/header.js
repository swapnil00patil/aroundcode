import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Container = styled.header`
  display: flex;
`
const LogoWrapper = styled.h3`
  font-family: 'Montserrat, sans-serif';
  margin: ${rhythm(0.4)} 0;
`
const Logo = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Code = styled.div`
  font-family: 'Monaco, sans-serif';
  font-size: 28px;
`
const Title = styled.div`
  margin-top: 4px;
`
const Menu = styled.div`
  margin: auto 0 auto auto;
`

const Header = () => {

  return (
    <Container>
      <LogoWrapper>
        <Logo
          style={{
            
          }}
          to={`/`}
        >
          <Code>&lt; /&gt;</Code>
          <Title>AroundCode</Title>
        </Logo>
      </LogoWrapper>
      <Menu>
        <Link to="/about">About Us</Link>
      </Menu>
    </Container>
  )
}

export default Header
