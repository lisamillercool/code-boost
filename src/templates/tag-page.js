import React from "react"
import Layout from "../components/layout"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
import PostPreview from "../components/postPreview"

const TagPageTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  // TODO: REPLACE THIS WITH SLICKER GQL QUERY IN FUTURE
  const edgesWithTag = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(tag)
  })

  const tagHeader = `${edgesWithTag.length} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout pageType="Tag">
      <h2 className="TagPage__header">{tagHeader}</h2>

      <div className="PostPreviews">
        {edgesWithTag.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostPreview
              key={title}
              title={title}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              description={node.frontmatter.description}
              excerpt={node.excerpt}
              frontmatter={node.frontmatter}
            />
          )
        })}
      </div>
      <Link to="/tags" className="TagPage__button">
        <span>See all tags</span>
      </Link>

      <div>
        <h2 style={{ marginBottom: "2rem", fontSize: "2.4rem" }}>Top Posts</h2>
        <div className="PostPreviews">
          {edges.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            if (index < 3) {
              return (
                <PostPreview
                  key={title}
                  title={title}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  description={node.frontmatter.description}
                  excerpt={node.excerpt}
                  frontmatter={node.frontmatter}
                />
              )
            }
          })}
        </div>
      </div>
    </Layout>
  )
}

export default TagPageTemplate
export const pageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`