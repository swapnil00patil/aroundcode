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
  margin-right: 20px;
`
const Description = styled.p`
  margin-bottom: 15px;
`
const SocialIcon = styled.img`
  width: 35px;
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
  console.log(author, data.site.siteMetadata.authors[authorKey])
  return (
    <Container>
      <ProfilePic
        src={authorKey === 'swapnil' ? swapnil : kiran}
      />
      <Right>
        <Name to={`/author/${kebabCase(author)}/`}>{author}</Name>
        <Description>{description}</Description>
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
        { 
          social?.website && 
          <SocialLink target="_blank" href={social.website}>
            <SocialIcon src={website} />
          </SocialLink> 
        }
      </Right>
    </Container>
  )
}

export default Bio
