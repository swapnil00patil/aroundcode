import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Tag = styled(Link)`
  font-size: 13px;
  margin: 10px 10px 0 0;
  padding: 0 8px;
  border-radius: 5px;
  border: 1px solid #02aab0;
  box-shadow: none;
  color: #02aab0;
`
const TagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tags = ({ tags, className }) => {
  return (
    <TagArea className={className}>
    { tags.map((tag) => <Tag to={`/tags/${kebabCase(tag)}/`}>{tag}</Tag>) }
  </TagArea>
  )
}

export default Tags
