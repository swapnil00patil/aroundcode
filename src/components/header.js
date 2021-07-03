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
  color: #52528C;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`
const Code = styled.div`
  font-family: 'Monaco, sans-serif';
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`
const Title = styled.div`
  margin-top: 4px;
`
const Menu = styled.div`
  margin: auto 0 auto auto;
`
const MenuItem = styled(Link)`
  color: #02aab0;
  margin-right: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
const LastMenuItem = styled(MenuItem)`
  margin-right: 0;
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
        <MenuItem to="/about">About Us</MenuItem>
        <LastMenuItem target="_blank" to="/rss.xml">RSS</LastMenuItem>
      </Menu>
    </Container>
  )
}

export default Header
