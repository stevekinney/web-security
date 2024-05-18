import { join, resolve } from 'path';
import { createServer } from 'vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import { tailwindConfig } from './tailwind.config.js';

const base = join(process.cwd(), 'public');
const shared = resolve(process.cwd(), '../..', 'shared');

/**
 * @type {import('vite').ViteDevServer}
 */
export const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
  base,
  resolve: {
    alias: {
      '#shared': shared,
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer, tailwindcss(tailwindConfig)],
    },
  },
  optimizeDeps: {
    entries: [join(process.cwd(), '/**/*.{html,handlebars,ejs}')],
  },
  plugins: [],
});
