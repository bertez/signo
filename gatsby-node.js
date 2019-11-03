exports.createPages = async ({ actions: { createPage } }) => {
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
