import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Gamess,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
    const {
      wpcontent: {
        page: {
          homepage: {
            homePageDescription,
            homePageFeaturedGames,
            homePageHeaderDescription,
            homePageHeaderPicture,
            homePageHeaderTitle,
          }
        }
      }
    } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homepage {
            homePageHeaderTitle
            homePageHeaderDescription
            homePageDescription
            homePageHeaderPicture {
              altText
            }
            homePageFeaturedGames {
              ... on WPGraphql_Game {
                id
                slug
                game {
                  name
                  genre
                  picture {
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }`)

    console.log(homePageFeaturedGames)

return (
  <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image
        /* Kreeg dit niet aan de praat. Constant fout met fluid.
          fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid}
          altText={homePageHeaderPicture.altText}
          */
        />
        <div className="inner-div">
          <p className="header-title">{homePageHeaderTitle}</p>
          <p className="header-description">{homePageHeaderDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK} />
      </div>
      <div className="description">
        <p>{homePageDescription}</p>
        <BottomEdgeUp color={COLORS.PRIMARY} />
      </div>
      <div className="games">
        <h2>Featured games</h2>
        <div className="game-items">
          {homePageFeaturedGames.map(({ game, slug }) => (
            <Gamess to={`/${slug}`}>
              <Image
              /* Kreeg dit niet aan de praat.
                fluid={game.picture.imageFile.childImageSharp.fluid}
                altText={game.picture.altText}
                */
              />
              <div className="game-info">
                <p>
                  {game.name}
                </p>
                <p>{game.genre}</p>
              </div>
            </Gamess>
          ))}
        </div>
      </div>
    </Wrapper>
  </Layout>
)
}


export default IndexPage