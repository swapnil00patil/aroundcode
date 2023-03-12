import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import swapnil from "../../content/assets/swapnil.png"
import gayatri from "../../content/assets/gayatri.png"
import linkedin from "../../content/assets/linkedin.png"
import github from "../../content/assets/github.png"
import website from "../../content/assets/website.png"
import kebabCase from "lodash/kebabCase"

const ProfilePic = styled.img`
  border-radius: 20px;
  width: 100px;
  margin-right: 20px;
  align-self: center;
  margin-bottom: auto;
  @media (max-width: 768px) {
    width: 70px;
  }
`
const Container = styled.div`
  display: flex;
`
const Right = styled.div``
const Name = styled(Link)``
const SocialLink = styled.a`
  text-decoration: none;
  box-shadow: none;
  margin-left: 15px;
`
const SocialText = styled.a`
  text-decoration: none;
  box-shadow: none;
  border-radius: 5px;
  border: 1px solid #02aab0;
  padding: 0 8px;
  margin: 10px 10px 0 0;
  font-size: 14px;
  color: #02aab0;
  @media (max-width: 768px) {
    padding: 0 5px;
  }
`
const Description = styled.p`
  margin-bottom: 5px;
`
const SocialIcon = styled.img`
  width: 25px;
  margin: 0;
  align-items: center;
  display: flex;
`
const LinkArea = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`
const NameSection = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
`

const Bio = ({ authorKey }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          authors {
            swapnil {
              author
              description
              social {
                linkedin
                github
                website
                resume
              }
            }
            gayatri {
              author
              description
              social {
                linkedin
                github
              }
            }
          }
        }
      }
    }
  `)
  if (!data.site.siteMetadata.authors[authorKey]) {
    return
  }
  const { author, description, social } =
    data.site.siteMetadata.authors[authorKey]
  return (
    <Container>
      <ProfilePic src={authorKey === "swapnil" ? swapnil : gayatri} />
      <Right>
        <NameSection>
          <Name to={`/author/${kebabCase(author)}/`}>{author}</Name>
          {social?.linkedin && (
            <SocialLink target="_blank" href={social.linkedin}>
              <SocialIcon src={linkedin} />
            </SocialLink>
          )}
          {social?.github && (
            <SocialLink target="_blank" href={social.github}>
              <SocialIcon src={github} />
            </SocialLink>
          )}
        </NameSection>
        <Description>{description}</Description>
        <LinkArea>
          {social?.website && (
            <SocialText target="_blank" href={social.website}>
              Website
            </SocialText>
          )}
          {social?.resume && (
            <SocialText target="_blank" href={social.resume}>
              Resume
            </SocialText>
          )}
        </LinkArea>
      </Right>
    </Container>
  )
}

export default Bio
