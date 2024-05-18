import { create } from 'express-handlebars';

export const handlebars = create({
  helpers: {
    /**
     * @param {Object} data
     * @returns {string}
     */
    json(data) {
      return JSON.stringify(data);
    },
  },
});
