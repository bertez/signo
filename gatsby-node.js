const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  // const pages = await graphql(``);

  // console.log(pages);
  //Frontpage
  createPage({
    path: '/',
    component: require.resolve('./src/templates/frontpage.jsx'),
    context: {
      title: 'Signo Taller del Rótulo'
    }
  });

  //Projects frontpage

  //Each project

  //Each service

  //Products fronpage

  //Each product

  //Company info
};

exports.onCreateNode = ({ node, getNode, getNodes, actions }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};
