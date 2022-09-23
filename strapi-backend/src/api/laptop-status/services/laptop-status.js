'use strict';

/**
 * laptop-status service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::laptop-status.laptop-status');
