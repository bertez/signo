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

    // Add related client field if necessary
    if (node.frontmatter.related_client) {
      const client = allClients
        .filter(c => c.frontmatter.title === node.frontmatter.related_client)
        .map(c => c.id);

      createNodeField({
        node,
        name: 'client',
        value: client[0]
      });
    }

    // Add related projects field if necessary
    if (node.frontmatter.related_projects) {
      const projectList = node.frontmatter.related_projects.map(p => p.project);

      const projects = allProjects
        .filter(p => projectList.includes(p.frontmatter.title))
        .map(p => p.id);

      createNodeField({
        node,
        name: 'projects',
        value: projects
      });
    }
  }
};
