const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const content = await graphql(`
    query allPages {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              template
            }
          }
        }
      }
    }
  `);

  const pages = content.data.allMarkdownRemark.edges;

  for (const page of pages) {
    const {
      node: {
        id,
        fields: { slug },
        frontmatter: { template }
      }
    } = page;

    if (template && template !== 'client') {
      // if (template && template === 'frontpage') {
      createPage({
        path: slug,
        component: require.resolve(`./src/templates/${template}.jsx`),
        context: {
          id
        }
      });
    }
  }
};

exports.onCreateNode = ({
  node,
  getNode,
  getNodes,
  actions: { createNodeField }
}) => {
  fmImagesToRelative(node);

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });

    // Add slug field
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};
