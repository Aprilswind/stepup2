module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/get-stats',
     handler: 'get-stats.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
