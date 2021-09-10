const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const { createFilePath } = require("gatsby-source-filesystem");

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
        frontmatter: { template },
      },
    } = page;

    //    console.log(slug);

    if (
      template &&
      template !== "client" &&
      template !== "shop-product" &&
      template !== "checkout" &&
      template !== "shop"
    ) {
      createPage({
        path: slug,
        component: require.resolve(`./src/templates/${template}.jsx`),
        context: {
          id,
        },
      });
    }
  }

  createPage({
    path: "/covid19",
    component: require.resolve("./src/templates/covid.jsx"),
  });

  createPage({
    path: "/rcom",
    component: require.resolve("./src/templates/rcom.jsx"),
  });

  createPage({
    path: "/igape",
    component: require.resolve("./src/templates/igape.jsx"),
  });
};

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  // fmImagesToRelative(node);
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });

    // Add slug field
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};
