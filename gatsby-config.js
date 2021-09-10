require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Signo",
    titleTemplate: "%s - Signo",
    description: "Signo Rotulación",
    siteUrl: "https://signorotulacion.com",
    image: "/extra/card.png",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 600,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/media`,
        name: "media",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require("postcss-import"),
          require("postcss-preset-env")({
            stage: 0,
          }),
          require("postcss-extend"),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Signo Rotulación",
        short_name: "Signo",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        display: "minimal-ui",
        icon: "static/extra/icon.png",
      },
    },

    // TODO: enable offline before production
    // 'gatsby-plugin-offline',
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    // 'gatsby-plugin-stripe',

    // {
    //   resolve: `gatsby-source-stripe`,
    //   options: {
    //     objects: ['Product', 'Sku'],
    //     secretKey: process.env.STRIPE_KEY,
    //     downloadFiles: true
    //   }
    // }
  ],
  mapping: {
    "MarkdownRemark.frontmatter.related_projects.project":
      "MarkdownRemark.frontmatter.title",
    "MarkdownRemark.frontmatter.related_client":
      "MarkdownRemark.frontmatter.title",
    "MarkdownRemark.frontmatter.related_service":
      "MarkdownRemark.frontmatter.title",
  },
};
