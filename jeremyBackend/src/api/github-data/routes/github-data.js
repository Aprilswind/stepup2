module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/github-data',
      handler: 'github-data.getAll',
      config: {
        policies: [],
        middlewares: [],
      }
    },
    {
      method: 'GET',
      path: '/github-data/:id',
      handler: 'github-data.get',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/github/master',
      handler: 'github-data.master',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
