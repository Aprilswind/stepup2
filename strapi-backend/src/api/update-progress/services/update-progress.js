'use strict';

/**
 * update-progress service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::update-progress.update-progress');
