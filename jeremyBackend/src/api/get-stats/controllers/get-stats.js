'use strict';

/**
 * A set of functions called "actions" for `get-stats`
 */


module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      var data = await strapi.db.query('plugin::users-permissions.user').findMany({})
      console.log(data)
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
      console.log(err)
    }
  }
};
