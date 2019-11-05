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

    if (template !== 'client') {
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

    const allNodes = getNodes();
    const allProjects = allNodes.filter(
      n =>
        n.internal.type === 'MarkdownRemark' &&
        n.frontmatter.template === 'project'
    );

    const allClients = allNodes.filter(
      n =>
        n.internal.type === 'MarkdownRemark' &&
        n.frontmatter.template === 'client'
    );

    // Add slug field
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

    // Add related projects if necessary
    if (node.frontmatter.project_highlight) {
      const projects = allProjects
        .filter(p => p.frontmatter.title === node.frontmatter.project_highlight)
        .map(p => p.id);

      createNodeField({
        node,
        name: 'projects',
        value: projects
      });
    }
  }
};
