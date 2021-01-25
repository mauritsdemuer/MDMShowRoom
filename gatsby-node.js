const { graphql } = require("gatsby")
const path = require("path")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
  {
      wpcontent {
        games {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    }
    
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const games = result.data.wpcontent.games.edges;
    games.forEach(game => {
      const { id, slug } = game.node
      createPage({
        path: slug,
        component: path.resolve(`src/templates/game.js`),
        context: {
          id,
          slug,
        }
      })
    })
    return result
  })
}
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}