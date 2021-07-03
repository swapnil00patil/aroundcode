import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import swapnil from "../../content/assets/swapnil.png"
import kiran from "../../content/assets/kiran.png"
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
`
const Container = styled.div`
  display: flex;    
`
const Right = styled.div`
    
`
const Name = styled(Link)`
    
`
const SocialLink = styled.a`
  text-decoration: none;
  box-shadow: none;
  margin-left: 15px;
`
const SocialText = styled.a`
  text-decoration: none;
  box-shadow: none; 
  border-radius: 5px;
  border: 1px solid rgb(0, 122, 204);
  padding: 0 8px;
  margin-right: 10px;
  font-size: 14px;
`
const Description = styled.p`
  margin-bottom: 15px;
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
            kiran {
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
  const { author, description, social } = data.site.siteMetadata.authors[authorKey]
  return (
    <Container>
      <ProfilePic
        src={authorKey === 'swapnil' ? swapnil : kiran}
      />
      <Right>
        <NameSection>
          <Name to={`/author/${kebabCase(author)}/`}>{author}</Name>
          { 
              social?.linkedin && 
              <SocialLink target="_blank" href={social.linkedin}>
                <SocialIcon src={linkedin} />
              </SocialLink> 
            }
            { 
              social?.github && 
              <SocialLink target="_blank" href={social.github}>
                <SocialIcon src={github} />
              </SocialLink> 
            }
        </NameSection>
        <Description>{description}</Description>
        <LinkArea>
          { 
            social?.website && 
            <SocialText target="_blank" href={social.website}>
              Website
            </SocialText> 
          }
          { 
            social?.resume && 
            <SocialText target="_blank" href={social.resume}>
              Resume
            </SocialText> 
          }
        </LinkArea>
      </Right>
    </Container>
  )
}

export default Bio
