import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Gamess
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const GamesPage = () => {
  const {
    wpcontent: {
      page: {
        gamesMeta: { gamesPageDescription, gamesPageHeaderPicture },
      },
      games: { edges: games },
    },
  } = useStaticQuery(graphql`
query {
  wpcontent {
    page(id: "games", idType: URI) {
      gamesMeta {
        gamesPageDescription
        gamesPageHeaderPicture {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 100)
              {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          altText
        }
      }
    }
    games {
      edges {
      node {
        game {
          name
          genre
          releaseDate
          score
          picture {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100, grayscale: true)
                {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        slug
      }
    }
  }
}
}`)

  return (
    <Layout>
      <SEO title="Games" />
      <Wrapper gamesColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image

            fluid={gamesPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={gamesPageHeaderPicture.altText}

          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are MDMShowRoom.</h2>
          <p>{gamesPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="games">
          <h2>Our games</h2>
          <div className="game-items">
            {games.map(({ node: { game, slug } }) => (
              <Gamess to={`/${slug}`} key={slug}>
                <Image

                  fluid={game.picture.imageFile.childImageSharp.fluid}
                  alt={game.picture.altText}

                />
                <div className="game-info">
                  <p>
                    {game.name + ": "} {game.genre}
                  </p>
                  {game.name && <p> Release date: {game.releaseDate}</p>}
                </div>
              </Gamess>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}


export default GamesPage